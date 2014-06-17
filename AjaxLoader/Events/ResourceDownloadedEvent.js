(function(){
var importList = ['Aweiss.Events.DynamicEvent'];

OOPS.DEFINE('Aweiss.AjaxLoader.Events.ResourceDownloadedEvent', Class, importList, {'extends':'Aweiss.Events.DynamicEvent'});

function Class() {
eval(this.magic);
(function(){
'use strict';
	Public.content='';
	Public.Static.init=function(){
		var _ = this.magic ? eval(this.magic) : this;
		Static.this.super('RESOURCE_DOWNLOADED_');
	}
	Public.init = function(url, content){
		//;
		var _ = this.magic ? eval(this.magic) : this;
		_.super('init', url);
		_.content=content;
	}})();
};
})();
