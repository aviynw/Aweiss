(function() {

	var importList = ['http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js', 'Aweiss.AjaxLoader.DataManager', 'Aweiss.Events.DomEvent'];

	var name = 'Aweiss.AjaxLoader.Frame';

	OOPS.DEFINE(name, Class, importList, {
		'extends' : 'Aweiss.Dom.Element'
	});

	function Class() {
eval(this.magic);
(function(){
'use strict';

		Public.id = null;
		Public.url = null;
		Public.win = null;
		Public.doc = null;
		Public.docElement = null;
		Public.loadType = null;
		Private.pendingEvents=[];
		
		Private.stop = function() {
			var _ = this.magic ? eval(this.magic) : this;
			_.win.stop();
		};

		Public.init = function(id, url) {
			var _ = this.magic ? eval(this.magic) : this;
			_.element = new Element('iframe', {
				seamless : 'seamless'
			});
			_.url = url;
			_.id = id;
			//_.initOnBeforeLoad();
		}

		/*Private.initOnBeforeLoad = function() {
			var _ = this.magic ? eval(this.magic) : this;
			_.onBeforeLoad(function() {
				//;
				switch(_.loadType){
					case 'stop':
					_.stop();
					_.alertReady();
					break;
					/*case 'load':
					_.stop();
					_.loadDoc();
					_.alertReady();
					break;
				}
			});
		}*/

		Public.Get.url = function() {
			var _ = this.magic ? eval(this.magic) : this;
			if (_.element != null) {
				return _.element.src;
			}
		}

		Public.Set.url = function(url) {
			var _ = this.magic ? eval(this.magic) : this;
			if (url != null) {
				_.element.src = url;
			}
		}

		Public.Get.id = function() {
			var _ = this.magic ? eval(this.magic) : this;
			if (_.element != null) {
				return _.element.id
			}
		}

		Public.Set.id = function(id) {
			var _ = this.magic ? eval(this.magic) : this;
			_.element.id = id;
		}

		Public.Get.win = function() {
			var _ = this.magic ? eval(this.magic) : this;
			if (_.element != null) {
				return _.element.contentWindow;
			}
		}

		Public.Get.doc = function() {
			var _ = this.magic ? eval(this.magic) : this;
			if (_.element != null) {
				return _.element.contentDocument;
			}
		}

		Public.Set.doc = function(doc) {
			var _ = this.magic ? eval(this.magic) : this;
			_.element.contentdoc = doc;
		}

		Public.Get.docElement = function() {
			var _ = this.magic ? eval(this.magic) : this;
			if (_.doc != null) {
				return _.doc.documentElement;
			}
		}

		Public.Set.docElement = function(newDocElement) {
			var _ = this.magic ? eval(this.magic) : this;
			//_.doc.removeChild(_.doc.documentElement);
			//_.doc.importNode(newDocElement, true); //doesn't work
			_.doc.replaceChild(newDocElement, _.doc.documentElement);
		}

		Private.onBeforeLoad = function(callback) {
			var _ = this.magic ? eval(this.magic) : this;
			_.onEvent('iframeLoaded', callback);
		}
		
		Public.onRender=function(callback){
			var _ = this.magic ? eval(this.magic) : this;
			_.onEvent('iframeRendered', callback);
		}
		
		Public.onReady=function(callback){
			var _ = this.magic ? eval(this.magic) : this;
			_.onEvent('iframeReady', callback);
			_.element.ready=callback;
		}
		
		Public.onLoad=function(callback){
			var _ = this.magic ? eval(this.magic) : this;
			_.onEvent('iframeLoaded', callback);
		}
		
		Public.onComplete=function(callback){
			var _ = this.magic ? eval(this.magic) : this;
			_.onEvent('iframeCompleted', callback);
		}
		
		Private.onEvent=function(eventName, callback){
			var _ = this.magic ? eval(this.magic) : this;
			var eventName = "aweiss_ajax_load:"+eventName+'_'+ _.id;
			function ready() {
				window.removeEventListener(eventName, ready, true);
				if (callback != null) {
					callback();
				}
				//EventManager.fire(Static.events.PAGE_Rendered+url);
			}
			window.addEventListener(eventName, ready, true);
			//_.pendingEvents.push(new DomEvent(window, eventName, ready));
		}
		
		/*Public.cancelEvents=function(eventName){
			for(var i = 0; i<_.pendingEvents; i++){
				var e = _.pendingEvents[i];
				e.win.removeEventListener(e.eventName, e.listener, true);
			}
		}
		/*Private.alertReady=function() {
		 	var _ = this.magic ? eval(this.magic) : this;
			var event = doc.createEvent('CustomEvent');
			event.initCustomEvent('aweiss_ajax_load:iframeReady_' + _.id, true, true, null);
			window.dispatchEvent(event);
		}*/
		
		Public.replaceDoc=function(doc){
			var _ = this.magic ? eval(this.magic) : this;
			//_.doc.documentElement.innerHTML=content;
			_.docElement=doc.documentElement;
		}
		
		Public.Get.loadType=function(){
		 var _ = this.magic ? eval(this.magic) : this;
		 DataManager.getItem('type', _.id);
		 }

		 Private.Set.loadType=function(val){
		 var _ = this.magic ? eval(this.magic) : this;
		 DataManager.setItem('type', val, _.id);
		 }
		 Public.setItem=function(obj, val){
		 var _ = this.magic ? eval(this.magic) : this;
		 DataManager.setItem(obj, val, _.id);
		 }

		 Public.getItem=function(){
		 var _ = this.magic ? eval(this.magic) : this;
		 DataManager.getItem(obj, _.id);
		 }})();

		/*Private.functionToScript = function(theFunction) {
			var _ = this.magic ? eval(this.magic) : this;
			var newScript = _.doc.createElement('script');
			newScript.type = "text/javascript";
			newScript.text = '('+theFunction.toString()+')();';
			return newScript;
		}

		Public.loadDoc = function() {
			var _ = this.magic ? eval(this.magic) : this;
			ResourceManager.retrieve(_.url, ready, true);

			function ready(content) {
				;
				_.loadType='null';
				/*var initiatorString = 'initiator.js" type="text\/javascript"><\/script>'
				var initiatorIndex = content.indexOf(initiatorString);
				content=content.substring(initiatorIndex+initiatorString.length);
				var stopScript=_.functionToScript(stopAndContinue).outerHTML;
				var closeBodyString='<\/body>'
				var closeBodyIndex=content.indexOf(closeBodyString);
				var beginning = content.slice(0, closeBodyIndex);
				var end = content.slice(closeBodyIndex);
				content = beginning.concat(stopScript, end);
				//content = content.replace(/<script((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\s*>/, '><script src="tests/phpsleep.php">');
				_.write(content);
			}
			
			function stopAndContinue() {
				if (win.stop) {
					win.stop();
				} else {
					doc.execCommand('Stop');
				}
				doc.docElement.innerHTML = doc.docElement.innerHTML;
			}
		}
		
		/*Private.write=function(content){
		 var _ = this.magic ? eval(this.magic) : this;
		 /*var event = doc.createEvent('CustomEvent');
		 event.initCustomEvent('aweiss_ajax_load:write_', false, true, {'content':content});
		 _.win.dispatchEvent(event);
		_.doc.documentElement.innerHTML=content;
		 }*/
	}

})();
