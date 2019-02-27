var BlankModulePrototype={
  //---------------------------------------------------------------
  settings: {},
  subModules: [],
  //---------------------------------------------------------------
  subModulesRun: function(...args){
    if(arguments.length>0){
      var argsArray, subModules, func;
      argsArray = Array.from(arguments);
      subModules = argsArray.splice(0,1)[0];
      func = argsArray.splice(0,1)[0];
      for(var smCount=0; smCount<subModules.length; smCount++){
        subModules[smCount][fnc](argsArray);
      }
    }
  },
  //---------------------------------------------------------------
  update: function(){
    console.log("update");
    this.subModulesRun(this.subModules, "update");
  },
  //---------------------------------------------------------------
  draw: function(){
    console.log("draw");
    this.subModulesRun(this.subModules, "draw");
  }
  //---------------------------------------------------------------
}
