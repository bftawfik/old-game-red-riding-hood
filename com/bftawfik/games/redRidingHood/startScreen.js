function StartScreen(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.dTime = 0;
  this.ssBg0 = {
    x: 0,
    y: 0,
    alpha: 0,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startAlpha: 0,
      endAlpha: 1,
    },
    HIDE:{
      currentTime: 0,
      duration: 1,
      startAlpha: 1,
      endAlpha: 0,
    }
  };
  this.ssBg1= {
    x: -95,
    y: -375,
    alpha: 0,
    angle: 0,
    angleIncr: 0.2,
    radius: 20,
    center:{
      x:0,
      y:0,
    },
    vx: 0,
    vy: 0,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startAlpha: 0,
      endAlpha: 1,
    },
    HIDE:{
      currentTime: 0,
      duration: 1,
      startAlpha: 1,
      endAlpha: 0,
    }
  };
  this.ssFoxFace = {
    x: 1495,
    y: 325,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:1495,
        y:325,
      },
      distance:{
        x:-500,
        y:0,
      },
    },
    HIDE:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:995,
        y:325,
      },
      distance:{
        x:500,
        y:0,
      },
    },
  };
  this.ssLeftTree = {
    x: 1395,
    y: 0,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:1395,
        y:0,
      },
      distance:{
        x:-500,
        y:0,
      },
    },
    HIDE:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:895,
        y:0,
      },
      distance:{
        x:500,
        y:0,
      },
    },
  };
  this.ssTitle = {
    x: 215,
    y: -400,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:215,
        y:-400,
      },
      distance:{
        x:0,
        y:400,
      },
    },
    HIDE:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:215,
        y:0,
      },
      distance:{
        x:0,
        y:-400,
      },
    },
  };
  this.ssGirl = {
    x: 0,
    y: 775,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:0,
        y:775,
      },
      distance:{
        x:0,
        y:-600,
      },
    },
    HIDE:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:0,
        y:175,
      },
      distance:{
        x:0,
        y:600,
      },
    },
  };
  this.ssPlayBtn = {
    x: 456,
    y: 720,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:456,
        y:720,
      },
      distance:{
        x:0,
        y:-250,
      },
    },
    HIDE:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:456,
        y:470,
      },
      distance:{
        x:0,
        y:250,
      },
    },
  };
  this.ssSoundBtn0 = {
    x:-100,
    y:-100,
    activeFrame: 0,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:-100,
        y:-100,
      },
      distance:{
        x: 120,
        y: 120,
      },
    },
    HIDE:{
      currentTime: 0,
      duration: 1,
      startAlpha: 1,
      endAlpha: 0,
    },
  };
  //---------------------------------------------------------------------------
  this.states = {
    OFF:'OFF',
    ON:'ON',
    SHOW:'SHOW',
    HIDE: 'HIDE',
  };
  this.currentState = 'off';
  //---------------------------------------------------------------
  this.changeState = function(state){
    switch (state){
      case(this.states.OFF):
        this.currentState =  this.states.OFF;
      break;
      case(this.states.SHOW):
        this.currentState =  this.states.SHOW;
      break;
      case(this.states.ON):
        this.currentState =  this.states.ON;
        activate_ssPlayBtn();
        activate_soundBtn();
      break;
      case(this.states.HIDE):
        deactivate_ssPlayBtn();
        this.currentState =  this.states.HIDE;
      break;
    }
  };
  //---------------------------------------------------------------
  this.update = function(gsr, dTime){
    this.gameScaleRatio = gsr;
    this.dTime = dTime;
    this.ssSoundBtn0.activeFrame = (audios.enabled+1) % 2;
    if(this.currentState != this.states.off){
      switch(this.currentState){
        case(this.states.SHOW):
          this.alphaWithEase(this.ssBg0, "SHOW");
          this.alphaWithEase(this.ssBg1, "SHOW");
          this.ssBg1.angle = (this.ssBg1.angle + this.ssBg1.angleIncr) % 360;
          this.moveWithEase(this.ssFoxFace, "SHOW");
          this.moveWithEase(this.ssLeftTree, "SHOW");
          this.moveWithEase(this.ssTitle, "SHOW");
          this.moveWithEase(this.ssGirl, "SHOW");
          this.moveWithEase(this.ssPlayBtn, "SHOW");
          if(this.moveWithEase(this.ssSoundBtn0, "SHOW")){
            this.changeState(this.states.ON);
          }
        break;
        case(this.states.ON):
          this.ssBg1.angle = (this.ssBg1.angle + this.ssBg1.angleIncr) % 360;
        break;
        case(this.states.HIDE):
          this.alphaWithEase(this.ssBg0, "HIDE");
          this.alphaWithEase(this.ssBg1, "HIDE");
          this.ssBg1.angle = (this.ssBg1.angle + this.ssBg1.angleIncr) % 360;
          this.moveWithEase(this.ssFoxFace, "HIDE");
          this.moveWithEase(this.ssLeftTree, "HIDE");
          this.moveWithEase(this.ssTitle, "HIDE");
          this.moveWithEase(this.ssGirl, "HIDE");
          this.moveWithEase(this.ssPlayBtn, "HIDE");
          if(this.alphaWithEase(this.ssSoundBtn0, "HIDE")){
            this.changeState(this.states.OFF);
          }
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    //--
    if(this.currentState != this.states.off){
      if((this.currentState === this.states.SHOW)||(this.currentState === this.states.ON)||(this.currentState === this.states.HIDE)){
        gameCntx["bg"].save();
        gameCntx["bg"].globalAlpha = this.ssBg0.alpha;
        gameGFX.sprites["ssBg0"].draw(gameCntx["bg"], (this.ssBg0.x*this.gameScaleRatio), (this.ssBg0.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx["bg"].restore();
        //--
        gameCntx["bg"].save();
        gameCntx["bg"].globalAlpha = this.ssBg1.alpha;
        gameCntx["bg"].translate(640*this.gameScaleRatio, 360*this.gameScaleRatio);
        gameCntx["bg"].rotate(this.ssBg1.angle*Math.PI/180);
        gameCntx["bg"].translate(-640*this.gameScaleRatio, -360*this.gameScaleRatio);
        gameGFX.sprites["ssBg1"].draw(gameCntx["bg"], (this.ssBg1.x*this.gameScaleRatio), (this.ssBg1.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx["bg"].restore();
        //--
        gameGFX.sprites["ssFoxFace"].draw(gameCntx["bg"], (this.ssFoxFace.x*this.gameScaleRatio), (this.ssFoxFace.y*this.gameScaleRatio), this.gameScaleRatio);
        //--
        gameGFX.sprites["ssLeftTree"].draw(gameCntx["bg"], (this.ssLeftTree.x*this.gameScaleRatio), (this.ssLeftTree.y*this.gameScaleRatio), this.gameScaleRatio);
        //--
        gameGFX.sprites["ssTitle"].draw(gameCntx["bg"], (this.ssTitle.x*this.gameScaleRatio), (this.ssTitle.y*this.gameScaleRatio), this.gameScaleRatio);
        //--
        gameGFX.sprites["ssGirl"].draw(gameCntx["bg"], (this.ssGirl.x*this.gameScaleRatio), (this.ssGirl.y*this.gameScaleRatio), this.gameScaleRatio);
        //--
        gameGFX.sprites["ssPlayBtn"].draw(gameCntx["bg"], (this.ssPlayBtn.x*this.gameScaleRatio), (this.ssPlayBtn.y*this.gameScaleRatio), this.gameScaleRatio);
        //--
        gameCntx["bg"].save();
        gameCntx["bg"].globalAlpha = this.ssSoundBtn0.alpha;
        gameGFX.sprites["ssSoundBtn"+this.ssSoundBtn0.activeFrame].draw(gameCntx["bg"], (this.ssSoundBtn0.x*this.gameScaleRatio), (this.ssSoundBtn0.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx["bg"].restore();
      }
    }
  };
  //---------------------------------------------------------------
  this.moveWithEase = function(obj, animation){
    if(obj[animation].currentTime < obj[animation].duration){
      var easing = BezierEasing(0.5, 0, 0.5, 1);
      obj[animation].currentTime += this.dTime;
      var dTime = obj[animation].currentTime / obj[animation].duration;
      obj.x = (easing(dTime) *obj[animation].distance.x)+obj[animation].startPos.x;
      obj.y = (easing(dTime) *obj[animation].distance.y)+obj[animation].startPos.y;
    }else{
      obj.x = obj[animation].distance.x+obj[animation].startPos.x;
      obj.y = obj[animation].distance.y+obj[animation].startPos.y;
      return true;
    }
    return false;
  }
  //---------------------------------------------------------------
  this.alphaWithEase = function(obj, animation){

    if(obj[animation].currentTime < obj[animation].duration){
      var easing = BezierEasing(0.5, 0, 0.5, 1);
      obj[animation].currentTime += this.dTime;
      var dTime = obj[animation].currentTime / obj[animation].duration;
      var dAlpha = obj[animation].endAlpha-obj[animation].startAlpha;
      obj.alpha = obj[animation].startAlpha + (easing(dTime)*dAlpha);
    }else{
      obj.alpha = obj[animation].startAlpha + (obj[animation].endAlpha-obj[animation].startAlpha);
      return true;
    }
    return false;
  }
  //---------------------------------------------------------------
}
