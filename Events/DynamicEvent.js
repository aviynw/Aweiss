(function(){
var importList = ['Aweiss.Events.BaseEvent'];

OOPS.DEFINE('Aweiss.Events.DynamicEvent', Class, importList, {'extends':'Aweiss.Events.BaseEvent'});

function Class() {
eval(this.magic);
(function(){
'use strict';
	
	Public.Static.generalEventType=null;
	Public.specificEventType=null;
	
	Public.Static.init=function(generalEventType){
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.generalEventType=generalEventType;
	}
	Public.init = function(specificEventType, message){
		var _ = this.magic ? eval(this.magic) : this;
		_.specificEventType=specificEventType;
		if(_.specificEventType==null){
			_.specificEventType="";
		}
		_.super(_.getEventType(), message);
	};
	
	Public.getEventType=function(){
		var _ = this.magic ? eval(this.magic) : this;
		return _.Static.getEventType(_.specificEventType);
	};
	Public.Static.getEventType=function(specific){
		var _ = this.magic ? eval(this.magic) : this;
		if(specific!=null&&specific!=""){
			return _.Static.generalEventType+'_'+specific;
		}
		else{
			return _.Static.generalEventType;
		}
	}})();
};
})();