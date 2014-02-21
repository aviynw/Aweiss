(function(){
var importList = [];
DEFINE('Aweiss.Test.Test', Class, importList);

function Class() {
	eval(this.eval);
	
	//Private.a=null;
	Public.b='VALUE OF B';
	Protected.c='VALUE OF C';
	PackagePriv.d='VALUE OF D';
	Private.maskedA='masked a';
	Private.p='p';
	Private.p2=function(){}
	Public.init=function(a){
		eval(this.eval);
	}
	
	PackagePriv.Get.a=function(){
		eval(this.eval);
		var p='p';
		return _.maskedA;
		};
		
	PackagePriv.Set.a=function(l){
		eval(this.eval);
		var p='p';
		_.maskedA= Math.random();
		};
		
	Public.Get.k=function(){
		eval(this.eval);
		window.setTimeout(function(){
			var p='p';
			var k = _;
			alert('m');
		},100);
		return _.maskedA;
		};
		
	Public.Set.k=function(l){
		eval(this.eval);
		_.maskedA= l;
		};
	Public.potato=function(l){
		eval(this.eval);
		var p='p';
		};
	Public.test=function(testArg){
			_.b='b';
		}
	Static.Public.static=function(){}
};
})();
