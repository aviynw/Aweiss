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
		Static.initiatorWindow=Static.getWindowByName(Static.initiatorName);
		Static.initiatorWindow[Static.contextName]={};
	}
	
	Private.Static.getWindowByName = function(name){
		var _ = this.magic ? eval(this.magic) : this;
		return Tools.getWindowByName(Static.contextualizeName(name));
	}
	
	Private.Static.setWindowName = function(theWindow, name){
		var _ = this.magic ? eval(this.magic) : this;
		theWindow.name=Static.contextualizeName(name);
	}
	
	Private.Static.contextualizeName = function(name){
		var _ = this.magic ? eval(this.magic) : this;
		return Static.contextName+name;
	}
	
	Public.Static.getItem=function(itemName, id){
		var _ = this.magic ? eval(this.magic) : this;
		return Static.getContext(id)[itemName];
	}
	
	Public.Static.getContext = function(id){
		var _ = this.magic ? eval(this.magic) : this;
		id=unescape(id);
		try{
			var context = Static.initiatorWindow[Static.contextName];
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
		Static.setItem(itemName,null,id);
	}
	
	Public.Static.clearContext = function(id){
		var _ = this.magic ? eval(this.magic) : this;
		Static.setContext(null, id);
	}
	
	Public.Static.setItem=function(itemName, obj, id){
		var _ = this.magic ? eval(this.magic) : this;
		var context = Static.getContext(id);
		context[itemName]=obj;
	}
	
	Public.Static.setContext=function(context, id){
		var _ = this.magic ? eval(this.magic) : this;
		id=unescape(id);
		if(Static.initiatorWindow[Static.contextName]==null){
			Static.initiatorWindow[Static.contextName]={};
		}
		var context = Static.initiatorWindow[Static.contextName];
		if(id!=null){
			context[id]=context;
		}
		else{
			context['initiator']=context;
		}
	}})();
}
})();