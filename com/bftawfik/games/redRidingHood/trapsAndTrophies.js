function TrapsAndTrophies(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.dTime = 0;
  this.currentTime = 0;
  this.timeGap = 2;
  this.randomTimeGap = 0;
  this.traps = [];
  this.trophies = [];
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
        this.calcTimeGap();
      break;
    }
  };
  //---------------------------------------------------------------
  this.addTrapOrTrophy = function(){
    // console.log('addTrapOrTrophy');
    var randomFlag = Math.floor(Math.random() * 2);
    // //--
    // var tempTrophy = new Trophy(this.gameScaleRatio);
    // tempTrophy.changeState(tempTrophy.states.ON);
    // this.trophies.push(tempTrophy);
    // //--

    // //--
    // var tempTrap = new Trap(this.gameScaleRatio);
    // tempTrap.changeState(tempTrap.states.ON);
    // this.traps.push(tempTrap);
    // //--

    if(randomFlag > 0){
      var tempTrophy = new Trophy(this.gameScaleRatio);
      tempTrophy.changeState(tempTrophy.states.ON);
      this.trophies.push(tempTrophy);
    }else{
      var tempTrap = new Trap(this.gameScaleRatio);
      tempTrap.changeState(tempTrap.states.ON);
      this.traps.push(tempTrap);
    }
  }
  //---------------------------------------------------------------
  this.calcTimeGap = function(){
    // console.log('calcTimeGap');
    this.randomTimeGap = this.timeGap + Math.floor(Math.random()*this.timeGap);
    // console.log(this.randomTimeGap);
  }
  //---------------------------------------------------------------
  this.update = function(gsr, dTime){
    this.gameScaleRatio = gsr;
    this.dTime = dTime;
    if(this.currentState != this.states.OFF){
      switch(this.currentState){
        case(this.states.ON):
          // setInterval(this.addRandomItem, 3000);
          if(this.dTime !== undefined){
            this.currentTime += this.dTime;
            if(this.currentTime > this.randomTimeGap){
              this.currentTime -= this.randomTimeGap;
              this.calcTimeGap();
              this.addTrapOrTrophy();
            }
          }
          for(var t=0; t<this.traps.length; t++){
            this.traps[t].update(this.gameScaleRatio, this.dTime);
          }
          for(var t=0; t<this.trophies.length; t++){
            this.trophies[t].update(this.gameScaleRatio, this.dTime);
          }
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.draw = function(trapsCntx, trophiesCntx){
    if(this.currentState != this.states.off){
      switch(this.currentState){
        case(this.states.ON):
          for(var t=0; t<this.traps.length; t++){
            this.traps[t].draw(trapsCntx);
          }
          for(var t=0; t<this.trophies.length; t++){
            this.trophies[t].draw(trophiesCntx);
          }
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.removeTrap = function(){
    for(var t=0; t<this.traps.length; t++){
      if(this.traps[t].currentState === this.traps[t].states.OFF){
        this.traps.splice(t, 1);
        // console.log("Traps = "+this.traps.length+"\nTrophies = "+this.trophies.length);
        var getRandom = Math.floor(Math.random() * 10);
        if(getRandom > 4){
          game.speed *= game.speedInc;
          // console.log(game.speed);
        }
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.removeTrophy = function(){
    for(var t=0; t<this.trophies.length; t++){
      if(this.trophies[t].currentState === this.trophies[t].states.OFF){
        this.trophies.splice(t, 1);
        // console.log("Traps = "+this.traps.length+"\nTrophies = "+this.trophies.length);
        break;
      }
    }
  };
  //---------------------------------------------------------------
  this.removeTrophyNumber = function(groupNo, itemNo){
    var tempTrophiesGroup = this.trophies[groupNo];
    tempTrophiesGroup.removeTrophyNumber(itemNo);
    // var tempTrophyItem = tempTrophiesGroup[itemNo];
    // for(var t=0; t<this.trophies.length; t++){
    //   if(this.trophies[t].currentState === this.trophies[t].states.OFF){
    //     this.trophies.splice(t, 1);
    //     // console.log("Traps = "+this.traps.length+"\nTrophies = "+this.trophies.length);
    //     break;
    //   }
    // }
  };
  //---------------------------------------------------------------
  this.getTrapsRectangle = function(){
    var tempTrapsArr=[];
    for(var t=0; t<this.traps.length; t++){
      tempTrapsArr.push(this.traps[t].getRectangle());
    }
    return tempTrapsArr;
  }
  this.getTrapsRectangle2 = function(){
    var tempTrapsArr=[];
    for(var t=0; t<this.traps.length; t++){
      tempTrapsArr.push(this.traps[t].getRectangle2());
    }
    return tempTrapsArr;
  }
  //---------------------------------------------------------------
  this.getTrophiesRectangle = function(){
    var tempTrophiesArr=[];
    for(var t=0; t<this.trophies.length; t++){
      tempTrophiesArr.push(this.trophies[t].getRectangle());
    }
    return tempTrophiesArr;
  }
  //---------------------------------------------------------------
}
