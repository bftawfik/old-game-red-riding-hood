function EndScreen(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.dTime = 0;
  this.currentTime = 0;
  this.score = 0;
  this.scorePos = {
    x: 600,
    y: 250,
    scale:0.8,
    gutter:1,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:600,
        y:-750,
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
        x:600,
        y:250,
      },
      distance:{
        x:0,
        y:-1000,
      },
    },
  };
  this.bestScorePos = {
    x: 600,
    y: 398,
    scale:0.6,
    gutter:1,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:600,
        y:-602,
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
        x:600,
        y:398,
      },
      distance:{
        x:0,
        y:-1000,
      },
    },
  };
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
  this.gsCount_0 = {
    x: 460,
    y: 100,
    scale: 0,
    alpha: 0,
    org:{
      x: 460,
      y: 100,
    },
    scale: 1,
    HIDE:{
      currentTime: 0,
      duration: 1,
      startScale: 1,
      endScale: 5,
      startAlpha: 1,
      endAlpha: 0,
    },
  };
  this.gsCount_1 = {
    x: 460,
    y: 100,
    scale: 0,
    alpha: 0,
    org:{
      x: 460,
      y: 100,
    },
    scale: 1,
    HIDE:{
      currentTime: 0,
      duration: 1,
      startScale: 1,
      endScale: 5,
      startAlpha: 1,
      endAlpha: 0,
    },
  };
  this.gsCount_2 = {
    x: 460,
    y: 100,
    scale: 0,
    alpha: 0,
    org:{
      x: 460,
      y: 100,
    },
    scale: 1,
    HIDE:{
      currentTime: 0,
      duration: 1,
      startScale: 1,
      endScale: 5,
      startAlpha: 1,
      endAlpha: 0,
    },
  };
  this.esMsgs= {
    x: 358.5,
    y: -1020,
    alpha: 1,
    SHOW:{
      currentTime: 0,
      duration: 1,
      startPos:{
        x:358.5,
        y:-1020,
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
        x:358.5,
        y:-20,
      },
      distance:{
        x:0,
        y:-1000,
      },
    },
  };
  this.esReplayBtn = {
    x: 705,
    y: 505,
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
  this.esCloseBtn = {
    x: 395,
    y: 505,
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
        activate_esReplayBtn();
        activate_esCloseBtn();
      break;
      case(this.states.HIDE):
        deactivate_esReplayBtn();
        deactivate_esCloseBtn();
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
          this.moveWithEase(this.esMsgs, "SHOW");
          this.moveWithEase(this.scorePos, "SHOW");
          this.moveWithEase(this.bestScorePos, "SHOW");
          this.alphaWithEase(this.esReplayBtn, "SHOW");
          this.alphaWithEase(this.esCloseBtn, "SHOW");
          if(this.alphaWithEase(this.ssSoundBtn0, "SHOW")){
            this.changeState(this.states.ON);
          }
        break;
        case(this.states.ON):

        break;
        case(this.states.HIDE):
        this.alphaWithEase(this.gsBg0, "HIDE");
        this.alphaWithEase(this.gsBg1, "HIDE");
        this.alphaWithEase(this.gsBg2, "HIDE");
        this.alphaWithEase(this.gsBg3, "HIDE");
        this.moveWithEase(this.esMsgs, "HIDE");
        this.moveWithEase(this.scorePos, "HIDE");
        this.moveWithEase(this.bestScorePos, "HIDE");
        this.alphaWithEase(this.esReplayBtn, "HIDE")
        this.alphaWithEase(this.esCloseBtn, "HIDE")
        if(this.alphaWithEase(this.ssSoundBtn0, "HIDE")){
          this.changeState(this.states.OFF);
          score = 0;
        }
        break;
      }
    }
  };
  //---------------------------------------------------------------
  //---------------------------------------------------------------
  this.drawScore = function(){
    var stringScore = score+"";
    var char, char_x, char_y;
    var oldChars_width;
    stringScore = stringScore.split('');
    stringScore.reverse();
    oldChars_width = 0;
    for(var charCount = 0; charCount <stringScore.length;charCount++){
      char = parseInt(stringScore[charCount]);
      oldChars_width += gameGFX.sprites["esNo_"+char].width*this.scorePos.scale;
      char_x = this.scorePos.x - oldChars_width;
      char_y = this.scorePos.y;
      gameGFX.sprites["esNo_"+char].draw(gameCntx['bg'], (char_x*this.gameScaleRatio), (char_y*this.gameScaleRatio), this.gameScaleRatio*this.scorePos.scale);
    }
  }
  this.drawBestScore = function(){
    var stringScore = bestScore+"";
    var char, char_x, char_y;
    var oldChars_width;
    stringScore = stringScore.split('');
    stringScore.reverse();
    oldChars_width = 0;
    for(var charCount = 0; charCount <stringScore.length;charCount++){
      char = parseInt(stringScore[charCount]);
      oldChars_width += gameGFX.sprites["esNo_"+char].width*this.bestScorePos.scale;
      char_x = this.bestScorePos.x - oldChars_width;
      char_y = this.bestScorePos.y;
      gameGFX.sprites["esNo_"+char].draw(gameCntx['bg'], (char_x*this.gameScaleRatio), (char_y*this.gameScaleRatio), this.gameScaleRatio*this.bestScorePos.scale);
    }
  }
  this.draw = function(gameCntx){
    //--
    if(this.currentState != this.states.off){
      if(this.currentState !== this.states.OFF){
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.gsBg0.alpha;
        gameGFX.sprites["gsBg0"].draw(gameCntx['bg'], (this.gsBg0.x*this.gameScaleRatio), (this.gsBg0.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.gsBg1.alpha;
        gameGFX.sprites["gsBg1"].draw(gameCntx['bg'], (this.gsBg1.x*this.gameScaleRatio), (this.gsBg1.y*this.gameScaleRatio), this.gameScaleRatio);
        gameGFX.sprites["gsBg1"].draw(gameCntx['bg'], (this.gsBg1.x*this.gameScaleRatio)+ (gameGFX.sprites["gsBg1"].width*this.gameScaleRatio), (this.gsBg1.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.gsBg2.alpha;
        gameGFX.sprites["gsBg2"].draw(gameCntx['bg'], (this.gsBg2.x*this.gameScaleRatio), (this.gsBg2.y*this.gameScaleRatio), this.gameScaleRatio);
        gameGFX.sprites["gsBg2"].draw(gameCntx['bg'], (this.gsBg2.x*this.gameScaleRatio)+ (gameGFX.sprites["gsBg2"].width*this.gameScaleRatio), (this.gsBg2.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.gsBg3.alpha;
        gameGFX.sprites["gsBg3"].draw(gameCntx['bg'], (this.gsBg3.x*this.gameScaleRatio), (this.gsBg3.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].globalAlpha = this.gsBg3.alpha;
        gameGFX.sprites["gsBg3"].draw(gameCntx['bg'], (this.gsBg3.x*this.gameScaleRatio)+ (gameGFX.sprites["gsBg3"].width*this.gameScaleRatio), (this.gsBg3.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.esMsgs.alpha;
        gameGFX.sprites["esMsgs"].draw(gameCntx['bg'], (this.esMsgs.x*this.gameScaleRatio), (this.esMsgs.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        this.drawScore();
        this.drawBestScore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.esReplayBtn.alpha;
        gameGFX.sprites["esReplayBtn"].draw(gameCntx['bg'], (this.esReplayBtn.x*this.gameScaleRatio), (this.esReplayBtn.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.esCloseBtn.alpha;
        gameGFX.sprites["esCloseBtn"].draw(gameCntx['bg'], (this.esCloseBtn.x*this.gameScaleRatio), (this.esCloseBtn.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.ssSoundBtn0.alpha;
        gameGFX.sprites["ssSoundBtn"+this.ssSoundBtn0.activeFrame].draw(gameCntx['bg'], (this.ssSoundBtn0.x*this.gameScaleRatio), (this.ssSoundBtn0.y*this.gameScaleRatio), this.gameScaleRatio);
        gameCntx['bg'].restore();
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
      obj.alpha = obj[animation].endAlpha;
      return true;
    }
    return false;
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
}
