(function(){
var importList = ['Aweiss.Events.DynamicEvent'];

DEFINE('Aweiss.AjaxLoader.Events.ResourceDownloadedEvent', Class, importList, {'extends':'Aweiss.Events.DynamicEvent'});

function Class(){
	eval(this.eval);
	Public.content='';
	
	Static.Public.init=function(){
		var _ = this;
		_model.this.super('RESOURCE_DOWNLOADED_');
	}
	Public.init = function(url, content){
		//debugger;
		var _ = this;
		this.this.super(url);
		_.content=content;
	};
};
})();
