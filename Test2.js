(function(){
var importList = ['Aweiss.Test.Test'];
OOPS.DEFINE('Aweiss.Test2', Class, importList, {'extends':'Aweiss.Test.Test'});

function Class() {
eval(this.magic);
(function(){
'use strict';
	
	Public.init=function(){
		var _ = this.magic ? eval(this.magic) : this;
		var a = new Test();
	}
	Public.q=function(){
		var _ = this.magic ? eval(this.magic) : this;
		return 'a';
	}
	Public.Async.r=function(){
		var _ = this.magic ? eval(this.magic) : this;
		return 'b';
	}
};
})();