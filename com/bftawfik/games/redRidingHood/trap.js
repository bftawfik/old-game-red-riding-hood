function Trap(gsr){
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
  this.OFF = {
    axis: {x:-800,y:520},
    frames: [0],
    alpha:0,
  };
  this.ON = {
    axis: {x:1500,y:520},
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
              if(this.currentFrame == 1){
                audios.playWolfSound();
              }
            }
          }
          if(this.x + gameGFX.sprites["gsWolfPos0_0"].width < 0){
            this.changeState(this.states.OFF);
            game.gameScreen.trapsAndTrophies.removeTrap();
          };
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    if(this.currentState != this.states.off){
      switch(this.currentState){
        case(this.states.ON):
          // console.log(this.x);
          gameGFX.sprites["gsWolfPos0_"+this.frames[this.currentFrame]].draw( gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);

          // var tempSprite =  gameGFX.sprites["gsWolfPos0_"+this.frames[this.currentFrame]];
          // gameCntx.save();
          // gameCntx.globalAlpha=0.5;
          // gameCntx.fillStyle="red";
          // gameCntx.fillRect(((this.x+100)*this.gameScaleRatio), ((this.y+40)*this.gameScaleRatio), ((tempSprite.width-200)*this.gameScaleRatio), ((tempSprite.height-40)*this.gameScaleRatio));
          // gameCntx.restore();
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.getRectangle = function(){
    var tempSprite =  gameGFX.sprites["gsWolfPos0_"+this.frames[this.currentFrame]];
    var tempObj = {
      x:(this.x*this.gameScaleRatio),
      y:(this.y*this.gameScaleRatio),
      width:(tempSprite.width*this.gameScaleRatio),
      height:(tempSprite.height*this.gameScaleRatio),
    };
    return tempObj;
  }
  this.getRectangle2 = function(){
    var tempSprite =  gameGFX.sprites["gsWolfPos0_"+this.frames[this.currentFrame]];
    var tempObj = {
      x:((this.x+100)*this.gameScaleRatio),
      y:((this.y+40)*this.gameScaleRatio),
      width:((tempSprite.width-200)*this.gameScaleRatio),
      height:((tempSprite.height-40)*this.gameScaleRatio),
    };
    return tempObj;
  }
}
