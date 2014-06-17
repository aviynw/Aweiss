(function(){
	
var importList = [];
var name='Aweiss.Utils.Exception';

OOPS.DEFINE(name, Class, importList);

function Class() {
eval(this.magic);
(function(){
'use strict';
	Public.message=null;
	
	Public.init=function(message){
		var _ = this.magic ? eval(this.magic) : this;
		_.message=message;
	}
	Public.toString=function(){
		var _ = this.magic ? eval(this.magic) : this;
		return _.message;
	}})();
}
})();