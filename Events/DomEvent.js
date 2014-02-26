(function(){
var importList = [];
DEFINE('Aweiss.Events.DomEvent', Class, importList);

function Class(){
	eval(this.eval);
	Public.win=null;
	Public.eventName=null;
	Public.listener=null
	
	Public.init = function(win, eventName, listener){
		var _ = this;
		_.win=win;
		_.eventName=eventName;
		_.listener=listener;
	};
};
})();