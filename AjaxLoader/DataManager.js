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
		eval(this.eval);
		_model.initiatorWindow=_model.getWindowByName(_model.initiatorName);
		_model.initiatorWindow[_model.contextName]={};
	}
	
	Static.Private.getWindowByName = function(name){
		eval(this.eval);
		return Tools.getWindowByName(_model.contextualizeName(name));
	}
	
	Static.Private.setWindowName = function(theWindow, name){
		eval(this.eval);
		theWindow.name=_model.contextualizeName(name);
	}
	
	Static.Private.contextualizeName = function(name){
		eval(this.eval);
		return _model.contextName+name;
	}
	
	Static.Public.getItem=function(itemName, id){
		eval(this.eval);
		return _model.getContext(id)[itemName];
	}
	
	Static.Public.getContext = function(id){
		eval(this.eval);
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
		eval(this.eval);
		_model.setItem(itemName,null,id);
	}
	
	Static.Public.clearContext = function(id){
		eval(this.eval);
		_model.setContext(null, id);
	}
	
	Static.Public.setItem=function(itemName, obj, id){
		eval(this.eval);
		var context = _model.getContext(id);
		context[itemName]=obj;
	}
	
	Static.Public.setContext=function(context, id){
		eval(this.eval);
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