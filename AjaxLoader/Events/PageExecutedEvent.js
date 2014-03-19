(function(){
var importList = ['Aweiss.Events.DynamicEvent'];

DEFINE('Aweiss.AjaxLoader.Events.PageExecutedEvent', Class, importList, {'extends':'Aweiss.Events.DynamicEvent'});

function Class(){
	eval(this.eval);
	
	Static.Public.init=function(){
		var _ = this;
		_.static.this.super('Page_Rendered_');
	}
	
	Public.init = function(url){
		//;
		var _ = this;
		this.this.super(url);
	};
}
})();
