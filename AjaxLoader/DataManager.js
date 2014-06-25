(function(){
	
var importList = ['Aweiss.Utils.Tools'];
var name='Aweiss.AjaxLoader.DataManager';

OOPS.DEFINE(name, Class, importList);

function Class() {
eval(this.magic);
(function(){
'use strict';
	
	Private.Static.contextName ='aweiss_ajax_load_';
	Private.Static.initiatorName='initiator';
	Public.Static.initiatorWindow=null;
	
	Public.Static.init=function(){
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.initiatorWindow=_.Static.getWindowByName(_.Static.initiatorName);
		_.Static.initiatorWindow[_.Static.contextName]={};
	}
	
	Private.Static.getWindowByName = function(name){
		var _ = this.magic ? eval(this.magic) : this;
		return Tools.getWindowByName(_.Static.contextualizeName(name));
	}
	
	Private.Static.setWindowName = function(theWindow, name){
		var _ = this.magic ? eval(this.magic) : this;
		theWindow.name=_.Static.contextualizeName(name);
	}
	
	Private.Static.contextualizeName = function(name){
		var _ = this.magic ? eval(this.magic) : this;
		return _.Static.contextName+name;
	}
	
	Public.Static.getItem=function(itemName, id){
		var _ = this.magic ? eval(this.magic) : this;
		return _.Static.getContext(id)[itemName];
	}
	
	Public.Static.getContext = function(id){
		var _ = this.magic ? eval(this.magic) : this;
		id=unescape(id);
		try{
			var context = _.Static.initiatorWindow[_.Static.contextName];
		if(id!=null){
			if(context[id]==null){
				context[id]={};
			}
			context=context[id];
		}
		else{
			context=context.initiator;
		}
		return context;
		}
		catch(e){
		}
	}
	
	Public.Static.removeItem=function(itemName, id){
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.setItem(itemName,null,id);
	}
	
	Public.Static.clearContext = function(id){
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.setContext(null, id);
	}
	
	Public.Static.setItem=function(itemName, obj, id){
		var _ = this.magic ? eval(this.magic) : this;
		var context = _.Static.getContext(id);
		context[itemName]=obj;
	}
	
	Public.Static.setContext=function(context, id){
		var _ = this.magic ? eval(this.magic) : this;
		id=unescape(id);
		if(_.Static.initiatorWindow[_.Static.contextName]==null){
			_.Static.initiatorWindow[_.Static.contextName]={};
		}
		var context = _.Static.initiatorWindow[_.Static.contextName];
		if(id!=null){
			context[id]=context;
		}
		else{
			context['initiator']=context;
		}
	}})();
}
})();