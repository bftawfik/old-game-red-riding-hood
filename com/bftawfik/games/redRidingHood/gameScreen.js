function GameScreen(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.dTime = 0;
  this.currentTime = 0;
  this.animateBG = false;
  this.play = true;
  this.trapPixelRes = 30;
  this.trophyPixelRes = 10;
  this.scorePos = {
    x: 1060,
    y: 35,
    scale:0.7,
    gutter:1,
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
  this.gsScorePanel = {
    x: 1020,
    y: 15,
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
    PREPARING_TO_HIDE:'PREPARING_TO_HIDE',
    HIDE: 'HIDE',
  };
  this.currentState = 'off';
  //---------------------------------------------------------------
  this.girlFigure = new GirlFigure(this.gameScaleRatio);
  this.trapsAndTrophies = new TrapsAndTrophies(this.gameScaleRatio);
  //---------------------------------------------------------------
  this.chickCollide = function(obj1, obj2){
    if (obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.height + obj1.y > obj2.y) {
      //console.log('collided');
      return true;
    }
    return false;
  }
  //---------------------------------------------------------------
  this.chickForCollision = function(){
    this.chickForTrophiesCollision();
    this.chickForTrapsCollision();
  }
  this.chickForTrophiesCollision = function(){
    var girlPos= this.girlFigure.getRectangle2();
    var trophiesPos = this.trapsAndTrophies.getTrophiesRectangle();
    for(var t=0; t<trophiesPos.length; t++){
      var trophiesGroup = trophiesPos[t];
      for(var tItem=0; tItem<trophiesGroup.length; tItem++){
        if(trophiesGroup[tItem].alpha == 1){
          if(this.chickCollide(girlPos, trophiesGroup[tItem])){
            this.trapsAndTrophies.removeTrophyNumber(t, tItem);
            score +=10;
            audios.playCollectSound();
          }
        }
      }
    }
  }
  this.chickForTrapsCollision = function(){
    var girlPos= this.girlFigure.getRectangle2();
    var trapsPos = this.trapsAndTrophies.getTrapsRectangle2();
    for(var t=0; t<trapsPos.length; t++){
      if(this.chickCollide(girlPos, trapsPos[t])){
        this.changeState(this.states.PREPARING_TO_HIDE);
        this.girlFigure.changeState(this.girlFigure.states.FALLING);
      }
    }
  }
  this.getPixelsIn = function(cntx, rect, res){
    var tempCount=0;
    var pixelMap = {};
    rect.x = Math.floor(rect.x/res)*res;
    rect.y = Math.floor(rect.y/res)*res;
    rect.width = Math.ceil(rect.width/res)*res;
    rect.height = Math.ceil(rect.height/res)*res;
    for(var x = Math.floor(rect.x); x<Math.floor(rect.x+rect.width); x+=res) {
      for(var y = Math.floor(rect.y); y<Math.floor(rect.y+rect.height); y+=res) {
    		var pixel = cntx.getImageData( x, y, 2, 2 );
        if(pixel.data[3] !== 0){
      		pixelMap[x+"&"+y] = 1;
          tempCount++;
        }
    	}
    }
    return pixelMap;
  }
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
        this.girlFigure.changeState(this.girlFigure.states.INTERING);
      break;
      case(this.states.PREPARING_TO_HIDE):
        this.currentState =  this.states.PREPARING_TO_HIDE;
      break;
      case(this.states.HIDE):
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
          this.alphaWithEase(this.gsScorePanel, "SHOW");
          if(this.alphaWithEase(this.ssSoundBtn0, "SHOW")){
            if(this.scaleAlphaWithEase(this.gsCount_0, "HIDE")){
              if(this.scaleAlphaWithEase(this.gsCount_1, "HIDE")){
                if(this.scaleAlphaWithEase(this.gsCount_2, "HIDE")){
                  this.changeState(this.states.ON);
                  // setTimeout(function(){gameOver();}, 3000);
                }
              }
            }
          }
        break;
        case(this.states.ON):
          if(this.play){
            this.girlFigure.update(game.scaleRatio, this.dTime);
            this.trapsAndTrophies.update(game.scaleRatio, this.dTime);
            if(this.animateBG){
              this.currentTime += this.dTime;
              var timeMargin = 1/12;
              var frameCount = Math.floor(this.currentTime/timeMargin);
              this.currentTime -= (frameCount * timeMargin);
              this.gsBg1.x = (this.gsBg1.x-game.speed/4) % gameGFX.sprites.gsBg1.width;
              this.gsBg2.x = (this.gsBg2.x-game.speed/2) % gameGFX.sprites.gsBg2.width;
              this.gsBg3.x = (this.gsBg3.x-game.speed) % gameGFX.sprites.gsBg3.width;
              this.chickForCollision();
            }
          }
        break;
        case(this.states.PREPARING_TO_HIDE):
          this.girlFigure.update(game.scaleRatio, this.dTime);
          this.trapsAndTrophies.update(game.scaleRatio, this.dTime);
          if(this.animateBG){
            this.currentTime += this.dTime;
            var timeMargin = 1/12;
            var frameCount = Math.floor(this.currentTime/timeMargin);
            this.currentTime -= (frameCount * timeMargin);
            this.gsBg1.x = (this.gsBg1.x-game.speed/4) % gameGFX.sprites.gsBg1.width;
            this.gsBg2.x = (this.gsBg2.x-game.speed/2) % gameGFX.sprites.gsBg2.width;
            this.gsBg3.x = (this.gsBg3.x-game.speed) % gameGFX.sprites.gsBg3.width;
          }
        break;
        case(this.states.HIDE):
          this.alphaWithEase(this.gsBg0, "HIDE");
          this.alphaWithEase(this.gsBg1, "HIDE");
          this.alphaWithEase(this.gsBg2, "HIDE");
          this.alphaWithEase(this.gsBg3, "HIDE");
          this.alphaWithEase(this.gsScorePanel, "HIDE");
          // this.gsGirlPos1.x = -300;
          if(this.alphaWithEase(this.ssSoundBtn0, "HIDE")){
            this.changeState(this.states.OFF);
          }
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.drawScore = function(){
    var stringScore = score+"";
    if(this.currentState == this.states.SHOW){
      stringScore = "0";
    }
    var start = {
      x: this.scorePos.x,
      y: this.scorePos.y,
    };
    var scoreWidth = 0;
    stringScore = stringScore.split('');
    for(var charCount = 0; charCount <stringScore.length;charCount++){
      var charId = parseInt(stringScore[charCount]);
      scoreWidth += (gameGFX.sprites["esNo_"+charId].getWidth() * this.scorePos.scale);
      scoreHeight = gameGFX.sprites["esNo_"+charId].getHeight() * this.scorePos.scale;
    }
    scoreWidth += (stringScore.length-1) * (this.scorePos.gutter * this.scorePos.scale);
    var boxWidth = gameGFX.sprites["gsScorePanel"].width * this.scorePos.scale;
    var boxHeight = gameGFX.sprites["gsScorePanel"].height * this.scorePos.scale;
    start.x += (boxWidth-scoreWidth)/2;
    start.y += (boxHeight - scoreHeight)/2;
    var charX = start.x;
    for(var charCount = 0; charCount <stringScore.length;charCount++){
      var charId = parseInt(stringScore[charCount]);
      gameGFX.sprites["esNo_"+charId].draw(gameCntx['bg'], charX * this.gameScaleRatio, start.y * this.gameScaleRatio,this.scorePos.scale * this.gameScaleRatio);
      charX += gameGFX.sprites["esNo_"+charId].getWidth() * this.scorePos.scale;
      charX += this.scorePos.gutter * this.scorePos.scale;
    }
  }
  //---------------------------------------------------------------
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
        this.gsCount_0.x = (this.gsCount_0.org.x + (gameGFX.sprites["gsCount_0"].getWidth() * (1-this.gsCount_0.scale)/2)) * this.gameScaleRatio;
        this.gsCount_0.y = (this.gsCount_0.org.y + (gameGFX.sprites["gsCount_0"].getHeight() * (1-this.gsCount_0.scale)/2)) * this.gameScaleRatio;
        gameCntx['bg'].translate(this.gsCount_0.x, this.gsCount_0.y);
        gameCntx['bg'].globalAlpha = this.gsCount_0.alpha;
        gameGFX.sprites["gsCount_0"].draw(gameCntx['bg'], 0, 0, this.gameScaleRatio*this.gsCount_0.scale);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        this.gsCount_1.x = (this.gsCount_1.org.x + (gameGFX.sprites["gsCount_1"].getWidth() * (1-this.gsCount_1.scale)/2)) * this.gameScaleRatio;
        this.gsCount_1.y = (this.gsCount_1.org.y + (gameGFX.sprites["gsCount_1"].getHeight() * (1-this.gsCount_1.scale)/2)) * this.gameScaleRatio;
        gameCntx['bg'].translate(this.gsCount_1.x, this.gsCount_1.y);
        gameCntx['bg'].globalAlpha = this.gsCount_1.alpha;
        gameGFX.sprites["gsCount_1"].draw(gameCntx['bg'], 0, 0, this.gameScaleRatio*this.gsCount_1.scale);
        gameCntx['bg'].restore();
        //--
        gameCntx['bg'].save();
        this.gsCount_2.x = (this.gsCount_2.org.x + (gameGFX.sprites["gsCount_2"].getWidth() * (1-this.gsCount_2.scale)/2)) * this.gameScaleRatio;
        this.gsCount_2.y = (this.gsCount_2.org.y + (gameGFX.sprites["gsCount_2"].getHeight() * (1-this.gsCount_2.scale)/2)) * this.gameScaleRatio;
        gameCntx['bg'].translate(this.gsCount_2.x, this.gsCount_2.y);
        gameCntx['bg'].globalAlpha = this.gsCount_2.alpha;
        gameGFX.sprites["gsCount_2"].draw(gameCntx['bg'], 0, 0, this.gameScaleRatio*this.gsCount_2.scale);
        gameCntx['bg'].restore();
        //--
        this.girlFigure.draw(gameCntx['char']);
        this.trapsAndTrophies.draw(gameCntx['traps'], gameCntx['trophies']);
        //--
        gameCntx['bg'].save();
        gameCntx['bg'].globalAlpha = this.gsScorePanel.alpha;
        gameGFX.sprites["gsScorePanel"].draw(gameCntx['bg'], (this.gsScorePanel.x*this.gameScaleRatio), (this.gsScorePanel.y*this.gameScaleRatio), this.gameScaleRatio);
        this.drawScore();
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
  this.enableScreenAnimation = function(){
    this.animateBG = true;
    this.trapsAndTrophies.changeState(this.trapsAndTrophies.states.ON);
  }
  //---------------------------------------------------------------
}
