(function(){
var importList = ['Aweiss.Test2'];
DEFINE('Aweiss.AsyncTest', Class, importList);

function Class(){
	eval(this.eval);
	Static.Public.obj={
		b:'b'
	};
	Static.Public.staticFunction=function(){
		var a='a';
	}
	
	Public.init=function(a){
		var _ = this;
	}
	
	Public.Async.test=function(p, callback){
		var _ = this
		if(false){
			callback('potato');		
		}
		else{return _.test2(p, function(e){
			return (e+'asyncTest1');
		});
	}
	}
	
	Public.Async.test2=function(q){
		var _ = this
		debugger;
		var test2 = new Test2();
		var q = test2.q()
		return test2.r(function(e){
			return e + 'ASYNCTEST.test2';
		});
	}
	
	Public.test3=function(q){
		var _ = this
		return 'AsyncTEST3'+q;
	}
};
})();