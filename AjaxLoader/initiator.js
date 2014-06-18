(function init() {
	function getWindowByName(name) {
		if (window.name == name) {
			return window;
		} else {
			var currentWindow = window;
			while (window.parent != currentWindow) {
				currentWindow = window.parent;
				if (currentWindow.name == name) {
					return currentWindow;
				}
			}
		}
	}

	var ready = (function() {
		var ready_event_fired = false;
		var ready_event_listener = function(fn) {

			// Create an idempotent version of the 'fn' function
			var idempotent_fn = function() {
				if (ready_event_fired) {
					return;
				}
				ready_event_fired = true;
				return fn();
			}
			// The DOM ready check for Internet Explorer
			var do_scroll_check = function() {
				if (ready_event_fired) {
					return;
				}

				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				try {
					document.documentElement.doScroll('left');
				} catch(e) {
					setTimeout(do_scroll_check, 1);
					return;
				}

				// Execute any waiting functions
				return idempotent_fn();
			}
			// If the browser ready event has already occured
			if (document.readyState === "complete") {
				return idempotent_fn()
			}

			// Mozilla, Opera and webkit nightlies currently support this event
			if (document.addEventListener) {

				// Use the handy event callback
				document.addEventListener("DOMContentLoaded", idempotent_fn, false);

				// A fallback to window.onload, that will always work
				window.addEventListener("load", idempotent_fn, false);

				// If IE event model is used
			} else if (document.attachEvent) {

				// ensure firing before onload; maybe late but safe also for iframes
				document.attachEvent("onreadystatechange", idempotent_fn);

				// A fallback to window.onload, that will always work
				window.attachEvent("onload", idempotent_fn);

				// If IE and not a frame: continually check to see if the document is ready
				var toplevel = false;

				try {
					toplevel = window.frameElement == null;
				} catch (e) {
				}

				if (document.documentElement.doScroll && toplevel) {
					return do_scroll_check();
				}
			}
		};
		return ready_event_listener;
	})();

	var name = 'initiator.js';
	var baseDir;
	var scripts = document.getElementsByTagName('script');
	for (var i = scripts.length - 1; i >= 0; --i) {
		var src = scripts[i].src;
		var l = src.length;
		var length = name.length;
		if (src.substr(l - length) == name) {
			var path = src.split('?')[0];
			// remove any ?query
			var srcDir = path.split('/').slice(0, -1).join('/') + '/';
			var documentDir = location.href.split('/').slice(0, -1).join('/') + '/';
			baseDir = srcDir.replace(documentDir, '');
			break;
		}
	}
	;
	var contextName = 'aweiss_ajax_load_'
	var initiatorName = contextName + 'initiator';
	var initiatorWindow = getWindowByName(initiatorName);

	if (initiatorWindow == null || initiatorWindow == window) {
		var newWin = window.open(baseDir + 'html/ajax_load.html', '_self');
		var newDoc = newWin.document;
		newWin.name = initiatorName;
		newWin.localStorage.url = window.location.href;
		//addScript(newDoc, 'js/OOPS.js');
		//addScript(newDoc, 'js/ajax_load.js');
		//addStyle(newDoc, 'css/base.css');
		newWin.focus();
	} else {

		function getItem(name) {
			try {
				return initiatorWindow[contextName][window.frameElement.id][name];
			} catch(e) {

			}
		}

		function clearItem(name) {
			setItem(name, null);
		}
		
		function setItem(name, val){
			initiatorWindow[contextName][window.frameElement.id][name]=val;
		}
		
		function alertEvent(eventName, detail){
			var event = document.createEvent('CustomEvent');
			event.initCustomEvent('aweiss_ajax_load:'+eventName+'_' + window.frameElement.id, true, true, detail);
			initiatorWindow.dispatchEvent(event);
		}
		
		function alertReady() {
			//alert('loaded');
			//alertEvent('iframeReady', null);
			window.frameElement.ready();
		}
		
		function alertRendered() {
			//alert('rendered');
			alertEvent('iframeRendered', null);
		}
		
		function alertExecuted() {
			//alert('rendered');
			alertEvent('iframeExecuted', null);
		}
		
		window.alertRendered=function(){
			alertRendered();
		}
		if(window['aweiss_ajax_load:alertRendered']==null&&false){
			window.addEventListener("load", alertRendered);
			window['aweiss_ajax_load:alertRendered']=true;
			//alertRendered();
		}
		
		function alertComplete(){
				alertEvent('iframeCompleted', null);
		}
		//window.addEventListener("customLoad",alertRendered);
		//window.onload=alertRendered;
		window.addEventListener("load",alertRendered);
		window.addEventListener("aweiss_ajax_load:complete",alertComplete);
		
		var type = getItem('type');
		if (type == 'stop') {
			//document.close();
			//document.open();
			clearItem('type');
			alertReady();
			//window.stop();
		}
		else{
			window.addEventListener("load",alertComplete);
		}
		/*function write(content) {
			//setItem('type', 'load');
			//setItem('content', content);
			//window.location.reload();
			//document.open(); 
			//document.write(content);
			//document.close();
			document.documentElement.innerHTML=content;
	//var newDoc=document.implementation.createHTMLDocument('test');
	//newDoc.documentElement.innerHTML=content;
	//document.replaceChild(newDoc.documentElement, document.documentElement);
		}
		
		var writeEventName = "aweiss_ajax_load:write_";
		function writeEvent(e) {
			;
			var content = e.detail.content;
			write(content);
			window.removeEventListener(writeEventName, writeEvent);
		}
		if(window['aweiss_ajax_load:allreadyRan']==null){
		window.addEventListener(writeEventName, writeEvent, true);
		window['aweiss_ajax_load:allreadyRan']=true;
		}
		/*var type = getItem('type');
		if (type == 'stop') {
			window.stop();
			//document.close();
			//document.open();
			clearItem('type');
			alertReady();
		} 
		
		else if(type=='load'){
			var content= getItem('content');
			document.close();
			document.open();
			document.write(content)
			document.close();
		}else {
			window.onload = alertReady
		};*/
		
	}
})();

