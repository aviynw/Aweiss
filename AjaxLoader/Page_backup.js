(function() {
	var importList = ['Aweiss.AjaxLoader.DataManager', 'Aweiss.AjaxLoader.ResourceManager', 'Aweiss.AjaxLoader.Frame', 
	'Aweiss.AjaxLoader.FrameManager', 'Aweiss.Utils.Tools', 'Aweiss.Utils.Asserter', 'Aweiss.Events.EventManager', 'Aweiss.AjaxLoader.Events.PageRenderedEvent', 
	'http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js'];

	var name = 'Aweiss.AjaxLoader.Page';

	DEFINE(name, Class, importList, {'extends':'Aweiss.Dom.Element'});

	function Class(){
	eval(this.eval);

		Public.originalUrl = '';
		Public.currentUrl = '';
		Public.maskedUrl = null;
		Public.window = null;
		Public.frame = null;
		Protected.unloadWatched = false;
		Protected.linksWatched = false;
		Protected.classes = {
			foreground_page : 'foreground_page',
			background_page : 'background_page',
		};
		Public.savedDocElement = null;
		Public.hasExecuted=false;
		Public.rendering=false;
		
		Public.init = function(originalUrl) {
			var _ = this;
			_.originalUrl = originalUrl;
			_.url = originalUrl;
			_.element = new Element('span', {});
			_.initFrame();
		}

		/*Public.preDownload = function(callback) {
			var _ = this;
			ResourceManager.download(_.url, callback);
		}*/
		
		Public.download=function(callback){
			var _ = this;
			ResourceManager.downloadDocAndDeps(_.url, function(doc){
				_.saveThis(doc.documentElement);
				if(callback!=null){
					callback();
				}
				});
		}
		
		Protected.initFrame = function() {
			var _ = this;
			_.frame = FrameManager.getFrame();
			_.frame.url = _.url;
			_.element.insert({
					'top' : _.frame.element
				});
		}

		Protected.loadFromSave = function(inBackground) {
			var _ = this;
			if(inBackground==null){
				inBackground=false;
			}
			//_.frame.docElement = _.savedDocElement;
			_.frame.docElement =  _.frame.document.implementation.createHTMLDocument("").documentElement;
			var scripts=[];
			var savedDoc=_.savedDocElement.ownerDocument;
			var scripts = Array.prototype.slice.call(savedDoc.getElementsByTagName('script'), 0);	
				for (var i = 0; i < scripts.length; i++) {
					var script= scripts[i];
						var parent =script.parentNode; 
						parent.removeChild(script);
						script.__oldParent=parent;
						 /*var s = document.createElement("script");
						 s.type = "text/javascript";
						 s.src = element.src;
						_.frame.document.head.appendChild(s);*/
				}
				
				function addScripts(i){
					function addscript(){
						//script.__oldParent.appendChild(node);
						_.frame.document.head.appendChild(node);
					}
					
					function nextScript(){
						if(inBackground){
							window.setTimeout(addScripts.bind(null,i+1), 200);
						}
						else{
							addScripts(i+1);
						}
					}

					if(i==null){
						
						i=0;
					}
					var script=scripts[i];
					if(script!=null){
					if(script.src.indexOf('initiator.js')==-1){
					var node = _.document.importNode(script, true);
					if(script.src!=null&&script.src!=""){
						node.onload=addScripts.bind(null, i+1);
						node.onerror=nextScript;
						node.onabort=function(){alert('aborted')}
						addscript();
					}
					else{
						addscript();
						nextScript();
					}
					}
					else{
						nextScript();
					}
					}
					else{
				if(i>=scripts.length){
				var frameDoc = _.frame.document;
				
				/*var DOMContentLoaded_event = frameDoc.createEvent("Event")
				DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
				frameDoc.dispatchEvent(DOMContentLoaded_event);
				
				var load_event = frameDoc.createEvent("HTMLEvents");
				load_event.initEvent("load", true, true);
				_.frame.window.dispatchEvent(load_event);*/
				/*var finishedScript = frameDoc.createElement('SCRIPT');
				finishedScript.text = '('+finished.toString();+')();'
				savedDoc.body.appendChild(finishedScript)*/
				_.frame.document.body = _.document.importNode(savedDoc.body, true);
				
				(function finished(){
				var customLoad = _.frame.document.createEvent('CustomEvent');
				customLoad.initCustomEvent('customLoad', true, true, {});
				_.frame.window.dispatchEvent(customLoad);
				})();
				
				}
					}
				}
				
				if(inBackground){
					window.setTimeout(addScripts, 500);
				}
				else{
					addScripts();
				}
		}
		
		Private.loadLab =function(callback){
	(function (global, oDOC, handler) {
    var head = oDOC.head || oDOC.getElementsByTagName("head");
 
    function LABjsLoaded() {
    	if(callback!=null){
    		callback;
    	}
        // do cool stuff with $LAB here
    }
 
    // loading code borrowed directly from LABjs itself
    setTimeout(function () {
        if ("item" in head) { // check if ref is still a live node list
            if (!head[0]) { // append_to node not yet ready
                setTimeout(arguments.callee, 25);
                return;
            }
            head = head[0]; // reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
        }
        var scriptElem = oDOC.createElement("script"),
            scriptdone = false;
        scriptElem.onload = scriptElem.onreadystatechange = function () {
            if ((scriptElem.readyState && scriptElem.readyState !== "complete" && scriptElem.readyState !== "loaded") || scriptdone) {
                return false;
            }
            scriptElem.onload = scriptElem.onreadystatechange = null;
            scriptdone = true;
            LABjsLoaded();
        };
        scriptElem.src = "/path/to/LAB.js";
        head.insertBefore(scriptElem, head.firstChild);
    }, 0);
 
    // required: shim for FF <= 3.5 not having document.readyState
    if (oDOC.readyState == null && oDOC.addEventListener) {
        oDOC.readyState = "loading";
        oDOC.addEventListener("DOMContentLoaded", handler = function () {
            oDOC.removeEventListener("DOMContentLoaded", handler, false);
            oDOC.readyState = "complete";
        }, false);
    }
})(_.frame.window, _.frame.document);
		}
		
		Protected.loadFromCache = function(inBackground) {
			var _ = this;
			_.download(addContent);
			function addContent(){
				_.loadFromSave(inBackground);
			}
		}
		
		Protected.replaceDoc=function(doc){
			var _ = this;
			//;
			_.frame.replaceDoc(doc);
			_.linksWatched=false;
		}
		
		Protected.save = function() {
			var _ = this;
			_.savedDocElement = _.frame.docElement;
		}
		
		Protected.saveThis = function(docElement) {
			var _ = this;
			_.savedDocElement = docElement;
		}

		Protected.Get.hasSave = function() {
			var _ = this;
			return _.savedDocElement != null
		}

		Public.clearSave = function() {
			var _ = this;
			_.savedDocElement = null;
		}
		
		Public.downloadToCache=function(){
			var _ = this;
		}
		
		Public.downloadToSave=function(){
			var _ = this;
		}
		
		Public.render=function(inBackground, callback){
			var _ = this;
			;
			function rendered(){
				//;
				EventManager.fire(new PageRenderedEvent(_.url)); //do first or else if the callback waits for a pagerenderedevent, it will be executed for this page render
				if(callback!=null){
					callback();
				}
				_.rendering=false;
			}
			
			if(!_.rendering){
			_.rendering=true;
			if (_.frame == null) {
				_.initFrame();
			}
			if (!_.isOnStage) {
				_.frame.onRender(rendered);
				//if(!_.frame.isOnStage){
				if (_.hasSave) {
					//_.addInForeground();
					_.frame.loadType='stop';
					_.frame.onReady(_.loadFromSave);
					_.addInBackground();
				} else {
					if(inBackground){
					_.frame.loadType='stop';
					_.frame.onReady(_.loadFromCache);
					_.addInBackground();
					}
					else{
						_.addInForeground();
					}
				}
		}
		else{
			//onStage
			rendered();
		}
		}
		else{
			;
			EventManager.addListener(PageRenderedEvent.getEventType(_.url), rendered);
		}
		}
		
		Protected.addInBackground=function(){
			var _ = this;
			_.linksWatched=false;
			_.hasExecuted=false;
			_.addToStage();
		}
		
		Protected.addInForeground=function(){
			var _ = this;
			_.hasExecuted=true;
			_.addToStage();
		}
		
		Protected.addToStage = function() {
			var _ = this;
				$$('body')[0].insert({
					'top' : _.element
				});
				//_.frame.document.documentElement.ownerDocument=document;
				/*var frame = (function() {
				 var iframe = _.frame.element;
				 var idoc = iframe.contentDocument || iframe.contentWindow.document;
				 var iwin = iframe.contentWindow || iframe.contentDocument.defaultView;
				 if (iwin.Prototype) {
				 Element.extend(idoc);
				 iwin.Element.extend(idoc);
				 console.log('use frame.$ and frame.$$ to access frame elements');
				 return iwin;
				 }
				 console.log('no frames are using Prototype');
				 })();*/

			} 

		Public.show = function(page) {
			var _ = this;
			_.element.setStyle({
				display : 'inline'
			});
		};

		Public.hide = function(page) {
			var _ = this;
			_.element.setStyle({
				display : 'none'
			});
		};

		Public.setOpacity = function(page, num) {
			var _ = this;
			_.element.setStyle({
				opacity : 1
			});
		};

		Protected.removeFromStage = function() {
			var _ = this;
			if(_.isOnStage){
			$(_.element).remove();
		}
		}

		Public.clearMemory = function() {
			var _ = this;
			_.savedDocElement = null;
		}

		Public.isMatchingLink = function(link, includeHashes) {
			var _ = this;
			if (Tools.isLinkSameDomain(link)&&link.href.indexOf('view=event')==-1) {
				if (!includeHashes && link.hash != "") {
					return false;
				} else {
					return true;
				}
			} else {
				return false;
			}
		}

	Public.getLinks = function(includeHashes) {
			var _ = this;
			var links = [];
		
		/*var linkWrapper = _.document.body;
		  function isMatching() {
				this.match = _.isMatchingLink;
			};
		linkWrapper.select('a').grep(new isMatching()).each(function(element) {
			links.push(element);
		});*/
		var allLinks = _.document.links;
		var matchingLinks=[];
		for(var i=0;i<allLinks.length;i++){
			var link = allLinks[i];
			if(_.isMatchingLink(link, includeHashes)){
				matchingLinks.push(link);
			}
		}
		return matchingLinks;
	}
	
	Public.getLinkUrls=function(includeHashes){
		var _ = this;
		var links = _.getLinks(includeHashes);
		var urls=[];
		for(var i=0;i<links.length;i++){
				var element=links[i];
				var url = unescape(element.href);
				urls.push(url);
			}
			return urls
	}
	
	Protected.onBeforeUnload = function(theFunction) {
		var _ = this;
		//var initiatorWindow=_.getInitiatorWindow();
		//event.observe
		var win = _.window;
		if (!_.unloadWatched) {
			win.onbeforeunload = function(e) {
				theFunction();
				//EventManager.fire(new BaseEvent('aweiss_ajax_load:iframeClosed_'+win.frameElement.id));
			}
			_.unloadWatched = true;
		}
	}

	Public.onLinkClick = function(theFunction, includeHashes) {
		var _ = this;
		if (!_.linksWatched) {
			/*var links = _.getLinks(_.url);
			 links.each(function(element) {
			 Event.observe(element, 'click', function(event) {
			 //event.stop();
			 ;
			 event.preventDefault();
			 // _.endAnimations();
			 theFunction(element);
			 //_.setDestination(element.href);
			 });
			 });*/
			_.frame.window.addEventListener('click', function(event) {
				var element = event.srcElement
				if (element.tagName == 'A'&&_.isMatchingLink(element, includeHashes)) {
					event.preventDefault();
					event.stopPropagation();
					theFunction(element);
				}
			}, true);
			_.linksWatched = true;
		}
	}

	Public.Get.document = function() {
		var _ = this;
		return _.frame.document;
	}

	Public.Set.document = function(doc) {
		var _ = this;
		_.frame.document = doc;
	}

	Public.Get.window = function() {
		var _ = this;
		return _.frame.window;
	}

	Public.Get.url = function() {
		var _ = this;
		return _.maskedUrl;
	}

	Public.Set.url = function(url) {
		var _ = this;
		_.maskedUrl = url;
		if (_.frame != null) {
			_.frame.url = url;
		}
	}

	Public.remove = function() {
		var _ = this;
		console.log('removed:'+_.url)
		_.clearMemory();
		if(_.frame!=null){
		FrameManager.release(_.frame);
		_.frame = null;
		}
		if(_.isOnStage){
			_.removeFromStage();
		}
	}
}
})();

