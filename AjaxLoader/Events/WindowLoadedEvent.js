(function(){
var importList = ['Aweiss.Events.DynamicEvent'];

OOPS.getAndDefine('Aweiss.AjaxLoader.Events.WindowLoadedEvent', Class, importList, {'extends':'Aweiss.Events.DynamicEvent'});

function Class() {
eval(this.magic);
(function(){
'use strict';
	
	Public.init = function(url){
		var _ = this.magic ? eval(this.magic) : this;
		_.super('init','WINDOW_LOADED_', url);
	}})();
};
})();
