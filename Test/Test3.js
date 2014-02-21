(function(){
var importList = ['Aweiss.Test.Test', 'Aweiss.Test2'];
DEFINE('Aweiss.Test.Test3', Class, importList);

function Class() {
	eval(this.eval);
	
	Static.Public.staticPUB=function(){
	var a ='a';	
	};
	
	Static.Private.staticPriv=function(){
	var a ='a';	
	};
	
	Public.init=function(){
		var a = new Test2();
	}
	Public.test=function(){
		var a ='a';
	}
};
})();