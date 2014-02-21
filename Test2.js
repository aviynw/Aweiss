(function(){
var importList = ['Aweiss.Test.Test'];
DEFINE('Aweiss.Test2', Class, importList, {'extends':'Aweiss.Test.Test'});

function Class() {
	eval(this.eval);
	
	Public.init=function(){
		eval(this.eval);
		var a = new Test();
	}
	Public.q=function(){
		eval(this.eval);
		return 'a';
	}
	Public.Async.r=function(){
		eval(this.eval);
		return 'b';
	}
};
})();