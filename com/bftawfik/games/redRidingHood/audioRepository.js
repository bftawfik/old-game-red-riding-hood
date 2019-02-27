function AudioRepository(funcName) {
  //========================================================================
  //========================================================================
  //========================================================================
  this.gameAudios = [
    {
      path: 'mp3/loop0.mp3',
      sound: new Audio(),
			loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
    {
      path: 'mp3/jump.mp3',
      sound: new Audio(),
			loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
    {
      path: 'mp3/land.mp3',
      sound: new Audio(),
			loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
    {
      path: 'mp3/collectApple.mp3',
      sound: new Audio(),
      loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
    {
      path: 'mp3/click.mp3',
      sound: new Audio(),
      loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
    {
      path: 'mp3/wolf.mp3',
      sound: new Audio(),
      loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
    {
      path: 'mp3/lose.mp3',
      sound: new Audio(),
      loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
  ];
  this.loopId = 0;
  this.jumpId = 1;
  this.landId = 2;
  this.collectId = 3;
  this.clickId = 4;
  this.wolfId = 5;
  this.loseId = 6;
  this.enabled = 1;
  //========================================================================
  //========================================================================
  //========================================================================
  Audio.prototype.load = function(url, audioObj){
    var thisAudio = this;
    var thisAudioObj = audioObj;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url,true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
        var blob = new Blob([this.response]);
        thisAudio.src = window.URL.createObjectURL(blob);
        thisAudio.onCanPlayThrough();
    };
    xmlHTTP.onprogress = function(e) {
        thisAudio.completedPercentage = parseInt((e.loaded / e.total) * 100);
        e.thisAudioObj = thisAudioObj;
        thisAudio.onAudioProgress(e);
    };
    xmlHTTP.onloadstart = function() {
        thisAudio.completedPercentage = 0;
    };
    xmlHTTP.send();
  };
  Audio.prototype.onAudioProgress = function(e){
  };
  Audio.prototype.onCanPlayThrough = function(e){
  };
  Audio.prototype.completedPercentage = 0;
  //========================================================================
  //========================================================================
  //========================================================================
  this.createAudio = function(parent, obj){
    var audioObj = obj;
    audioObj.sound.parent = parent;
    audioObj.sound.onCanPlayThrough = function(){
  		audioObj.loaded = 1;
  	}
    audioObj.sound.oncanplaythrough = function(){
  		//console.log("oncanplaythrough");
  		audioObj.loaded = 1;
      //audioObj.sound.play();
  		//audioObj.sound.parent.checkIfAllLoaded();
  	}
    audioObj.sound.onAudioProgress = function(e){
      //console.log('onAudioProgress');
      e.thisAudioObj.bytesLoaded = e.loaded;
      e.thisAudioObj.bytesTotal = e.total;
    };
    audioObj.sound.load(audioObj.path, audioObj);
  }
  //------------------------------------------------------------------------
  this.init = function(){
    for(var audioCount = 0; audioCount < this.gameAudios.length; audioCount++){
      this.createAudio(this, this.gameAudios[audioCount]);
    }
  }
  //------------------------------------------------------------------------
  this.getLoadedCount = function(){
    //console.log('getLoadedCount');
    var loadedAudiosCount = 0;
    for(var audioCount = 0; audioCount < this.gameAudios.length; audioCount++){
      if(this.gameAudios[audioCount].loaded == 1){
        loadedAudiosCount++;
      }
    }
    return loadedAudiosCount;
  }
  //------------------------------------------------------------------------
  this.checkIfAllLoaded = function(){
    //console.log('checkIfAllLoaded');
    var loadedAudiosCount = 0;
    for(var audioCount = 0; audioCount < this.gameAudios.length; audioCount++){
      if(this.gameAudios[audioCount].loaded == 1){
        loadedAudiosCount++;
      }
    }
    if(loadedAudiosCount == this.gameAudios.length){
      //console.log(loadedAudiosCount);
      //window[this.afterAllLoaded]();
    }
  }
  //------------------------------------------------------------------------
  //------------------------------------------------------------------------
  //------------------------------------------------------------------------
  this.playLoopSound = function(){
  	console.log('playLoopSound');
  	this.gameAudios[this.loopId].sound.loop = true;
  	this.gameAudios[this.loopId].sound.play();
  	this.gameAudios[this.loopId].sound.muted = Boolean(!this.enabled);
  }
  //---------------------------------------------------------------
  this.playJumpSound = function(){
  	this.gameAudios[this.jumpId].sound.play();
  	this.gameAudios[this.jumpId].sound.muted = Boolean(!this.enabled);
  }
  //---------------------------------------------------------------
  this.playLandSound = function(){
  	this.gameAudios[this.landId].sound.play();
  	this.gameAudios[this.landId].sound.muted = Boolean(!this.enabled);
  }
  //---------------------------------------------------------------
  this.playCollectSound = function(){
    this.gameAudios[this.collectId].sound.pause();
    this.gameAudios[this.collectId].sound.currentTime = 0;
  	this.gameAudios[this.collectId].sound.play();
  	this.gameAudios[this.collectId].sound.muted = Boolean(!this.enabled);
  }
  //---------------------------------------------------------------
  this.playClickSound = function(){
    this.gameAudios[this.clickId].sound.pause();
    this.gameAudios[this.clickId].sound.currentTime = 0;
    this.gameAudios[this.clickId].sound.play();
    this.gameAudios[this.clickId].sound.muted = Boolean(!this.enabled);
  }
  //---------------------------------------------------------------
  this.playWolfSound = function(){
    this.gameAudios[this.wolfId].sound.pause();
    this.gameAudios[this.wolfId].sound.currentTime = 0;
    this.gameAudios[this.wolfId].sound.play();
    this.gameAudios[this.wolfId].sound.muted = Boolean(!this.enabled);
  }
  //---------------------------------------------------------------
  this.playLoseSound = function(){
    this.gameAudios[this.loseId].sound.pause();
    this.gameAudios[this.loseId].sound.currentTime = 0;
    this.gameAudios[this.loseId].sound.play();
    this.gameAudios[this.loseId].sound.muted = Boolean(!this.enabled);
  }
  this.changeState = function(){
    this.enabled = (this.enabled+1) % 2;
    this.gameAudios[this.loopId].sound.muted = Boolean(!this.enabled);
  	this.gameAudios[this.jumpId].sound.muted = Boolean(!this.enabled);
  	this.gameAudios[this.landId].sound.muted = Boolean(!this.enabled);
  	this.gameAudios[this.collectId].sound.muted = Boolean(!this.enabled);
  	this.gameAudios[this.clickId].sound.muted = Boolean(!this.enabled);
    this.gameAudios[this.wolfId].sound.muted = Boolean(!this.enabled);
    this.gameAudios[this.loseId].sound.muted = Boolean(!this.enabled);
  }
  //------------------------------------------------------------------------
  //------------------------------------------------------------------------
  //------------------------------------------------------------------------
  this.init();
}
