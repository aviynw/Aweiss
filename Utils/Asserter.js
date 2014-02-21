(function(){
	
var importList = ['Aweiss.Utils.Exception'];
var name='Aweiss.Utils.Asserter';

DEFINE(name, Class, importList);

function Class(){
	eval(this.eval);
	
	Static.Public.assert=function(statement){
		eval(this.eval);
		if(!statement){
			throw new Error('assertion failed');
		}
	}
}
})();