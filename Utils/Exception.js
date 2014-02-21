(function(){
	
var importList = [];
var name='Aweiss.Utils.Exception';

DEFINE(name, Class, importList);

function Class(){
	eval(this.eval);
	Public.message=null;
	
	Public.init=function(message){
		eval(this.eval);
		_.message=message;
	}
	Public.toString=function(){
		eval(this.eval);
		return _.message;
	}
}
})();