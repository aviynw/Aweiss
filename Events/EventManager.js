(function(){

var importList = [ 'Aweiss.Events.BaseEvent', 'Aweiss.Events.DynamicEvent', 'Aweiss/DataStructures/DirectedGraph.js', {'Libs/js_cols/LinkedList.js':'Libs/js_cols/base.js'}, {'Libs/js_cols/Queue.js':['Libs/js_cols/LinkedList.js']}];

DEFINE('Aweiss.Events.EventManager', Class, importList);

function Class(){
	eval(this.eval);
	
	Static.Public.listeners = {};
	Static.Public.queuedListeners = {};
	Static.Public.relayedListeners = {};
	Static.Public.cumlativeListeners = null;
	Static.Public.pastEvents = null;
	
	Static.Public.init=function(){
		var _ = this;
		_.static.cumlativeListeners = new DirectedGraph();
		_.static.cumlativeListeners.setType('unidirectional');
		_.static.pastEvents = new js_cols.LinkedList();
	}
	
	Static.Public.addListener = function(eventType, todo, happenedMatters) {
		var _ = this;
		var todoList = _.static.listeners[eventType];
		if (todoList == null) {
			_.static.listeners[eventType] = new js_cols.LinkedList();
		}
		_.static.listeners[eventType].addLast(todo);
		if(happenedMatters===true){
			_.static.alertForPastEvents(eventType, _.static.alertListeners);
		}
	};
	
	Static.Private.didEventTypeHappen=function(eventType){
		var _ = this;
		function test(event) {
			if (event.eventType == eventType) {
				return true;
			} else {
				return false;
			}
		}
		if (_.static.pastEvents.containsPassingElement(test)) {
			return true;
		}
		else{
			return false;
		}
	};
	Static.Private.getPastEventsOfType = function(eventType){
		var _ = this;
		function test(event) {
			if (event.eventType == eventType) {
				return true;
			} else {
				return false;
			}
		}
		return _.static.pastEvents.filter(test);
	};
	
	Static.Private.alertForPastEvents=function(eventType, alertFunction){
		var _ = this;
		var pastEventsOfType = _.static.getPastEventsOfType(eventType);
		var lastEvent = pastEventsOfType[pastEventsOfType.length-1];
		if(lastEvent!=null){
			alertFunction(lastEvent);
		}
	};
	
	Static.Private.handleEventResult = function(event, result){
		var _ = this;
		if (typeof result === 'function') {
			result(event);
		}
		if (typeof result === 'string') {
			_.static.fire(new BaseEvent(result));
		}
	};
	
	Static.Private.addToQueue=function(queueList, eventType, todo){
		var _ = this;
		var todoList = queueList[eventType];
		if (todoList == null) {
			queueList[eventType] = new js_cols.Queue();
		}
		var queue =queueList[eventType];
		queue.enqueue(todo);
		return queue;
	}
	
	Static.Public.queueListener = function(eventType, todo) {
		var _ = this;
		_.static.addToQueue(_.static.queuedListeners, eventType, todo)
	};
	
	/*Static.Public.hasRelayedListeners = function(eventType){
		var queue = _.static.relayedListeners;
		if(queue)
	}*/
	
	Static.Public.queueRelayListener = function(eventType, todo) {
		var _ = this;
		var queueList = _.static.relayedListeners;
		var queue = _.static.addToQueue(queueList, eventType, todo);
		if(queue.size==1){
			queue.enqueue(function(e){
				_.static.alertRelayedListeners(e);
			});
			_.static.alertRelayedListeners(new BaseEvent(eventType, 'Fake Event.  listenered queued on empty queue, so running now.'));
		}
	};
	
	Static.Public.addCumlativeListener = function(eventType, todo) {
		var _ = this;
		_.static.cumlativeListeners.addNode(eventType);
		_.static.cumlativeListeners.addNode(todo);
		_.static.cumlativeListeners.addEdge(eventType, todo);
		/*if(happenedMatters===true){
			alertForPastEvents(eventType, alert_.static.cumlativeListeners);
		}*/
	};

	Static.Public.addCumlativeListeners= function(eventTypes, todo, happenedMatters) {
		var _ = this;
		_.static.cumlativeListeners.addNodesFromArray(eventTypes);
		_.static.cumlativeListeners.addNode(todo);
		for ( var i = 0; i < eventTypes.length; i++) {
			_.static.cumlativeListeners.addEdge(eventTypes[i], todo);
		}
		if(happenedMatters===true){
			for ( var i = 0; i < eventTypes.length; i++) {
				alertForPastEvents(eventType, alert_.static.cumlativeListeners);
			};
		};
	};
	
	Static.Public.hasListener=function(eventType){
		
	}
	
	Static.Private.listHasListener=function(eventType, list){
		var _ = this;
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
	
	Static.Public.hasQueuedListener=function(eventType){
		var _ = this;
		return _.static.listHasListener(eventType, _.static.queuedListeners);
	}
	
	Static.Public.removeListener = function(eventType, todo) {
		var _ = this;
		_.static.removeFromList(eventType, todo, _.static.listeners);
		_.static.removeFromList(eventType, todo, _.static.queuedListeners);
		_.static.removeFromList(eventType, todo, _.static.cumlativeListeners);
		_.static.removeFromList(eventType, todo, _.static.relayedListeners);
	};

	Static.Private.removeFromList=function(eventType, todo, list) {
		var _ = this;
		var todoList = list[eventType];
		todoList.remove(todo);
	};

	Static.Private.alert=function(event){
		var _ = this;
		_.static.alertListeners(event);
		_.static.alertQueuedListeners(event);
		_.static.alertRelayedListeners(event);
		_.static.alertCumlativeListeners(event);
		_.static.pastEvents.addLast(event);
	}
	
	Static.Public.fire = function(event) {
		var _ = this;
		_.static.alert(event);
		if(event instanceof DynamicEvent){
			var generalEvent = new BaseEvent(event.__.static.generalEventType, "General Event generated by:" + event.getEventType() +'Message:'+event.message);
			_.static.alert(generalEvent);
		}
		
	};

	Static.Private.alertListeners=function(event) {
		var _ = this;
		var todoList = _.static.listeners[event.eventType];
		if (todoList != null) {
			var todoArray = _.static.listeners[event.eventType].toArray();
			_.static.listeners[event.eventType] = null;
			for(var i=0;i<todoArray.length;i++) {
				var todo = todoArray[i];
				_.static.handleEventResult(event, todo);
			};
		};
	};
	
	Static.Private.alertQueue=function(queue, event){
		var _ = this;
		var todoList = queue[event.eventType];
		if (todoList != null) {
			var todo = todoList.dequeue();
			_.static.handleEventResult(event, todo);
		};
	}
	
	Static.Private.alertRelayedListeners=function(event) {
		var _ = this;
		return _.static.alertQueue(_.static.relayedListeners, event);
	};
	
	Static.Private.alertQueuedListeners=function(event) {
		var _ = this;
		return _.static.alertQueue(_.static.queuedListeners, event);
	};
	
	Static.Private.alertCumlativeListeners=function(event) {
		var _ = this;
		var potentialTodos = _.static.cumlativeListeners.edgesFrom(event.eventType)
				|| [];
		for ( var i = 0; i < potentialTodos.length; i++) {
			_.static.cumlativeListeners.removeEdge(event.eventType, potentialTodos[i]);
			var edgesTo = _.static.cumlativeListeners.edgesTo(potentialTodos[i]) || [];
			if (edgesTo.length == 0) {
				_.static.handleEventResult(event, potentialTodos[i]);
				_.static.cumlativeListeners.removeNode(potentialTodos[i]);
			}
			;
			var leftoverTodos = _.static.cumlativeListeners.edgesFrom(event.eventType)
					|| [];
			if (leftoverTodos.length == 0) {
				_.static.cumlativeListeners.removeNode(event.eventType);
			}
			;
		}
		;
	};
	}
})();