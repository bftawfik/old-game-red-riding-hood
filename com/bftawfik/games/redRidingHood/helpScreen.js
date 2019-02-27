function HelpScreen(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.dTime = 0;
  this.gsBg0 = {
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
  this.gsBg1= {
    x: 0,
    y: 475,
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
  this.gsBg2= {
    x: 0,
    y: 170,
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
  this.gsBg3= {
    x: 0,
    y: -100,
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
  this.hsMsgs= {
    x: 130,
    y: -920,
    alpha: 1,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:130,
        y:-920,
      },
      distance:{
        x:0,
        y:1000,
      },
    },
    HIDE:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:130,
        y:80,
      },
      distance:{
        x:0,
        y:-1000,
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
    x: 20,
    y: 20,
    activeFrame: 0,
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
        activate_hsPlayBtn();
      break;
      case(this.states.HIDE):
        deactivate_hsPlayBtn();
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
          this.alphaWithEase(this.gsBg0, "SHOW");
          this.alphaWithEase(this.gsBg1, "SHOW");
          this.alphaWithEase(this.gsBg2, "SHOW");
          this.alphaWithEase(this.gsBg3, "SHOW");
          this.moveWithEase(this.hsMsgs, "SHOW");
          this.moveWithEase(this.ssPlayBtn, "SHOW");
          if(this.alphaWithEase(this.ssSoundBtn0, "SHOW")){
            this.changeState(this.states.ON);
          }
        break;
        case(this.states.ON):
          // this.ssBg1.angle = (this.ssBg1.angle + this.ssBg1.angleIncr) % 360;
        break;
        case(this.states.HIDE):
        this.alphaWithEase(this.gsBg0, "HIDE");
        this.alphaWithEase(this.gsBg1, "HIDE");
        this.alphaWithEase(this.gsBg2, "HIDE");
        this.alphaWithEase(this.gsBg3, "HIDE");
        this.moveWithEase(this.hsMsgs, "HIDE");
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
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.gsBg0.alpha;
        gameGFX.sprites["gsBg0"].draw(gameCntx['bg'], (this.gsBg0.x*this.gameScaleRatio), (this.gsBg0.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.gsBg1.alpha;
        gameGFX.sprites["gsBg1"].draw(gameCntx['bg'], (this.gsBg1.x*this.gameScaleRatio), (this.gsBg1.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.gsBg2.alpha;
        gameGFX.sprites["gsBg2"].draw(gameCntx['bg'], (this.gsBg2.x*this.gameScaleRatio), (this.gsBg2.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.gsBg3.alpha;
        gameGFX.sprites["gsBg3"].draw(gameCntx['bg'], (this.gsBg3.x*this.gameScaleRatio), (this.gsBg3.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.hsMsgs.alpha;
        gameGFX.sprites["hsMsgs"].draw(gameCntx['bg'], (this.hsMsgs.x*this.gameScaleRatio), (this.hsMsgs.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameGFX.sprites["ssPlayBtn"].draw(gameCntx['bg'], (this.ssPlayBtn.x*this.gameScaleRatio), (this.ssPlayBtn.y*this.gameScaleRatio), this.gameScaleRatio);
        //--
        gameGFX.sprites["ssSoundBtn"+this.ssSoundBtn0.activeFrame].draw(gameCntx['bg'], (this.ssSoundBtn0.x*this.gameScaleRatio), (this.ssSoundBtn0.y*this.gameScaleRatio), this.gameScaleRatio);
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
