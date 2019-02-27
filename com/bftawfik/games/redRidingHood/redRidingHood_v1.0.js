// console.log('game script');
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
var dependants, autoResize, gamePreloader = {prepared:false}, gameReorient = {prepared:false}, allGameCnvs, allGameCntx, gameGFX, game = {}, score = 0, bestScore = 0;
var currentTime = new Date();
var n = 'BFTawfikRedRidingHoodV1.0';
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function storeBestScore(userS, gameName){
	if (typeof(Storage) !== "undefined") {
    var myGame = JSON.parse(localStorage.getItem(gameName)) || {date: +new Date(), bestScore: 0};
    if(myGame.date <= +new Date()){
      if(userS > myGame.bestScore){
        myGame.date = +new Date();
        myGame.bestScore = userS;
        // console.log(localStorage.getItem(gameName));
				try{
					localStorage.setItem( gameName, JSON.stringify(myGame));
				}catch(error){
					return false;
				}
      }
    }
    return true;
  }
  return false;
}
//---------------------------------------------------------------
function retrieveBestScore(gameName){
  if (typeof(Storage) !== "undefined") {
    var myGame = JSON.parse(localStorage.getItem(gameName)) || {date: +new Date(), bestScore: 0};
    return myGame.bestScore;
  }
  return 0;
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function gameOver(){
	// console.log("gameOver");
	changeGameState(game.states.SHOW_END_SCREEN);
	if(score > bestScore){
		bestScore = score;
		// console.log(storeBestScore(bestScore, n));
	}
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function soundBtnClick(e){
	var myX = 0;
	var myY = 0;
	if(e.clientX != undefined && e.clientY != undefined){
		myX = e.clientX - e.target.offsetLeft;
		myY = e.clientY - e.target.offsetTop;
	}else if(e.touches[0].clientX != undefined && e.touches[0].clientY != undefined){
		myX = e.touches[0].clientX - e.target.offsetLeft;
		myY = e.touches[0].clientY - e.target.offsetTop;
	}
	var screen = null;
	switch(game.currentState){
		case(game.states.SHOW_START_SCREEN):
			tempScreen = game.startScreen;
		break;
		case(game.states.SHOW_HELP_SCREEN):
			tempScreen = game.helpScreen;
		break;
		case(game.states.SHOW_GAME_SCREEN):
			tempScreen = game.gameScreen;
		break;
		case(game.states.SHOW_END_SCREEN):
			tempScreen = game.endScreen;
		break;
		case(game.states.SHOW_GAME_SCREEN_AGAIN):
			tempScreen = game.gameScreen;
		break;
		case(game.states.SHOW_START_SCREEN_AGAIN):
			tempScreen = game.startScreen;
		break;
	}
	var startBtnRect = {
		x: tempScreen.ssSoundBtn0.x*game.scaleRatio,
		y: tempScreen.ssSoundBtn0.y*game.scaleRatio,
		endX: gameGFX.sprites["ssSoundBtn0"].getWidth()*game.scaleRatio,
		endY: gameGFX.sprites["ssSoundBtn0"].getHeight()*game.scaleRatio,
	};
	startBtnRect.endX += startBtnRect.x;
	startBtnRect.endY += startBtnRect.y;
	if(myX>startBtnRect.x && myX<startBtnRect.endX && myY>startBtnRect.y && myY<startBtnRect.endY ){
		// console.log('Rect Hit');
		audios.changeState();
	}
}
//---------------------------------------------------------------
function deactivate_soundBtn(){
	gameCnvs["trophies"].removeEventListener(game.usedEvents.clickEvent, soundBtnClick);
}
//---------------------------------------------------------------
function activate_soundBtn(){
	gameCnvs["trophies"].addEventListener(game.usedEvents.clickEvent, soundBtnClick);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function esCloseBtnClick(e){
	var myX = 0;
	var myY = 0;
	if(e.clientX != undefined && e.clientY != undefined){
		myX = e.clientX - e.target.offsetLeft;
		myY = e.clientY - e.target.offsetTop;
	}else if(e.touches[0].clientX != undefined && e.touches[0].clientY != undefined){
		myX = e.touches[0].clientX - e.target.offsetLeft;
		myY = e.touches[0].clientY - e.target.offsetTop;
	}
	var esCloseBtnRect = {
		x: game.endScreen.esCloseBtn.x*game.scaleRatio,
		y: game.endScreen.esCloseBtn.y*game.scaleRatio,
		endX: gameGFX.sprites["esCloseBtn"].getWidth()*game.scaleRatio,
		endY: gameGFX.sprites["esCloseBtn"].getHeight()*game.scaleRatio,
	};
	esCloseBtnRect.endX += esCloseBtnRect.x;
	esCloseBtnRect.endY += esCloseBtnRect.y;
	if(myX>esCloseBtnRect.x && myX<esCloseBtnRect.endX && myY>esCloseBtnRect.y && myY<esCloseBtnRect.endY ){
		// console.log('Rect Hit');
		audios.playClickSound();
		changeGameState(game.states.SHOW_START_SCREEN_AGAIN);
		// changeGameState(game.states.SHOW_HELP_SCREEN);
		// game.startScreen.ssPlayBtn.id = 3;
		// game.startScreen.ssPlayBtn.state = 'mouseDown';
	}
}
//---------------------------------------------------------------
function deactivate_esCloseBtn(){
	gameCnvs['trophies'].removeEventListener(game.usedEvents.clickEvent, esCloseBtnClick);
}
//---------------------------------------------------------------
function activate_esCloseBtn(){
	gameCnvs['trophies'].addEventListener(game.usedEvents.clickEvent, esCloseBtnClick);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function esReplayBtnClick(e){
	var myX = 0;
	var myY = 0;
	if(e.clientX != undefined && e.clientY != undefined){
		myX = e.clientX - e.target.offsetLeft;
		myY = e.clientY - e.target.offsetTop;
	}else if(e.touches[0].clientX != undefined && e.touches[0].clientY != undefined){
		myX = e.touches[0].clientX - e.target.offsetLeft;
		myY = e.touches[0].clientY - e.target.offsetTop;
	}
	var esReplayBtnRect = {
		x: game.endScreen.esReplayBtn.x*game.scaleRatio,
		y: game.endScreen.esReplayBtn.y*game.scaleRatio,
		endX: gameGFX.sprites["esReplayBtn"].getWidth()*game.scaleRatio,
		endY: gameGFX.sprites["esReplayBtn"].getHeight()*game.scaleRatio,
	};
	esReplayBtnRect.endX += esReplayBtnRect.x;
	esReplayBtnRect.endY += esReplayBtnRect.y;
	if(myX>esReplayBtnRect.x && myX<esReplayBtnRect.endX && myY>esReplayBtnRect.y && myY<esReplayBtnRect.endY ){
		// console.log('Rect Hit');
		audios.playClickSound();
		changeGameState(game.states.SHOW_GAME_SCREEN_AGAIN);
		// changeGameState(game.states.SHOW_HELP_SCREEN);
		// game.startScreen.ssPlayBtn.id = 3;
		// game.startScreen.ssPlayBtn.state = 'mouseDown';
	}
}
//---------------------------------------------------------------
function deactivate_esReplayBtn(){
	gameCnvs['trophies'].removeEventListener(game.usedEvents.clickEvent, esReplayBtnClick);
}
//---------------------------------------------------------------
function activate_esReplayBtn(){
	gameCnvs['trophies'].addEventListener(game.usedEvents.clickEvent, esReplayBtnClick);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function hsPlayBtnClick(e){
	var myX = 0;
	var myY = 0;
	if(e.clientX != undefined && e.clientY != undefined){
		myX = e.clientX - e.target.offsetLeft;
		myY = e.clientY - e.target.offsetTop;
	}else if(e.touches[0].clientX != undefined && e.touches[0].clientY != undefined){
		myX = e.touches[0].clientX - e.target.offsetLeft;
		myY = e.touches[0].clientY - e.target.offsetTop;
	}
	var startBtnRect = {
		x: game.helpScreen.ssPlayBtn.x*game.scaleRatio,
		y: game.helpScreen.ssPlayBtn.y*game.scaleRatio,
		endX: gameGFX.sprites["ssPlayBtn"].getWidth()*game.scaleRatio,
		endY: gameGFX.sprites["ssPlayBtn"].getHeight()*game.scaleRatio,
	};
	startBtnRect.endX += startBtnRect.x;
	startBtnRect.endY += startBtnRect.y;
	if(myX>startBtnRect.x && myX<startBtnRect.endX && myY>startBtnRect.y && myY<startBtnRect.endY ){
		// console.log('Rect Hit');
		audios.playClickSound();
		changeGameState(game.states.SHOW_GAME_SCREEN);
		// game.helpScreen.ssPlayBtn.id = 3;
		// game.helpScreen.ssPlayBtn.state = 'mouseDown';
	}
}
//---------------------------------------------------------------
function deactivate_hsPlayBtn(){
	gameCnvs['trophies'].removeEventListener(game.usedEvents.clickEvent, hsPlayBtnClick);
}
//---------------------------------------------------------------
function activate_hsPlayBtn(){
	gameCnvs['trophies'].addEventListener(game.usedEvents.clickEvent, hsPlayBtnClick);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function ssPlayBtnClick(e){
	var myX = 0;
	var myY = 0;
	if(e.clientX != undefined && e.clientY != undefined){
		myX = e.clientX - e.target.offsetLeft;
		myY = e.clientY - e.target.offsetTop;
	}else if(e.touches[0].clientX != undefined && e.touches[0].clientY != undefined){
		myX = e.touches[0].clientX - e.target.offsetLeft;
		myY = e.touches[0].clientY - e.target.offsetTop;
	}
	var startBtnRect = {
		x: game.startScreen.ssPlayBtn.x*game.scaleRatio,
		y: game.startScreen.ssPlayBtn.y*game.scaleRatio,
		endX: gameGFX.sprites["ssPlayBtn"].getWidth()*game.scaleRatio,
		endY: gameGFX.sprites["ssPlayBtn"].getHeight()*game.scaleRatio,
	};
	startBtnRect.endX += startBtnRect.x;
	startBtnRect.endY += startBtnRect.y;
	if(myX>startBtnRect.x && myX<startBtnRect.endX && myY>startBtnRect.y && myY<startBtnRect.endY ){
		audios.playClickSound();
		changeGameState(game.states.SHOW_HELP_SCREEN);
		// game.startScreen.ssPlayBtn.id = 3;
		// game.startScreen.ssPlayBtn.state = 'mouseDown';
	}
}
//---------------------------------------------------------------
function deactivate_ssPlayBtn(){
	gameCnvs['trophies'].removeEventListener(game.usedEvents.clickEvent, ssPlayBtnClick);
}
//---------------------------------------------------------------
function activate_ssPlayBtn(){
	gameCnvs['trophies'].addEventListener(game.usedEvents.clickEvent, ssPlayBtnClick);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function render(){
	var correctRender = !checkIfMobilePhone() || game.rightOrientation;
	if(correctRender){
		$('#orientDiv').css({"display": "none"});
		for(var i in gameCnvs){
			gameCntx[i].clearRect(0,0, gameCnvs[i].width, gameCnvs[i].height);
		}
		switch(game.currentState){
			case(game.states.SHOW_START_SCREEN):
				game.startScreen.draw(gameCntx);
			break;
			case(game.states.SHOW_HELP_SCREEN):
				game.startScreen.draw(gameCntx);
				game.helpScreen.draw(gameCntx);
			break;
			case(game.states.SHOW_GAME_SCREEN):
				game.helpScreen.draw(gameCntx);
				game.gameScreen.draw(gameCntx);
			break;
			case(game.states.SHOW_END_SCREEN):
				game.gameScreen.draw(gameCntx);
				game.endScreen.draw(gameCntx);
			break;
			case(game.states.SHOW_GAME_SCREEN_AGAIN):
				game.endScreen.draw(gameCntx);
				game.gameScreen.draw(gameCntx);
			break;
			case(game.states.SHOW_START_SCREEN_AGAIN):
				game.endScreen.draw(gameCntx);
				game.startScreen.draw(gameCntx);
			break;
		}
	}else{
		$('#orientDiv').css({"display": "inline"});
	}
}
//---------------------------------------------------------------
function update(){
	var correctRender = !checkIfMobilePhone() || game.rightOrientation;
	if(correctRender){
		var now  = new Date();
		var dTime = (now.getTime()-currentTime.getTime())/1000 ;
		currentTime = now;
		game.currentFrame++;
		switch(game.currentState){
			case(game.states.SHOW_START_SCREEN):
				game.startScreen.update(game.scaleRatio, dTime);
			break;
			case(game.states.SHOW_HELP_SCREEN):
				game.startScreen.update(game.scaleRatio, dTime);
				game.helpScreen.update(game.scaleRatio, dTime);
			break;
			case(game.states.SHOW_GAME_SCREEN):
				game.helpScreen.update(game.scaleRatio, dTime);
				game.gameScreen.update(game.scaleRatio, dTime);
			break;
			case(game.states.SHOW_END_SCREEN):
				game.gameScreen.update(game.scaleRatio, dTime);
				game.endScreen.update(game.scaleRatio, dTime);
			break;
			case(game.states.SHOW_GAME_SCREEN_AGAIN):
				game.endScreen.update(game.scaleRatio, dTime);
				game.gameScreen.update(game.scaleRatio, dTime);
			break;
			case(game.states.SHOW_START_SCREEN_AGAIN):
				game.endScreen.update(game.scaleRatio, dTime);
				game.startScreen.update(game.scaleRatio, dTime);
			break;
		}
	}else{
		game.orientImgMarginTop = (parseInt($('#orientDiv').css("height")) - parseInt($('#orientDiv img').css("height")))/2;
		$('#orientDiv img').css({"margin-top": game.orientImgMarginTop+"px"});
	}
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function changeGameState(gameState){
	// console.log('changeGameState');
	switch(game.currentState){
		case(game.states.LOADING_ASSETS):
			if(gameState === game.states.SHOW_START_SCREEN){
				game.currentState = game.states.SHOW_START_SCREEN;
				game.startScreen.changeState(game.startScreen.states.SHOW);
			}
		break;
		case(game.states.SHOW_START_SCREEN):
			if(gameState === game.states.SHOW_HELP_SCREEN){
				game.currentState = game.states.SHOW_HELP_SCREEN;
				game.startScreen.changeState(game.startScreen.states.HIDE);
				game.helpScreen.changeState(game.helpScreen.states.SHOW);
			}
		break;
		case(game.states.SHOW_HELP_SCREEN):
			if(gameState === game.states.SHOW_GAME_SCREEN){
				game.speed = 8;
				game.speedInc = 1.05;
				game.currentState = game.states.SHOW_GAME_SCREEN;
				game.helpScreen.changeState(game.helpScreen.states.HIDE);
				game.gameScreen.changeState(game.gameScreen.states.SHOW);
			}
		break;
		case(game.states.SHOW_GAME_SCREEN):
			if(gameState === game.states.SHOW_END_SCREEN){
				game.currentState = game.states.SHOW_END_SCREEN;
				game.gameScreen.changeState(game.gameScreen.states.HIDE);
				game.endScreen.changeState(game.endScreen.states.SHOW);
			}
		break;
		case(game.states.SHOW_END_SCREEN):
			createGameClasses();
			game.speed = 8;
			if(gameState === game.states.SHOW_GAME_SCREEN_AGAIN){
				game.currentState = game.states.SHOW_GAME_SCREEN_AGAIN;
				game.endScreen.changeState(game.endScreen.states.HIDE);
				game.gameScreen.changeState(game.gameScreen.states.SHOW);
			}else if(gameState === game.states.SHOW_START_SCREEN_AGAIN){
				game.currentState = game.states.SHOW_START_SCREEN_AGAIN;
				game.endScreen.changeState(game.endScreen.states.HIDE);
				game.startScreen.changeState(game.startScreen.states.SHOW);
			}
		break;
		case(game.states.SHOW_GAME_SCREEN_AGAIN):
			if(gameState === game.states.SHOW_END_SCREEN){
				game.currentState = game.states.SHOW_END_SCREEN;
				game.gameScreen.changeState(game.gameScreen.states.HIDE);
				game.endScreen.changeState(game.endScreen.states.SHOW);
			}
		break;
		case(game.states.SHOW_START_SCREEN_AGAIN):
			if(gameState === game.states.SHOW_HELP_SCREEN){
				game.currentState = game.states.SHOW_HELP_SCREEN;
				game.startScreen.changeState(game.startScreen.states.HIDE);
				game.helpScreen.changeState(game.helpScreen.states.SHOW);
			}
		break;
	}
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function run() {
	autoResizeResize();
	changeGameState(game.states.SHOW_START_SCREEN);
	audios.playLoopSound();
	var loop = function() {
		if(game.currentState != game.states.off){
			update();
			render();
		}
		window.requestAnimationFrame(loop);
	}
	window.requestAnimationFrame(loop);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function startGame(){
	gameGFX = createGameSprites(images.gameImgs[images.mainImageId].image);
	if(checkIfMobilePhone()){
		game.usedEvents = game.events.touch;
	}else{
		game.usedEvents = game.events.mouse;
	}
	run();
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//
function autoResizeInit(){
	autoResize.init();
}
//---------------------------------------------------------------
function autoResizeResize(){
	autoResize.resize();
	game.scaleRatio = autoResize.getScaleRatio();
}
//---------------------------------------------------------------
function createAutoResize(){
	autoResize = new AutoResize(game.orientation);
	autoResize.addElement(gamePreloader.tag);
	autoResize.addElement(gameReorient.tag);
	for(var i in gameCnvs){
		autoResize.addElement(gameCnvs[i]);
	}
	autoResize.init();
	game.scaleRatio = autoResize.getScaleRatio();
	window.addEventListener('load', autoResizeInit, false);
	window.addEventListener('resize', autoResizeResize, false);
}
//---------------------------------------------------------------
function createGameClasses(){
  game.startScreen = new StartScreen(game.scaleRatio);
  game.helpScreen = new HelpScreen(game.scaleRatio);
	game.gameScreen = new GameScreen(game.scaleRatio);
	game.endScreen = new EndScreen(game.scaleRatio);
}
//---------------------------------------------------------------
function createGameVars(){
	game.localBestScore = retrieveBestScore(n);
	game.speed = 8;
	game.speedInc = 1.1;
	if(game.localBestScore > bestScore){
		bestScore = game.localBestScore;
	}
	//
	game.currentFrame = 0;
	game.orientation = "landscape";
  game.events={
    touch:{
      clickEvent: "touchstart",
  		downEvent: "touchstart",
  		upEvent: "touchend",
  		moveEvent: "touchmove"
    },
    mouse:{
      clickEvent: "click",
  		downEvent: "mousedown",
  		upEvent: "mouseup",
  		moveEvent: "mousemove"
    }
  }
  game.states = {
		LOADING_ASSETS: "LOADING_ASSETS",
		SHOW_START_SCREEN: "SHOW_START_SCREEN",
		SHOW_HELP_SCREEN: "SHOW_HELP_SCREEN",
		SHOW_GAME_SCREEN: "SHOW_GAME_SCREEN",
		SHOW_END_SCREEN: "SHOW_END_SCREEN",
		SHOW_GAME_SCREEN_AGAIN: "SHOW_GAME_SCREEN_AGAIN",
		SHOW_START_SCREEN_AGAIN: "SHOW_START_SCREEN_AGAIN"
  };
  game.currentState = game.states.LOADING_ASSETS;
}
//---------------------------------------------------------------
function createGamePreloader(){
	gamePreloader.tag = $("<div>", {id: "preloaderDiv", "class": "fullscreenDiv"})[0];
	$(gamePreloader.tag).css({"display" : "none"});
  $('body').append(gamePreloader.tag);
}
//---------------------------------------------------------------
function createGameReorient(){
	gameReorient.tag = $("<div>", {id: "orientDiv", "class": "fullscreenDiv"})[0];
	$(gameReorient.tag).css({"display" : "none"});
  $('body').append(gameReorient.tag);
}
//---------------------------------------------------------------
function createAllGameCanvas(){
	var tempCanvasArr = ["bg", "char", "traps", "trophies"];
	gameCnvs = createGameCanvas(tempCanvasArr);
	gameCntx = getCntxFromCnvs(gameCnvs);
	for(var i in gameCnvs){
		$('body').append(gameCnvs[i]);
	}
}
//---------------------------------------------------------------
function createGameCanvas(arr){
	var tempCnvs={};
	var canvasId = '';
	for(var i=0; i<arr.length;i++){
		if(arr[i] === 'bg'){
			canvasId = 'solidCanvas';
		}else{
			canvasId = '';
		}
		tempCnvs[arr[i]] = $('<canvas width="1280" height="720" style="border:1px solid black" id='+canvasId+'>')[0];
	}
	return tempCnvs;
}
//---------------------------------------------------------------
function getCntxFromCnvs(cnvsObj){
	var tempCntx={};
	for(var i in cnvsObj){
		tempCntx[i] = cnvsObj[i].getContext("2d");
	}
	return tempCntx;
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function initGame(){
	createAllGameCanvas();
	createGameReorient();
	createGamePreloader();
  createGameVars();
	createAutoResize();
  createGameClasses();
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function loadImagesAndAudios(){
  initGame();
	images = new ImageRepository();
	audios = new AudioRepository();
	var loop = function() {
		var loadedImgs =images.getLoadedCount();
		if((images.getLoadedCount() != images.gameImgs.length) || (audios.getLoadedCount() != audios.gameAudios.length)){
			if(images.checkPreloaderImages()){
				if(!gamePreloader.prepared){
					gamePreloader.prepared = true;
					$(gamePreloader.tag).css({"display" : "inline"});
					$(gamePreloader.tag).append(images.gameImgs[0].image);
					$(gamePreloader.tag).append('<div>');
					$(gamePreloader.tag).find('div').append(images.gameImgs[1].image);
					$(images.gameImgs[2].image).attr('id', 'maskedGamePreloader');
					$(gamePreloader.tag).find('div').append(images.gameImgs[2].image);
				}
				var bytesLoaded = 0;
				var bytesTotal = 0;
				for(var imgsCount = 0;imgsCount < images.gameImgs.length; imgsCount++){
					bytesLoaded += images.gameImgs[imgsCount].bytesLoaded;
					bytesTotal += images.gameImgs[imgsCount].bytesTotal;
				}
				for(var audiosCount = 0;audiosCount < audios.gameAudios.length; audiosCount++){
					bytesLoaded += audios.gameAudios[audiosCount].bytesLoaded;
					bytesTotal += audios.gameAudios[audiosCount].bytesTotal;
				}
				var percentage = bytesLoaded/ bytesTotal;
				$('#maskedGamePreloader').css({"clip-path": "polygon(0 0, "+100 * percentage+"% 0, "+100 * percentage+"% 100%, 0 100%)"});
			}
			// console.log(bytesLoaded +' of '+ bytesTotal);
			window.requestAnimationFrame(loop);
		}else{
			$(gameReorient.tag).append(images.gameImgs[3].image);
			$(gamePreloader.tag).css({"display" : "none"});
			for(var i in gameCnvs){
				$(gameCnvs[i]).css({"display" : "inline"});
			}
			startGame();
		}
	}
	window.requestAnimationFrame(loop);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
$(function(){
	dependants = new Dependants();
	dependants.init(
		"com/bftawfik/games/redRidingHood/imageRepository.js",
		"com/bftawfik/games/redRidingHood/audioRepository.js",
    "com/bftawfik/games/redRidingHood/autoResize.js",
		"com/bftawfik/games/redRidingHood/mobileSupport.js",
		"com/bftawfik/games/redRidingHood/sprite.js",
		"com/bftawfik/games/redRidingHood/startScreen.js",
		"com/bftawfik/games/redRidingHood/helpScreen.js",
		"com/bftawfik/games/redRidingHood/girlFigure.js",
		"com/bftawfik/games/redRidingHood/trophy.js",
		"com/bftawfik/games/redRidingHood/trap.js",
		"com/bftawfik/games/redRidingHood/trapsAndTrophies.js",
		"com/bftawfik/games/redRidingHood/gameScreen.js",
		"com/bftawfik/games/redRidingHood/endScreen.js"
	);
	dependants.loadAll('loadImagesAndAudios');
});
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
