(function(){

var importList = [ 'Aweiss.Events.BaseEvent', 'Aweiss.Events.DynamicEvent', 'Aweiss/DataStructures/DirectedGraph.js',
    ['JSCOLS-BASE', 'Libs/js_cols/base.js'],
    ['JSCOLS-LINKEDLIST','Libs/js_cols/LinkedList.js',['JSCOLS-BASE']],
    ['JSCOLS-QUEUE','Libs/js_cols/Queue.js',['JSCOLS-LINKEDLIST']]];

OOPS.DEFINE('Aweiss.Events.EventManager', Class, importList);

function Class() {
eval(this.magic);
(function(){
'use strict';
	
	Public.Static.listeners = {};
	Public.Static.queuedListeners = {};
	Public.Static.relayedListeners = {};
	Public.Static.cumlativeListeners = null;
	Public.Static.pastEvents = null;
	
	Public.Static.init=function(){
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.cumlativeListeners = new DirectedGraph();
		_.Static.cumlativeListeners.setType('unidirectional');
		_.Static.pastEvents = new js_cols.LinkedList();
	}
	
	Public.Static.addListener = function(eventType, todo, happenedMatters) {
		var _ = this.magic ? eval(this.magic) : this;
		var todoList = _.Static.listeners[eventType];
		if (todoList == null) {
			_.Static.listeners[eventType] = new js_cols.LinkedList();
		}
		_.Static.listeners[eventType].addLast(todo);
		if(happenedMatters===true){
			_.Static.alertForPastEvents(eventType, _.Static.alertListeners);
		}
	};
	
	Private.Static.didEventTypeHappen=function(eventType){
		var _ = this.magic ? eval(this.magic) : this;
		function test(event) {
			if (event.eventType == eventType) {
				return true;
			} else {
				return false;
			}
		}
		if (_.Static.pastEvents.containsPassingElement(test)) {
			return true;
		}
		else{
			return false;
		}
	};
	Private.Static.getPastEventsOfType = function(eventType){
		var _ = this.magic ? eval(this.magic) : this;
		function test(event) {
			if (event.eventType == eventType) {
				return true;
			} else {
				return false;
			}
		}
		return _.Static.pastEvents.filter(test);
	};
	
	Private.Static.alertForPastEvents=function(eventType, alertFunction){
		var _ = this.magic ? eval(this.magic) : this;
		var pastEventsOfType = _.Static.getPastEventsOfType(eventType);
		var lastEvent = pastEventsOfType[pastEventsOfType.length-1];
		if(lastEvent!=null){
			alertFunction(lastEvent);
		}
	};
	
	Private.Static.handleEventResult = function(event, result){
		var _ = this.magic ? eval(this.magic) : this;
		if (typeof result === 'function') {
			result(event);
		}
		if (typeof result === 'string') {
			_.Static.fire(new BaseEvent(result));
		}
	};
	
	Private.Static.addToQueue=function(queueList, eventType, todo){
		var _ = this.magic ? eval(this.magic) : this;
		var todoList = queueList[eventType];
		if (todoList == null) {
			queueList[eventType] = new js_cols.Queue();
		}
		var queue =queueList[eventType];
		queue.enqueue(todo);
		return queue;
	}
	
	Public.Static.queueListener = function(eventType, todo) {
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.addToQueue(_.Static.queuedListeners, eventType, todo)
	};
	
	/*Public.Static.hasRelayedListeners = function(eventType){
		var queue = _.Static.relayedListeners;
		if(queue)
	}*/
	
	Public.Static.queueRelayListener = function(eventType, todo) {
		var _ = this.magic ? eval(this.magic) : this;
		var queueList = _.Static.relayedListeners;
		var queue = _.Static.addToQueue(queueList, eventType, todo);
		if(queue.size==1){
			queue.enqueue(function(e){
				_.Static.alertRelayedListeners(e);
			});
			_.Static.alertRelayedListeners(new BaseEvent(eventType, 'Fake Event.  listenered queued on empty queue, so running now.'));
		}
	};
	
	Public.Static.addCumlativeListener = function(eventType, todo) {
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.cumlativeListeners.addNode(eventType);
		_.Static.cumlativeListeners.addNode(todo);
		_.Static.cumlativeListeners.addEdge(eventType, todo);
		/*if(happenedMatters===true){
			alertForPastEvents(eventType, alertStatic.cumlativeListeners);
		}*/
	};

	Public.Static.addCumlativeListeners= function(eventTypes, todo, happenedMatters) {
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.cumlativeListeners.addNodesFromArray(eventTypes);
		_.Static.cumlativeListeners.addNode(todo);
		for ( var i = 0; i < eventTypes.length; i++) {
			_.Static.cumlativeListeners.addEdge(eventTypes[i], todo);
		}
		if(happenedMatters===true){
			for ( var i = 0; i < eventTypes.length; i++) {
				alertForPastEvents(eventType, alertStatic.cumlativeListeners);
			};
		};
	};
	
	Public.Static.hasListener=function(eventType){
		
	}
	
	Private.Static.listHasListener=function(eventType, list){
		var _ = this.magic ? eval(this.magic) : this;
		if(list[eventType]==null){
			return false;
		}
		else if(!list[eventType].size>0){
			return false;
		}
		else{
			return true;
		}
	}
	
	Public.Static.hasQueuedListener=function(eventType){
		var _ = this.magic ? eval(this.magic) : this;
		return _.Static.listHasListener(eventType, _.Static.queuedListeners);
	}
	
	Public.Static.removeListener = function(eventType, todo) {
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.removeFromList(eventType, todo, _.Static.listeners);
		_.Static.removeFromList(eventType, todo, _.Static.queuedListeners);
		_.Static.removeFromList(eventType, todo, _.Static.cumlativeListeners);
		_.Static.removeFromList(eventType, todo, _.Static.relayedListeners);
	};

	Private.Static.removeFromList=function(eventType, todo, list) {
		var _ = this.magic ? eval(this.magic) : this;
		var todoList = list[eventType];
		todoList.remove(todo);
	};

	Private.Static.alert=function(event){
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.alertListeners(event);
		_.Static.alertQueuedListeners(event);
		_.Static.alertRelayedListeners(event);
		_.Static.alertCumlativeListeners(event);
		_.Static.pastEvents.addLast(event);
	}
	
	Public.Static.fire = function(event) {
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.alert(event);
		if(event instanceof DynamicEvent){
			var generalEvent = new BaseEvent(event.__.Static.generalEventType, "General Event generated by:" + event.getEventType() +'Message:'+event.message);
			_.Static.alert(generalEvent);
		}
		
	};

	Private.Static.alertListeners=function(event) {
		var _ = this.magic ? eval(this.magic) : this;
		var todoList = _.Static.listeners[event.eventType];
		if (todoList != null) {
			var todoArray = _.Static.listeners[event.eventType].toArray();
			_.Static.listeners[event.eventType] = null;
			for(var i=0;i<todoArray.length;i++) {
				var todo = todoArray[i];
				_.Static.handleEventResult(event, todo);
			};
		};
	};
	
	Private.Static.alertQueue=function(queue, event){
		var _ = this.magic ? eval(this.magic) : this;
		var todoList = queue[event.eventType];
		if (todoList != null) {
			var todo = todoList.dequeue();
			_.Static.handleEventResult(event, todo);
		};
	}
	
	Private.Static.alertRelayedListeners=function(event) {
		var _ = this.magic ? eval(this.magic) : this;
		return _.Static.alertQueue(_.Static.relayedListeners, event);
	};
	
	Private.Static.alertQueuedListeners=function(event) {
		var _ = this.magic ? eval(this.magic) : this;
		return _.Static.alertQueue(_.Static.queuedListeners, event);
	};
	
	Private.Static.alertCumlativeListeners=function(event) {
		var _ = this.magic ? eval(this.magic) : this;
		var potentialTodos = _.Static.cumlativeListeners.edgesFrom(event.eventType)
				|| [];
		for ( var i = 0; i < potentialTodos.length; i++) {
			_.Static.cumlativeListeners.removeEdge(event.eventType, potentialTodos[i]);
			var edgesTo = _.Static.cumlativeListeners.edgesTo(potentialTodos[i]) || [];
			if (edgesTo.length == 0) {
				_.Static.handleEventResult(event, potentialTodos[i]);
				_.Static.cumlativeListeners.removeNode(potentialTodos[i]);
			}
			;
			var leftoverTodos = _.Static.cumlativeListeners.edgesFrom(event.eventType)
					|| [];
			if (leftoverTodos.length == 0) {
				_.Static.cumlativeListeners.removeNode(event.eventType);
			}
			;
		}
		;
	}})();
	}
})();