function Trophy(gsr, id){
  this.id = id;
  this.gameScaleRatio = gsr;
  this.dTime = 0;
  this.currentTime = 0;
  this.currentFrame = 0;
  this.currentRealFrame = 0;
  this.x = 0;
  this.y = 0;
  this.alpha = 0;
  this.timeMargin = 1/12;
  this.frames = [0];
  //--
  this.combinations = [
    [50,80,100,130,150,130,100,80,50],
    [50,80,100,130,100,80,50],
    [50,80,100,80,50],
    [50,80,50],
    [50],
    [0,0],
    [0,0,0],
    [0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ];
  this.OFF = {
    axis: {x:-800,y:500},
    frames: [0],
    alpha:0,
  };
  this.ON = {
    axis: {x:1500,y:500},
    frames: [0,1,2],
    alpha:0,
  };
  //---------------------------------------------------------------
  this.states = {
    OFF:'OFF',
    ON:'ON',
  };
  this.currentState = 'off';
  //---------------------------------------------------------------
  this.buildAppleTrophies = function(combinationId){
    var tempCombination = this.combinations[combinationId];
    var tempAppleTrophies = [];
    for(var t=0; t<tempCombination.length; t++){
      tempAppleTrophies.push({x:t, y:tempCombination[t], alpha:1, scale:1, frameName:"gsApple", "HIDE":{currentTime:0, duration:1, startScale:1, endScale:5, startAlpha:1, endAlpha: 0}});
    }
    return tempAppleTrophies;
  }
  //---------------------------------------------------------------
  this.appleTrophies = this.buildAppleTrophies(Math.floor(Math.random()*this.combinations.length));
  //---------------------------------------------------------------
  this.changeState = function(state){
    switch (state){
      case this.states.ON:
        this.currentState = this.states.ON;
      break;
    }
    switch (state){
      case this.states.OFF:
        this.currentState = this.states.OFF;
      break;
    }
    this.x = this[this.currentState].axis.x;
    this.y = this[this.currentState].axis.y;
    this.frames = this[this.currentState].frames;
    this.alpha = this[this.currentState].alpha;
  };
  //---------------------------------------------------------------
  this.update = function(gsr, dTime){
    this.gameScaleRatio = gsr;
    this.dTime = dTime;
    if(this.currentState != this.states.OFF){
      switch(this.currentState){
        case(this.states.ON):
          this.x -= game.speed;
          if(this.x < 600){
            if(this.dTime !== undefined){
              this.currentTime += this.dTime;
              var frameCount = Math.floor(this.currentTime/this.timeMargin);
            }
            if(frameCount>0){
              this.currentRealFrame += frameCount;
              this.currentTime -= (frameCount * this.timeMargin);
              this.currentFrame = this.currentRealFrame % this.frames.length;
              this.currentTime -= (frameCount * this.timeMargin);
              if(this.currentRealFrame+1 > this.frames.length){
                this.currentFrame = this.frames.length-1;
              }
            }
          }
          if(this.x + (this.appleTrophies.length * (gameGFX.sprites["gsApple"].width * 2)) < 0){
            this.changeState(this.states.OFF);
            game.gameScreen.trapsAndTrophies.removeTrophy();
          };
          for(var t=0; t<this.appleTrophies.length; t++){
            if(this.appleTrophies[t].frameName != "gsApple"){
              this.appleTrophies[t].y++;
              this.scaleAlphaWithEase(this.appleTrophies[t], "HIDE");
            }
          }
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    if(this.currentState != this.states.off){
      switch(this.currentState){
        case(this.states.ON):
          for(var t=0; t<this.appleTrophies.length; t++){
            var tempSprite =  gameGFX.sprites[this.appleTrophies[t].frameName];
            if(this.appleTrophies[t].alpha > 0){
              // tempSprite.draw(gameCntx, (this.x + (tempSprite.width*2*this.appleTrophies[t].x)) * this.gameScaleRatio, ((this.y-this.appleTrophies[t].y)*this.gameScaleRatio), this.gameScaleRatio);


              gameCntx.save();
              gameCntx.globalAlpha = this.appleTrophies[t].alpha;
              // console.log(t, this.appleTrophies[t].alpha);
              tempSprite.draw(gameCntx, (this.x + (tempSprite.width*2*this.appleTrophies[t].x)) * this.gameScaleRatio, ((this.y-this.appleTrophies[t].y)*this.gameScaleRatio), this.gameScaleRatio);
              gameCntx.restore();


              // var tempSprite = gameGFX.sprites["gsApple"];
              // gameCntx.save();
              // gameCntx.globalAlpha=0.5;
              // gameCntx.fillStyle="red";
              // gameCntx.fillRect((this.x + (tempSprite.width*2*this.appleTrophies[t].x)) * this.gameScaleRatio, ((this.y-this.appleTrophies[t].y)*this.gameScaleRatio), ((tempSprite.width)*this.gameScaleRatio), ((tempSprite.height)*this.gameScaleRatio));
              // gameCntx.restore();
            }
          }
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.removeTrophyNumber = function(itemNo){
    if(this.appleTrophies[itemNo].alpha == 1){
      this.appleTrophies[itemNo].frameName = "gsAddScore";
    }
  }
  //---------------------------------------------------------------
  this.scaleAlphaWithEase = function(obj, animation){
    if(obj[animation].currentTime < obj[animation].duration){
      var easing = BezierEasing(0.5, 0, 0.5, 1);
      obj[animation].currentTime += this.dTime;
      var dTime = obj[animation].currentTime / obj[animation].duration;
      var dAlpha = obj[animation].endAlpha-obj[animation].startAlpha;
      var dScale = obj[animation].endScale-obj[animation].startScale;
      obj.scale = obj[animation].startScale + (easing(dTime)*dScale);
      obj.alpha = obj[animation].startAlpha + (easing(dTime)*dAlpha);
    }else{
      obj.alpha = obj[animation].endAlpha;
      obj.scale = obj[animation].endScale;
      return true;
    }
    return false;
  }
  //---------------------------------------------------------------
  this.getRectangle = function(){
    var tempArray = [];
    for(var t=0; t<this.appleTrophies.length; t++){
      var tempSprite =  gameGFX.sprites[this.appleTrophies[t].frameName];
      var tempObj = {
        x: (this.x + (tempSprite.width*2*this.appleTrophies[t].x)) * this.gameScaleRatio,
        y: ((this.y-this.appleTrophies[t].y)*this.gameScaleRatio),
        width:(tempSprite.width*this.gameScaleRatio),
        height:(tempSprite.height*this.gameScaleRatio),
        alpha: this.appleTrophies[t].alpha,
      }
      tempArray.push(tempObj);
    }
    return tempArray;
  }
}
