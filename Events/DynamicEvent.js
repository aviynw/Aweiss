(function(){
var importList = ['Aweiss.Events.BaseEvent'];

DEFINE('Aweiss.Events.DynamicEvent', Class, importList, {'extends':'Aweiss.Events.BaseEvent'});

function Class(){
	eval(this.eval)
	
	Static.Public.generalEventType=null;
	Public.specificEventType=null;
	
	Static.Public.init=function(generalEventType){
		eval(this.eval);
		_model.generalEventType=generalEventType;
	}
	Public.init = function(specificEventType, message){
		eval(this.eval);
		_.specificEventType=specificEventType;
		if(_.specificEventType==null){
			_.specificEventType="";
		}
		_._super(_this.getEventType(), message);
	};
	
	Public.getEventType=function(){
		eval(this.eval);
		return _model.getEventType(_this.specificEventType);
	};
	Static.Public.getEventType=function(specific){
		eval(this.eval);
		if(specific!=null&&specific!=""){
			return _model.generalEventType+'_'+specific;
		}
		else{
			return _model.generalEventType;
		}
	}
};
})();