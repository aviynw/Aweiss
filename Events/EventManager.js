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
		_model.cumlativeListeners = new DirectedGraph();
		_model.cumlativeListeners.setType('unidirectional');
		_model.pastEvents = new js_cols.LinkedList();
	}
	
	Static.Public.addListener = function(eventType, todo, happenedMatters) {
		var _ = this;
		var todoList = _model.listeners[eventType];
		if (todoList == null) {
			_model.listeners[eventType] = new js_cols.LinkedList();
		}
		_model.listeners[eventType].addLast(todo);
		if(happenedMatters===true){
			_model.alertForPastEvents(eventType, _model.alertListeners);
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
		if (_model.pastEvents.containsPassingElement(test)) {
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
		return _model.pastEvents.filter(test);
	};
	
	Static.Private.alertForPastEvents=function(eventType, alertFunction){
		var _ = this;
		var pastEventsOfType = _model.getPastEventsOfType(eventType);
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
			_model.fire(new BaseEvent(result));
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
		_model.addToQueue(_model.queuedListeners, eventType, todo)
	};
	
	/*Static.Public.hasRelayedListeners = function(eventType){
		var queue = _model.relayedListeners;
		if(queue)
	}*/
	
	Static.Public.queueRelayListener = function(eventType, todo) {
		var _ = this;
		var queueList = _model.relayedListeners;
		var queue = _model.addToQueue(queueList, eventType, todo);
		if(queue.size==1){
			queue.enqueue(function(e){
				_model.alertRelayedListeners(e);
			});
			_model.alertRelayedListeners(new BaseEvent(eventType, 'Fake Event.  listenered queued on empty queue, so running now.'));
		}
	};
	
	Static.Public.addCumlativeListener = function(eventType, todo) {
		var _ = this;
		_model.cumlativeListeners.addNode(eventType);
		_model.cumlativeListeners.addNode(todo);
		_model.cumlativeListeners.addEdge(eventType, todo);
		/*if(happenedMatters===true){
			alertForPastEvents(eventType, alert_model.cumlativeListeners);
		}*/
	};

	Static.Public.addCumlativeListeners= function(eventTypes, todo, happenedMatters) {
		var _ = this;
		_model.cumlativeListeners.addNodesFromArray(eventTypes);
		_model.cumlativeListeners.addNode(todo);
		for ( var i = 0; i < eventTypes.length; i++) {
			_model.cumlativeListeners.addEdge(eventTypes[i], todo);
		}
		if(happenedMatters===true){
			for ( var i = 0; i < eventTypes.length; i++) {
				alertForPastEvents(eventType, alert_model.cumlativeListeners);
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
		return _model.listHasListener(eventType, _model.queuedListeners);
	}
	
	Static.Public.removeListener = function(eventType, todo) {
		var _ = this;
		_model.removeFromList(eventType, todo, _model.listeners);
		_model.removeFromList(eventType, todo, _model.queuedListeners);
		_model.removeFromList(eventType, todo, _model.cumlativeListeners);
		_model.removeFromList(eventType, todo, _model.relayedListeners);
	};

	Static.Private.removeFromList=function(eventType, todo, list) {
		var _ = this;
		var todoList = list[eventType];
		todoList.remove(todo);
	};

	Static.Private.alert=function(event){
		var _ = this;
		_model.alertListeners(event);
		_model.alertQueuedListeners(event);
		_model.alertRelayedListeners(event);
		_model.alertCumlativeListeners(event);
		_model.pastEvents.addLast(event);
	}
	
	Static.Public.fire = function(event) {
		var _ = this;
		_model.alert(event);
		if(event instanceof DynamicEvent){
			var generalEvent = new BaseEvent(event.__model.generalEventType, "General Event generated by:" + event.getEventType() +'Message:'+event.message);
			_model.alert(generalEvent);
		}
		
	};

	Static.Private.alertListeners=function(event) {
		var _ = this;
		var todoList = _model.listeners[event.eventType];
		if (todoList != null) {
			var todoArray = _model.listeners[event.eventType].toArray();
			_model.listeners[event.eventType] = null;
			for(var i=0;i<todoArray.length;i++) {
				var todo = todoArray[i];
				_model.handleEventResult(event, todo);
			};
		};
	};
	
	Static.Private.alertQueue=function(queue, event){
		var _ = this;
		var todoList = queue[event.eventType];
		if (todoList != null) {
			var todo = todoList.dequeue();
			_model.handleEventResult(event, todo);
		};
	}
	
	Static.Private.alertRelayedListeners=function(event) {
		var _ = this;
		return _model.alertQueue(_model.relayedListeners, event);
	};
	
	Static.Private.alertQueuedListeners=function(event) {
		var _ = this;
		return _model.alertQueue(_model.queuedListeners, event);
	};
	
	Static.Private.alertCumlativeListeners=function(event) {
		var _ = this;
		var potentialTodos = _model.cumlativeListeners.edgesFrom(event.eventType)
				|| [];
		for ( var i = 0; i < potentialTodos.length; i++) {
			_model.cumlativeListeners.removeEdge(event.eventType, potentialTodos[i]);
			var edgesTo = _model.cumlativeListeners.edgesTo(potentialTodos[i]) || [];
			if (edgesTo.length == 0) {
				_model.handleEventResult(event, potentialTodos[i]);
				_model.cumlativeListeners.removeNode(potentialTodos[i]);
			}
			;
			var leftoverTodos = _model.cumlativeListeners.edgesFrom(event.eventType)
					|| [];
			if (leftoverTodos.length == 0) {
				_model.cumlativeListeners.removeNode(event.eventType);
			}
			;
		}
		;
	};
	}
})();