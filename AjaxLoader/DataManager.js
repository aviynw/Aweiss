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
		_model.initiatorWindow=_model.getWindowByName(_model.initiatorName);
		_model.initiatorWindow[_model.contextName]={};
	}
	
	Static.Private.getWindowByName = function(name){
		var _ = this;
		return Tools.getWindowByName(_model.contextualizeName(name));
	}
	
	Static.Private.setWindowName = function(theWindow, name){
		var _ = this;
		theWindow.name=_model.contextualizeName(name);
	}
	
	Static.Private.contextualizeName = function(name){
		var _ = this;
		return _model.contextName+name;
	}
	
	Static.Public.getItem=function(itemName, id){
		var _ = this;
		return _model.getContext(id)[itemName];
	}
	
	Static.Public.getContext = function(id){
		var _ = this;
		id=unescape(id);
		try{
			var context = _model.initiatorWindow[_model.contextName];
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
		_model.setItem(itemName,null,id);
	}
	
	Static.Public.clearContext = function(id){
		var _ = this;
		_model.setContext(null, id);
	}
	
	Static.Public.setItem=function(itemName, obj, id){
		var _ = this;
		var context = _model.getContext(id);
		context[itemName]=obj;
	}
	
	Static.Public.setContext=function(context, id){
		var _ = this;
		id=unescape(id);
		if(_model.initiatorWindow[_model.contextName]==null){
			_model.initiatorWindow[_model.contextName]={};
		}
		var context = _model.initiatorWindow[_model.contextName];
		if(id!=null){
			context[id]=context;
		}
		else{
			context['initiator']=context;
		}
	}
}
})();