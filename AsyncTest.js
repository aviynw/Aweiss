(function(){
var importList = ['Aweiss.Test2'];
OOPS.DEFINE('Aweiss.AsyncTest', Class, importList);

function Class() {
eval(this.magic);
(function(){
'use strict';
	Public.Static.obj={
		b:'b'
	};
	Public.Static.staticFunction=function(){
		var a='a';
	}
	
	Public.init=function(a){
		var _ = this.magic ? eval(this.magic) : this;
	}
	
	Public.Async.test=function(p, callback){
		var _ = this.magic ? eval(this.magic) : this;
		if(false){
			callback('potato');		
		}
		else{return _.test2(p, function(e){
			return (e+'asyncTest1');
		});
	}
	}
	
	Public.Async.test2=function(q){
		var _ = this.magic ? eval(this.magic) : this;
		;
		var test2 = new Test2();
		var q = test2.q()
		return test2.r(function(e){
			return e + 'ASYNCTEST.test2';
		});
	}
	
	Public.test3=function(q){
		var _ = this.magic ? eval(this.magic) : this;
		return 'AsyncTEST3'+q;
	}
};
})();