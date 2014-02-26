(function(){
var importList = ['Aweiss.Events.BaseEvent'];

DEFINE('Aweiss.Events.DynamicEvent', Class, importList, {'extends':'Aweiss.Events.BaseEvent'});

function Class(){
	eval(this.eval);
	
	Static.Public.generalEventType=null;
	Public.specificEventType=null;
	
	Static.Public.init=function(generalEventType){
		var _ = this;
		_model.generalEventType=generalEventType;
	}
	Public.init = function(specificEventType, message){
		var _ = this;
		_.specificEventType=specificEventType;
		if(_.specificEventType==null){
			_.specificEventType="";
		}
		_.this.super(_this.getEventType(), message);
	};
	
	Public.getEventType=function(){
		var _ = this;
		return _model.getEventType(_this.specificEventType);
	};
	Static.Public.getEventType=function(specific){
		var _ = this;
		if(specific!=null&&specific!=""){
			return _model.generalEventType+'_'+specific;
		}
		else{
			return _model.generalEventType;
		}
	}
};
})();