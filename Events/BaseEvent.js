(function(){
var importList = [];
OOPS.DEFINE('Aweiss.Events.BaseEvent', Class, importList);

function Class() {
eval(this.magic);
(function(){
'use strict';
	Public.eventType=null;
	Public.timestamp=null;
	Public.message=null;
	
	Public.init = function(eventType, message){
		var _ = this.magic ? eval(this.magic) : this;
		this.eventType=eventType;
		this.message=message;
		this.timestamp= new Date();
	}})();
};
})();