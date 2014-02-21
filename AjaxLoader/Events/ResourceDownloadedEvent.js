(function(){
var importList = ['Aweiss.Events.DynamicEvent'];

DEFINE('Aweiss.AjaxLoader.Events.ResourceDownloadedEvent', Class, importList, {'extends':'Aweiss.Events.DynamicEvent'});

function Class(){
	eval(this.eval);
	Public.content='';
	
	Static.Public.init=function(){
		eval(this.eval);
		_model._super('RESOURCE_DOWNLOADED_');
	}
	Public.init = function(url, content){
		//debugger;
		eval(this.eval);
		this._super(url);
		_.content=content;
	};
};
})();
