(function(){
var importList = [];
OOPS.DEFINE('Aweiss.Events.DomEvent', Class, importList);

function Class() {
eval(this.magic);
(function(){
'use strict';
	Public.win=null;
	Public.eventName=null;
	Public.listener=null
	
	Public.init = function(win, eventName, listener){
		var _ = this.magic ? eval(this.magic) : this;
		_.win=win;
		_.eventName=eventName;
		_.listener=listener;
	}})();
};
})();