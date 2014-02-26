(function(){
var importList = ['Aweiss.Test.Test'];
DEFINE('Aweiss.Test2', Class, importList, {'extends':'Aweiss.Test.Test'});

function Class(){
	eval(this.eval);
	
	Public.init=function(){
		var _ = this;
		var a = new Test();
	}
	Public.q=function(){
		var _ = this;
		return 'a';
	}
	Public.Async.r=function(){
		var _ = this;
		return 'b';
	}
};
})();