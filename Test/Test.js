(function(){
var importList = [];
OOPS.DEFINE('Aweiss.Test.Test', Class, importList);

function Class() {
eval(this.magic);
(function(){
'use strict';
	
	//Private.a=null;
	Public.b='VALUE OF B';
	Protected.c='VALUE OF C';
	Package.d='VALUE OF D';
	Private.maskedA='masked a';
	Private.p='p';
	Private.p2=function(){}
	Public.init=function(a){
		var _ = this.magic ? eval(this.magic) : this;
	}
	
	Package.Get.a=function(){
		var _ = this.magic ? eval(this.magic) : this;
		var p='p';
		return _.maskedA;
		};
		
	Package.Set.a=function(l){
		var _ = this.magic ? eval(this.magic) : this;
		var p='p';
		_.maskedA= Math.random();
		};
		
	Public.Get.k=function(){
		var _ = this.magic ? eval(this.magic) : this;
		window.setTimeout(function(){
			var p='p';
			var k = _;
			alert('m');
		},100);
		return _.maskedA;
		};
		
	Public.Set.k=function(l){
		var _ = this.magic ? eval(this.magic) : this;
		_.maskedA= l;
		};
	Public.potato=function(l){
		var _ = this.magic ? eval(this.magic) : this;
		var p='p';
		};
	Public.test=function(testArg){
			_.b='b';
		}
	Public.Static.static=function(){}})();
};
})();
