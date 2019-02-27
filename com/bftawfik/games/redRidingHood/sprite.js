//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function Sprite(img, x, y, width, height) {
	this.sizefactor = 1;
	this.img = img;
	this.x = x*this.sizefactor;
	this.y = y*this.sizefactor;
	this.width = width*this.sizefactor;
	this.height = height*this.sizefactor;
	this.getWidth = function(){
		return this.width/this.sizefactor;
	}
	this.getHeight = function(){
		return this.height/this.sizefactor;
	}
};
//---------------------------------------------------------------
Sprite.prototype.draw = function(ctx, x, y, scale=1) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, ((this.width/this.sizefactor)*scale), ((this.height/this.sizefactor)*scale));
};
//---------------------------------------------------------------
Sprite.prototype.draw2 = function(ctx, x, y, width=0, height=0, scale=1) {
	if(width == 0){
		width = (this.width/this.sizefactor);
	}
	if(height == 0){
		height = (this.height/this.sizefactor);
	}
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, (width*scale), (height*scale));
};
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function createGameSprites(img){
	// console.log(img.useMap);
	var gameGFX = {};
	gameGFX.sprites = {
		ssBg0: new Sprite(img, 0, 0, 1280, 720),
		ssBg1: new Sprite(img, 0, 722, 1470 , 1470),
		ssFoxFace: new Sprite(img, 1282, 390, 200, 256),
		ssLeftTree: new Sprite(img, 1472, 722, 385, 720),
		ssTitle: new Sprite(img, 1282, 0, 850, 385),
		ssGirl: new Sprite(img, 2891, 722, 370, 545),
		ssPlayBtn: new Sprite(img, 1604, 387, 368, 228),
		ssSoundBtn0: new Sprite(img, 1484, 501, 118, 112),
		ssSoundBtn1: new Sprite(img, 1484, 387, 118, 112),
		hsMsgs: new Sprite(img, 1859, 722, 1030, 550),
		gsBg0: new Sprite(img, 2134, 0, 1280, 720),
		gsBg1: new Sprite(img, 1484, 1627, 1320, 128),
		gsBg2: new Sprite(img, 1472, 1757, 2070, 435),
		gsBg3: new Sprite(img, 0, 2194, 3329, 828),
		gsGirlPos1_7: new Sprite(img, 0, 3024, 200, 223),
		gsGirlPos1_6: new Sprite(img, 200, 3024, 200, 223),
		gsGirlPos1_5: new Sprite(img, 400, 3024, 200, 223),
		gsGirlPos1_4: new Sprite(img, 600, 3024, 200, 223),
		gsGirlPos1_3: new Sprite(img, 800, 3024, 200, 223),
		gsGirlPos1_2: new Sprite(img, 1000, 3024, 200, 223),
		gsGirlPos1_1: new Sprite(img, 1200, 3024, 200, 223),
		gsGirlPos1_0: new Sprite(img, 1400, 3024, 200, 223),
		gsGirlPos2_0: new Sprite(img, 2576, 3024, 244, 223),
		gsGirlPos2_1: new Sprite(img, 2332, 3024, 244, 223),
		gsGirlPos2_2: new Sprite(img, 2088, 3024, 244, 223),
		gsGirlPos2_3: new Sprite(img, 1844, 3024, 244, 223),
		gsGirlPos2_4: new Sprite(img, 1600, 3024, 244, 223),
		gsWolfPos0_0: new Sprite(img, 0, 3249, 300, 170),
		gsWolfPos0_1: new Sprite(img, 300, 3249, 300, 170),
		gsWolfPos0_2: new Sprite(img, 600, 3249, 300, 170),
		gsScorePanel: new Sprite(img, 1484, 1444, 240, 100),
		gsApple: new Sprite(img, 1484, 1571, 44, 44),
		gsAddScore: new Sprite(img, 1531, 1571, 44, 44),
		gsCount_2: new Sprite(img, 1802, 3249, 300, 300),
		gsCount_1: new Sprite(img, 2104, 3249, 300, 300),
		gsCount_0: new Sprite(img, 2406, 3249, 300, 300),
		esMsgs: new Sprite(img, 2806, 1272, 563, 474),
		esReplayBtn: new Sprite(img, 2216, 1274, 240, 150),
		esCloseBtn: new Sprite(img, 1974, 1274, 240, 150),
		esNo_0: new Sprite(img, 2891, 3210, 29, 37),
		esNo_1: new Sprite(img, 2920, 3210, 16, 37),
		esNo_2: new Sprite(img, 2936, 3210, 28, 37),
		esNo_3: new Sprite(img, 2964, 3210, 28, 37),
		esNo_4: new Sprite(img, 2992, 3210, 29, 37),
		esNo_5: new Sprite(img, 3021, 3210, 28, 37),
		esNo_6: new Sprite(img, 3049, 3210, 29, 37),
		esNo_7: new Sprite(img, 3078, 3210, 29, 37),
		esNo_8: new Sprite(img, 3107, 3210, 29, 37),
		esNo_9: new Sprite(img, 3136, 3210, 29, 37),
	};
  return gameGFX;
};
