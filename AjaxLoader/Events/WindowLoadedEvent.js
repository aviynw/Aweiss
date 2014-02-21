(function(){
var importList = ['Aweiss.Events.DynamicEvent'];

Importer.getAndDefine('Aweiss.AjaxLoader.Events.WindowLoadedEvent', Class, importList, {'extends':'Aweiss.Events.DynamicEvent'});

function Class(){
	eval(this.eval)
	
	Public.init = function(url){
		eval(this.eval);
		this._super('WINDOW_LOADED_', url);
	};
};
})();
