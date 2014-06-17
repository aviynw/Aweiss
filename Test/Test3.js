(function(){
var importList = ['Aweiss.Test.Test', 'Aweiss.Test2'];
OOPS.DEFINE('Aweiss.Test.Test3', Class, importList);

function Class() {
eval(this.magic);
(function(){
'use strict';
	
	Public.Static.staticPUB=function(){
	var a ='a';	
	};
	
	Private.Static.staticPriv=function(){
	var a ='a';	
	};
	
	Public.init=function(){
		var a = new Test2();
	}
	Public.test=function(){
		var a ='a';
	}})();
};
})();