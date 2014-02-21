(function(){
var importList = ['Aweiss.Test2'];
DEFINE('Aweiss.AsyncTest', Class, importList);

function Class() {
	eval(this.eval);
	Static.Public.obj={
		b:'b'
	};
	Static.Public.staticFunction=function(){
		var a='a';
	}
	
	Public.init=function(a){
		eval(this.eval);
	}
	
	Public.Async.test=function(p, callback){
		eval(this.eval)
		if(false){
			callback('potato');		
		}
		else{return _.test2(p, function(e){
			return (e+'asyncTest1');
		});
	}
	}
	
	Public.Async.test2=function(q){
		eval(this.eval)
		debugger;
		var test2 = new Test2();
		var q = test2.q()
		return test2.r(function(e){
			return e + 'ASYNCTEST.test2';
		});
	}
	
	Public.test3=function(q){
		eval(this.eval)
		return 'AsyncTEST3'+q;
	}
};
})();