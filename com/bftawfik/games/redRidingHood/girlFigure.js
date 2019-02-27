function GirlFigure(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.dTime = 0;
  this.currentTime = 0;
  this.currentFrame = 0;
  this.currentRealFrame = 0;
  this.x = 0;
  this.y = 0;
  this.alpha = 0;
  //--
  this.timeMargin = 1/12;
  this.OFF = {
    axis: {x:-200,y:450},
    frames: [0],
    alpha:0,
  };
  this.INTERING ={
    axis: {x:200,y:450},
    frames: [0,1,2,3,4,5,6,7],
    alpha:1,
  }
  this.RUNNING ={
    axis: {x:200,y:450},
    frames: [0,1,2,3,4,5,6,7],
    alpha:1,
  }
  this.JUMPING ={
    axis: {x:200,y:450},
    height: [0,45,90,135,180,180,180,180,180,135,90,45,0],
    frames: [6,6,6,3,3,3,3,3,3,3,4,4,4],
    alpha:1,
  }
  this.FALLING ={
    axis: {x:200,y:450},
    frames: [0,1,2,3,4],
    alpha:1,
  }
  this.FELL ={
    axis: {x:200,y:450},
    frames: [4],
    alpha:1,
  }
  //---------------------------------------------------------------
  this.states = {
    OFF:'OFF',
    INTERING:'INTERING',
    RUNNING:'RUNNING',
    JUMPING:'JUMPING',
    FALLING:'FALLING',
    FELL:'FELL',
  };
  this.currentState = 'off';
  //---------------------------------------------------------------
  this.gfJumpClick = function(e){
    if(this.currentState === this.states.RUNNING){
      this.changeState(this.states.JUMPING);
    }
  }
  //---------------------------------------------------------------
  this.deactivate_gfJumpAbility = function(){
  	gameCnvs["trophies"].removeEventListener(game.usedEvents.clickEvent, this.gfJumpClick);
  }
  //---------------------------------------------------------------
  this.activate_gfJumpAbility = function(){
  	gameCnvs["trophies"].addEventListener(game.usedEvents.clickEvent, this.gfJumpClick.bind(this));
  }
  //---------------------------------------------------------------
  this.changeState = function(state){
    // console.log('changeState');
    switch (state){
      case this.states.INTERING:
        this.currentState = this.states.INTERING;
      break;
      case this.states.RUNNING:
        if(this.currentState === this.states.INTERING){
          game.gameScreen.enableScreenAnimation();
          this.activate_gfJumpAbility();
        }
        this.currentState = this.states.RUNNING;
      break;
      case this.states.JUMPING:
        audios.playJumpSound();
        this.currentState = this.states.JUMPING;
        this.currentRealFrame = 0;
        this.currentFrame = this.currentRealFrame % this.JUMPING.frames.length;
      break;
      case this.states.FALLING:
        this.currentState = this.states.FALLING;
        audios.playLoseSound();
        this.currentRealFrame = 0;
        this.currentFrame = this.currentRealFrame % this.FALLING.frames.length;
      break;
      case this.states.FELL:
        this.currentState = this.states.FELL;
        this.currentRealFrame = 0;
        this.currentFrame = this.currentRealFrame % this.FELL.frames.length;
        this[this.currentState].axis.x = this.x;
      break;
      case this.states.OFF:
        this.currentState = this.states.OFF;
        gameOver();
      break;
    }
    this.x = this[this.currentState].axis.x;
    this.y = this[this.currentState].axis.y;
    this.alpha = this[this.currentState].alpha;
  };
  //---------------------------------------------------------------
  this.update = function(gsr, dTime){
    this.gameScaleRatio = gsr;
    this.dTime = dTime;
    if(this.currentState != this.states.off){
      switch(this.currentState){
        case(this.states.INTERING):
          if(this.dTime !== undefined){
            this.currentTime += this.dTime;
            var frameCount = Math.floor(this.currentTime/this.timeMargin);
          }
          if(frameCount>0){
            this.currentRealFrame += frameCount;
            this.currentTime -= (frameCount * this.timeMargin);
            this.currentFrame = this.currentRealFrame % this.INTERING.frames.length;
          }
          this.x += game.speed;
          if(this.x >= 200){
            this.changeState(this.states.RUNNING);
          }
        break;
        case(this.states.RUNNING):
          if(this.dTime !== undefined){
            this.currentTime += this.dTime;
            var frameCount = Math.floor(this.currentTime/this.timeMargin);
          }
          if(frameCount>0){
            this.currentRealFrame += frameCount;
            this.currentTime -= (frameCount * this.timeMargin);
            this.currentFrame = this.currentRealFrame % this.RUNNING.frames.length;
          }
        break;
        case(this.states.JUMPING):
          if(this.dTime !== undefined){
            this.currentTime += this.dTime;
            var frameCount = Math.floor(this.currentTime/this.timeMargin);
          }
          if(frameCount>0){
            this.currentRealFrame += frameCount;
            this.currentTime -= (frameCount * this.timeMargin);
            this.currentFrame = this.currentRealFrame % this.JUMPING.frames.length;
            if((this.currentFrame) === 0){
              audios.playLandSound();
              this.changeState(this.states.RUNNING);
            }
          }
        break;
        case(this.states.FALLING):
          // console.log(game.speed);
          this.x -= game.speed;
          if(this.dTime !== undefined){
            this.currentTime += this.dTime;
            var frameCount = Math.floor(this.currentTime/this.timeMargin);
          }
          if(frameCount>0){
            this.currentRealFrame += frameCount;
            this.currentTime -= (frameCount * this.timeMargin);
            this.currentFrame = this.currentRealFrame % this.FALLING.frames.length;
            if((this.currentFrame) === 0){
              this.changeState(this.states.FELL);
            }
          }
        break;
        case(this.states.FELL):
          this.x -= game.speed;
          if(this.x + gameGFX.sprites["gsGirlPos2_4"].width < 0){
            this.changeState(this.states.OFF);
          };
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    if(this.currentState != this.states.off){
      switch(this.currentState){
        case(this.states.INTERING):
          gameGFX.sprites["gsGirlPos1_"+this[this.currentState].frames[this.currentFrame]].draw( gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
        break;
        case(this.states.RUNNING):
          gameGFX.sprites["gsGirlPos1_"+this[this.currentState].frames[this.currentFrame]].draw( gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);

          // var tempSprite = gameGFX.sprites["gsGirlPos1_"+this[this.currentState].frames[this.currentFrame]];
          // gameCntx.save();
          // gameCntx.globalAlpha=0.5;
          // gameCntx.fillStyle="red";
          // gameCntx.fillRect(((this.x+50)*this.gameScaleRatio), ((this.y)*this.gameScaleRatio), ((tempSprite.width-110)*this.gameScaleRatio), ((tempSprite.height)*this.gameScaleRatio));
          // gameCntx.restore();
        break;
        case(this.states.JUMPING):
          gameGFX.sprites["gsGirlPos1_"+this[this.currentState].frames[this.currentFrame]].draw( gameCntx, (this.x*this.gameScaleRatio), (this.y-this[this.currentState].height[this.currentFrame])*this.gameScaleRatio, this.gameScaleRatio);

          // var tempSprite = gameGFX.sprites["gsGirlPos1_"+this[this.currentState].frames[this.currentFrame]];
          // gameCntx.save();
          // gameCntx.globalAlpha=0.5;
          // gameCntx.fillStyle="red";
          // gameCntx.fillRect(((this.x+50)*this.gameScaleRatio), ((this.y-this[this.currentState].height[this.currentFrame]) * this.gameScaleRatio), ((tempSprite.width-110)*this.gameScaleRatio), ((tempSprite.height - 50)*this.gameScaleRatio));
        break;
        case(this.states.FALLING):
          gameGFX.sprites["gsGirlPos2_"+this[this.currentState].frames[this.currentFrame]].draw( gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
        break;
        case(this.states.FELL):
          gameGFX.sprites["gsGirlPos2_"+this[this.currentState].frames[this.currentFrame]].draw( gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.getRectangle = function(){
    var tempSprite =  gameGFX.sprites["gsGirlPos1_"+this[this.currentState].frames[this.currentFrame]];
    var tempObj = {
      x:(this.x*this.gameScaleRatio),
      y:(this.y*this.gameScaleRatio),
      width:(tempSprite.width*this.gameScaleRatio),
      height:(tempSprite.height*this.gameScaleRatio),
    }
    if(this.currentState == this.states.JUMPING){
      tempObj.y = (this.y - this[this.currentState].height[this.currentFrame])*this.gameScaleRatio;
    }
    return tempObj;
  }
  //---------------------------------------------------------------
  this.getRectangle2 = function(){
    var tempSprite =  gameGFX.sprites["gsGirlPos1_"+this[this.currentState].frames[this.currentFrame]];
    var tempObj = {
      x:((this.x+50)*this.gameScaleRatio),
      y:(this.y*this.gameScaleRatio),
      width:((tempSprite.width-110)*this.gameScaleRatio),
      height:(tempSprite.height*this.gameScaleRatio),
    }
    if(this.currentState == this.states.JUMPING){
      tempObj.y = tempObj.y - (this[this.currentState].height[this.currentFrame]*this.gameScaleRatio);
      tempObj.height = tempObj.height - (50*this.gameScaleRatio)
    }
    return tempObj;
  }
  // //---------------------------------------------------------------
  // this.jumpSound = function(){
  //   playJumpSound();
  // }
  // //---------------------------------------------------------------
  // this.landSound = function(){
  // 	playLandSound();
  // }
}
