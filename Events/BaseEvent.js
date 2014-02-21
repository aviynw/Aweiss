(function(){
var importList = [];
DEFINE('Aweiss.Events.BaseEvent', Class, importList);

function Class() {
	eval(this.eval);
	Public.eventType=null;
	Public.timestamp=null;
	Public.message=null;
	
	Public.init = function(eventType, message){
		eval(this.eval);
		this.eventType=eventType;
		this.message=message;
		this.timestamp= new Date();
	};
};
})();