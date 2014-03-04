(function(){
	
var importList = ['Aweiss.Utils.Tools'];
var name='Aweiss.AjaxLoader.DataManager';

DEFINE(name, Class, importList);

function Class(){
	eval(this.eval);
	
	Static.Private.contextName ='aweiss_ajax_load_';
	Static.Private.initiatorName='initiator';
	Static.Public.initiatorWindow=null;
	
	Static.Public.init=function(){
		var _ = this;
		_.static.initiatorWindow=_.static.getWindowByName(_.static.initiatorName);
		_.static.initiatorWindow[_.static.contextName]={};
	}
	
	Static.Private.getWindowByName = function(name){
		var _ = this;
		return Tools.getWindowByName(_.static.contextualizeName(name));
	}
	
	Static.Private.setWindowName = function(theWindow, name){
		var _ = this;
		theWindow.name=_.static.contextualizeName(name);
	}
	
	Static.Private.contextualizeName = function(name){
		var _ = this;
		return _.static.contextName+name;
	}
	
	Static.Public.getItem=function(itemName, id){
		var _ = this;
		return _.static.getContext(id)[itemName];
	}
	
	Static.Public.getContext = function(id){
		var _ = this;
		id=unescape(id);
		try{
			var context = _.static.initiatorWindow[_.static.contextName];
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
	
	Static.Public.removeItem=function(itemName, id){
		var _ = this;
		_.static.setItem(itemName,null,id);
	}
	
	Static.Public.clearContext = function(id){
		var _ = this;
		_.static.setContext(null, id);
	}
	
	Static.Public.setItem=function(itemName, obj, id){
		var _ = this;
		var context = _.static.getContext(id);
		context[itemName]=obj;
	}
	
	Static.Public.setContext=function(context, id){
		var _ = this;
		id=unescape(id);
		if(_.static.initiatorWindow[_.static.contextName]==null){
			_.static.initiatorWindow[_.static.contextName]={};
		}
		var context = _.static.initiatorWindow[_.static.contextName];
		if(id!=null){
			context[id]=context;
		}
		else{
			context['initiator']=context;
		}
	}
}
})();