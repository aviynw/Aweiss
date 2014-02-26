(function(){
	
var importList = [];
var name='Aweiss.Utils.Exception';

DEFINE(name, Class, importList);

function Class(){
	eval(this.eval);
	Public.message=null;
	
	Public.init=function(message){
		var _ = this;
		_.message=message;
	}
	Public.toString=function(){
		var _ = this;
		return _.message;
	}
}
})();