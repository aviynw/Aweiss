(function(){
	
var importList = ['Aweiss.Utils.Exception'];
var name='Aweiss.Utils.Asserter';

OOPS.DEFINE(name, Class, importList);

function Class() {
eval(this.magic);
(function(){
'use strict';
	
	Public.Static.assert=function(statement){
		var _ = this.magic ? eval(this.magic) : this;
		if(!statement){
			throw new Error('assertion failed');
		}
	}})();
}
})();