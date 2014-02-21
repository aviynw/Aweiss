(function(){
var nameSpace = "Aweiss";
var className = 'State';

var fullName = nameSpace + '.' + className;
Namespace(fullName);

Importer.getList(['Aweiss.Count', 'Aweiss.Tools', 'Aweiss.Transition'], fullName, ready);

Aweiss.State = function() {
	var model=this;
	this.pageParameterLists = {};
	this.linkTransitions = {};
	this.counter = new Count();
	this.parametersToRemember=[];
	this.rememberedParameters={};
	this.linkIds={};
	
	this.assignNewLinkId=function(link){
		var id="linkID" + this.counter.count();
		this.linkIds[link]=id;
		return id;
	};
	
	this.registerParameter = function(page, parameter, toRemember) {
		if (!this.pageParameterLists[page]) {
			this.pageParameterLists[page] = new Array();
		}
		this.pageParameterLists[page].push(parameter);
		if(toRemember){
			this.parametersToRemember.push(parameter);
			}
	};

	this.registerTransition = function(linkId, transition) {
		this.linkTransitions[linkId]=transition;
	};

	this.initTransitions = function() {
		jQuery("a").each(function(index) {
			var transition = new Transition(this.href);
			if(transition!=null){
				model.registerTransition(model.assignNewLinkId(this), transition);
			}
		});
	};
	
	this.stateChangedTo = function(page, link) {
	this.initTransitions();
	var parameterList = this.pageParameterLists[page];
	var discardedTransitions = this.linkTransitions[this.linkIds[link]].getDiscardedTransitions(parameterList);
				for(transition in discardedTransitions){
					if(jQuery.inArray(transition, this.parametersToRemember)){
						this.rememberedParameters[transition]=discardedTransitions[transition];
					}
				};
				
		jQuery("a").each(function() {
			var link=this;
			var domainName = link.hostname;
			if (domainName == document.domain) {
				var oldHashParams = Tools.getParams();
				var transition = model.linkTransitions[model.linkIds[link]];
				transition.addTransitions(oldHashParams);
				transition.addTransitions(model.rememberedParameters);
				var parameterList = model.pageParameterLists[page];
				var newTransitions = transition.getFilteredTransitions(parameterList);
				link.href=Tools.addParamsToString(link.href, newTransitions);
			}
		});
	};
};

function ready(model) {
}
})();