(function(){

var importList = [ 'Aweiss.Events.BaseEvent', 'Aweiss.Events.DynamicEvent', 'Aweiss/DataStructures/DirectedGraph.js', {'Libs/js_cols/LinkedList.js':'Libs/js_cols/base.js'}, {'Libs/js_cols/Queue.js':['Libs/js_cols/LinkedList.js']}];

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
		Static.cumlativeListeners = new DirectedGraph();
		Static.cumlativeListeners.setType('unidirectional');
		Static.pastEvents = new js_cols.LinkedList();
	}
	
	Public.Static.addListener = function(eventType, todo, happenedMatters) {
		var _ = this.magic ? eval(this.magic) : this;
		var todoList = Static.listeners[eventType];
		if (todoList == null) {
			Static.listeners[eventType] = new js_cols.LinkedList();
		}
		Static.listeners[eventType].addLast(todo);
		if(happenedMatters===true){
			Static.alertForPastEvents(eventType, Static.alertListeners);
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
		if (Static.pastEvents.containsPassingElement(test)) {
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
		return Static.pastEvents.filter(test);
	};
	
	Private.Static.alertForPastEvents=function(eventType, alertFunction){
		var _ = this.magic ? eval(this.magic) : this;
		var pastEventsOfType = Static.getPastEventsOfType(eventType);
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
			Static.fire(new BaseEvent(result));
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
		Static.addToQueue(Static.queuedListeners, eventType, todo)
	};
	
	/*Public.Static.hasRelayedListeners = function(eventType){
		var queue = Static.relayedListeners;
		if(queue)
	}*/
	
	Public.Static.queueRelayListener = function(eventType, todo) {
		var _ = this.magic ? eval(this.magic) : this;
		var queueList = Static.relayedListeners;
		var queue = Static.addToQueue(queueList, eventType, todo);
		if(queue.size==1){
			queue.enqueue(function(e){
				Static.alertRelayedListeners(e);
			});
			Static.alertRelayedListeners(new BaseEvent(eventType, 'Fake Event.  listenered queued on empty queue, so running now.'));
		}
	};
	
	Public.Static.addCumlativeListener = function(eventType, todo) {
		var _ = this.magic ? eval(this.magic) : this;
		Static.cumlativeListeners.addNode(eventType);
		Static.cumlativeListeners.addNode(todo);
		Static.cumlativeListeners.addEdge(eventType, todo);
		/*if(happenedMatters===true){
			alertForPastEvents(eventType, alertStatic.cumlativeListeners);
		}*/
	};

	Public.Static.addCumlativeListeners= function(eventTypes, todo, happenedMatters) {
		var _ = this.magic ? eval(this.magic) : this;
		Static.cumlativeListeners.addNodesFromArray(eventTypes);
		Static.cumlativeListeners.addNode(todo);
		for ( var i = 0; i < eventTypes.length; i++) {
			Static.cumlativeListeners.addEdge(eventTypes[i], todo);
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
		return Static.listHasListener(eventType, Static.queuedListeners);
	}
	
	Public.Static.removeListener = function(eventType, todo) {
		var _ = this.magic ? eval(this.magic) : this;
		Static.removeFromList(eventType, todo, Static.listeners);
		Static.removeFromList(eventType, todo, Static.queuedListeners);
		Static.removeFromList(eventType, todo, Static.cumlativeListeners);
		Static.removeFromList(eventType, todo, Static.relayedListeners);
	};

	Private.Static.removeFromList=function(eventType, todo, list) {
		var _ = this.magic ? eval(this.magic) : this;
		var todoList = list[eventType];
		todoList.remove(todo);
	};

	Private.Static.alert=function(event){
		var _ = this.magic ? eval(this.magic) : this;
		Static.alertListeners(event);
		Static.alertQueuedListeners(event);
		Static.alertRelayedListeners(event);
		Static.alertCumlativeListeners(event);
		Static.pastEvents.addLast(event);
	}
	
	Public.Static.fire = function(event) {
		var _ = this.magic ? eval(this.magic) : this;
		Static.alert(event);
		if(event instanceof DynamicEvent){
			var generalEvent = new BaseEvent(event._Static.generalEventType, "General Event generated by:" + event.getEventType() +'Message:'+event.message);
			Static.alert(generalEvent);
		}
		
	};

	Private.Static.alertListeners=function(event) {
		var _ = this.magic ? eval(this.magic) : this;
		var todoList = Static.listeners[event.eventType];
		if (todoList != null) {
			var todoArray = Static.listeners[event.eventType].toArray();
			Static.listeners[event.eventType] = null;
			for(var i=0;i<todoArray.length;i++) {
				var todo = todoArray[i];
				Static.handleEventResult(event, todo);
			};
		};
	};
	
	Private.Static.alertQueue=function(queue, event){
		var _ = this.magic ? eval(this.magic) : this;
		var todoList = queue[event.eventType];
		if (todoList != null) {
			var todo = todoList.dequeue();
			Static.handleEventResult(event, todo);
		};
	}
	
	Private.Static.alertRelayedListeners=function(event) {
		var _ = this.magic ? eval(this.magic) : this;
		return Static.alertQueue(Static.relayedListeners, event);
	};
	
	Private.Static.alertQueuedListeners=function(event) {
		var _ = this.magic ? eval(this.magic) : this;
		return Static.alertQueue(Static.queuedListeners, event);
	};
	
	Private.Static.alertCumlativeListeners=function(event) {
		var _ = this.magic ? eval(this.magic) : this;
		var potentialTodos = Static.cumlativeListeners.edgesFrom(event.eventType)
				|| [];
		for ( var i = 0; i < potentialTodos.length; i++) {
			Static.cumlativeListeners.removeEdge(event.eventType, potentialTodos[i]);
			var edgesTo = Static.cumlativeListeners.edgesTo(potentialTodos[i]) || [];
			if (edgesTo.length == 0) {
				Static.handleEventResult(event, potentialTodos[i]);
				Static.cumlativeListeners.removeNode(potentialTodos[i]);
			}
			;
			var leftoverTodos = Static.cumlativeListeners.edgesFrom(event.eventType)
					|| [];
			if (leftoverTodos.length == 0) {
				Static.cumlativeListeners.removeNode(event.eventType);
			}
			;
		}
		;
	}})();
	}
})();