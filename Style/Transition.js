(function(){
var nameSpace = "Aweiss";
var className = 'Transition';

var fullName = nameSpace + '.' + className;
Namespace(fullName);

Importer.getList(['Aweiss.Tools'], fullName, ready);

Aweiss.Transition = function(url) {
	
	this.transitions=Tools.getParamsFromString(Tools.extractHash(url));
	
	this.addTransition = function(key, value){
		if(!this.transitions){
			this.transitions={};
		}
		this.transitions[key]=value;
	};
	
	this.addTransitions = function(newTransitions){
		for(transition in newTransitions){
			this.addTransition(transition, newTransitions[transition]);
		}
	}
		
	this.removeTransition = function(transitions){
		delete transitions[transition];
	};
	
	this.load=function(){
		Transition.loadTransition(this);
	};
	this.loadOnly=function(transitionFilter){
		Transition.loadTransitionButOnly(this, transitionFilter);
	};
	
	this.getAsString = function(transitionFilter){
		return Transition.getTransitionAsString(this, transitionFilter);
	};
	
	this.getFilteredTransitions=function(transitionFilter){
		return Transition.getFilteredTransitions(this, transitionFilter);
	};
	this.getDiscardedTransitions=function(transitionFilter){
		return Transition.getDiscardedTransitions(this, transitionFilter);
	};
}

function ready(model){
	
	model.loadTransition = function(transition){
		Tools.addParams(transition.transitions);
	};
	
	model.loadTransitionButOnly = function(transition, transitionFilter){
		loadTransition(transitions, getFilteredTransitions(transition, transitionFilter));
	};
	
	model.getTransitionAsString = function(transition, transitionFilter){
		return tools.addParamsToString("", getFilteredTransitions(transition, transitionFilter));
	};
	
	model.getFilteredTransitions=function(transition, transitionFilter){
	var filteredTransitions= new Array();
		for(transition in transition.transitions){
			if(jQuery.inArray(transition, transitionFilter)){
				filteredTransitions.push(transition);
			}
		}
		return filteredTransitions;
		};
	
	model.getDiscardedTransitions=function(transition, transitionFilter){
		var filteredTransitions= new Array();
		for(transition in transition.transitions){
			if(!jQuery.inArray(transition, transitionFilter)){
				filteredTransitions.push(transition);
			}
		}
		return filteredTransitions;
		};
}
})();
