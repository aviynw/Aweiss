(function() {
	var importList = ['Aweiss.AjaxLoader.DataManager', 'Aweiss.AjaxLoader.ResourceManager', 'Aweiss.AjaxLoader.Frame', 'Aweiss.AjaxLoader.FrameManager', 'Aweiss.Utils.Tools', 'Aweiss.Utils.Asserter', 'Aweiss.Events.EventManager', 'Aweiss.AjaxLoader.Events.PageRenderedEvent', 'http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js'];

	var name = 'Aweiss.AjaxLoader.Page';

	DEFINE(name, Class, importList, {
		'extends' : 'Aweiss.Dom.Element'
	});

	function Class(){
	eval(this.eval);

		Public.originalUrl = '';
		Public.currentUrl = '';
		Public.maskedUrl = null;
		Public.win = null;
		Public.doc = null;
		Public.frame = null;
		Protected.unloadWatched = false;
		Protected.linksWatched = false;
		Protected.classes = {
			foreground_page : 'foreground_page',
			background_page : 'background_page',
		};
		Public.savedDocElement = null;
		Public.hasExecuted = false;
		Public.rendering = false;
		Public.rendered = false;
		Public.hasLoaded = false;
		Public.lastDisplay=null;
		
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

		Public.downloadDoc = function(callback) {
			var _ = this;
			ResourceManager.downloadDoc(_.url, function(doc) {
				_.saveThis(doc.documentElement);
				if (callback != null) {
					callback();
				}
			});
		}

		Public.downloadAll = function(callback) {
			var _ = this;
			ResourceManager.downloadDocAndDeps(_.url, function(doc) {
				_.saveThis(doc.documentElement);
				if (callback != null) {
					callback();
				}
			});
		}

		Protected.initFrame = function() {
			var _ = this;
			_.linksWatched = false;
			_.frame = FrameManager.getFrame();
			_.frame.url = _.url;
			_.element.insert({
				'top' : _.frame.element
			});
		}

		Protected.loadFromSave = function(inBackground, callback) {
			var _ = this;
			_.win.addEventListener("load", function() {
				_.hasLoaded = true;
			});

			if (inBackground == null) {
				inBackground = false;
			}
			//_.frame.docElement = _.savedDocElement;
			var scripts = [];
			var savedDoc = _.savedDocElement.ownerDocument;
			var scripts = Array.prototype.slice.call(savedDoc.getElementsByTagName('script'), 0);
			for (var i = 0; i < scripts.length; i++) {
				var script = scripts[i];
				var parent = script.parentNode;
				parent.removeChild(script);
				script.__oldParent = parent;
				/*var s = document.createElement("script");
				 s.type = "text/javascript";
				 s.src = element.src;
				 _.doc.head.appendChild(s);*/
			}
			_.frame.docElement = _.savedDocElement
			//_.frame.docElement =  _.doc.implementation.createHTMLDocument("").docElement;
			//_.doc.body = _.doc.importNode(savedDoc.body, true);
			;
			/*var elements = _.doc.getElementsByTagName('*');
			 var toDownload = [];

			 var allDownloaded=function(e) {
			 callback(doc);
			 };

			 for (var i = 0; i < elements.length; i++) {
			 var element = elements[i];
			 element.onload=function(){
			 ;
			 alert('element loaded'+element.tagName+element.src+element.name);
			 }
			 element.onabort=function(){
			 ;
			 alert('element loaded'+element.tagName+element.src+element.name);
			 }
			 element.onerror=function(){
			 ;
			 alert('element loaded'+element.tagName+element.src+element.name);
			 }
			 }*/
			function completed() {
				var customLoad = _.doc.createEvent('CustomEvent');
				customLoad.initCustomEvent("aweiss_ajax_load:complete", false, false, {});
				_.win.dispatchEvent(customLoad);
			}

			function finished() { ;
				/*function alertLoaded(){
				 var load_event = _.doc.createEvent("HTMLEvents");
				 load_event.initEvent("load", true, true);
				 _.win.dispatchEvent(load_event);
				 alertParentLoaded();
				 }

				 function alertDomLoaded(){
				 var DOMContentLoaded_event = _.doc.createEvent("Event")
				 DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
				 _.doc.dispatchEvent(DOMContentLoaded_event);
				 }
				 alertDomLoaded();
				 _.win.onload=function(){
				 alertLoaded();
				 };*/
				if (!_.hasLoaded) {
					_.win.addEventListener("load", completed);
				} else {
					completed();
				}
				if (callback != null) {
					callback();
				}

			}

			function addScript(script) {
				//script.__oldParent.appendChild(node);
				_.doc.head.appendChild(script);
			}

			function addScripts(i) { ;
				function nextScript() {
					if (false) {
						window.setTimeout(addScripts.bind(null, i + 1), 200);
					} else {
						addScripts(i + 1);
					}
				}

				if (i == null) {
					i = 0;
				}
				var script = scripts[i];
				if (script != null) {
					script = _.doc.importNode(script, true);
					if (script.src != null && script.src != "") {
						if (script.src.indexOf('initiator.js') == -1) {
							script.onload = addScripts.bind(null, i + 1);
							script.onerror = nextScript;
							script.onabort = function() {
								alert('aborted')
							}
							addScript(script);
						} else {//is initiator:skip
							nextScript();
						}
					} else {//inline script
						addScript(script);
						nextScript();
					}
				} else {//script is null
					if (i >= scripts.length) {
						_.hasExecuted = true;
						finished();
						/*var frameDoc = _.doc;
						 var DOMContentLoaded_event = frameDoc.createEvent("Event")
						 DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
						 frameDoc.dispatchEvent(DOMContentLoaded_event);

						 var load_event = frameDoc.createEvent("HTMLEvents");
						 load_event.initEvent("load", true, true);
						 _.frame.win.dispatchEvent(load_event);*/
						/*var finishedScript = frameDoc.createElement('SCRIPT');
						 finishedScript.text = '('+finished.toString();+')();'
						 savedDoc.body.appendChild(finishedScript)*/
					}
				}
			}

			if (!_.hasExecuted) {
				if (false) {
					window.setTimeout(addScripts, 500);
				} else {
					_.win.addEventListener("load", function(e) {
						addScripts()
					});
				}
			} else if (_.hasExecuted) {
				finished();
			}
		}

		Private.loadLab = function(callback) {
			(function(global, oDOC, handler) {
				var head = oDOC.head || oDOC.getElementsByTagName("head");

				function LABjsLoaded() {
					if (callback != null) { callback;
					}
					// do cool stuff with $LAB here
				}

				// loading code borrowed directly from LABjs itself
				setTimeout(function() {
					if ("item" in head) {// check if ref is still a live node list
						if (!head[0]) {// append_to node not yet ready
							setTimeout(arguments.callee, 25);
							return;
						}
						head = head[0];
						// reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
					}
					var scriptElem = oDOC.createElement("script"), scriptdone = false;
					scriptElem.onload = scriptElem.onreadystatechange = function() {
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
					oDOC.addEventListener("DOMContentLoaded", handler = function() {
						oDOC.removeEventListener("DOMContentLoaded", handler, false);
						oDOC.readyState = "complete";
					}, false);
				}
			})(_.frame.win, _.doc);
		}

		Protected.load = function(inBackground, callback) {
			var _ = this;
			if (!_.hasSave) {
				_.downloadDoc(addContent);
			} else {
				addContent();
			}

			function addContent() {
				if (!_.isOnStage) {
					_.addInBackground(_.loadFromSave.bind(null, inBackground, callback));
				} else {//onstage
					_.loadFromSave(inBackground, callback);
				}
			}

		}

		Protected.replaceDoc = function(doc) {
			var _ = this;
			//;
			_.frame.replaceDoc(doc);
			_.linksWatched = false;
		}

		Protected.save = function() {
			var _ = this;
			_.savedDocElement = _.frame.docElement;
		}

		Protected.saveThis = function(docElement) {
			var _ = this;
			;
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

		Public.downloadToCache = function() {
			var _ = this;
		}

		Public.downloadToSave = function() {
			var _ = this;
		}

		Public.prepare = function() {
			var _ = this;
			if (_.frame == null) {
				_.initFrame();
				_.frame.loadType = 'stop';
				_.addToStage();
			}
		}

		Public.downloadByRender = function(callback) {
			var _ = this;
			var date = new Date();
			_.frame.onComplete(function() { 
				//console.log('downloadbyrender frame complete; \n;');
			if(_.lastDisplay==null||date.getTime()>_.lastDisplay.getTime()){
				_.removeFromStage();
				if (callback != null) {
					callback();
				}
				}
			});
			_.render(true);
		}
		
		Private.render=function(inBackground, callback){
			var _ = this;
			function rendered() {
				//console.log('page rendered \n;');
				//;
				_.rendered = true;
				if (callback != null) {
					callback();
				}
				
				EventManager.fire(new PageRenderedEvent(_.url));
				//note that if the callback waits for a pagerenderedevent, it will be executed for this page renderedevent
			}
			
			function ready(){
			if (!_.rendered) {
					if (_.frame == null) {
						_.initFrame();
					}
					_.frame.onRender(rendered);
					if (!inBackground) {
						if (!_.hasSave) {
							_.addInForeground();
						} else {
							_.load(inBackground);
						}
					} else if (inBackground) {
						_.load(inBackground);
					}
			} else if (_.rendered) {
				rendered();
			}
			}
			EventManager.queueRelayListener(PageRenderedEvent.getEventType(_.url), ready);
		}
		
		Public.display = function(inBackground, callback) {
			var _ = this;
			_.lastDisplay= new Date();
			_.render(inBackground, callback);
		}

		Protected.addInBackground = function(callback) {
			var _ = this;
			_.frame.loadType = 'stop';
			_.frame.onReady(callback);
			_.addToStage();
		}

		Protected.addInForeground = function() {
			var _ = this;
			_.frame.onComplete(function() {
				_.save();
				_.hasExecuted = true;
				_.hasLoaded = true;
			});
			_.addToStage();
		}

		Protected.addToStage = function() {
			var _ = this;
			$$('body')[0].insert({
				'top' : _.element
			});
			//_.doc.docElement.ownerDocument=document;
			/*var frame = (function() {
			 var iframe = _.frame.element;
			 var idoc = iframe.contentDocument || iframe.contentWindow.doc;
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
			if (_.isOnStage) {
				$(_.element).remove();
				_.rendered = false;
			}
		}

		Public.clearMemory = function() {
			var _ = this;
			_.savedDocElement = null;
			_.hasExecuted = false;
		}

		Public.isMatchingLink = function(link, includeHashes) {
			var _ = this;
			if (Tools.isLinkSameDomain(link) && link.href.indexOf('view=event') == -1) {
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

			/*var linkWrapper = _.doc.body;
			 function isMatching() {
			 this.match = _.isMatchingLink;
			 };
			 linkWrapper.select('a').grep(new isMatching()).each(function(element) {
			 links.push(element);
			 });*/
			var allLinks = _.doc.links;
			var matchingLinks = [];
			for (var i = 0; i < allLinks.length; i++) {
				var link = allLinks[i];
				if (_.isMatchingLink(link, includeHashes)) {
					matchingLinks.push(link);
				}
			}
			return matchingLinks;
		}

		Public.getLinkUrls = function(includeHashes) {
			var _ = this;
			var links = _.getLinks(includeHashes);
			var urls = [];
			for (var i = 0; i < links.length; i++) {
				var element = links[i];
				var url = unescape(element.href);
				urls.push(url);
			}
			return urls
		}

		Protected.onBeforeUnload = function(theFunction) {
			var _ = this;
			//var initiatorWindow=_.getInitiatorWindow();
			//event.observe
			var win = _.win;
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
				_.win.addEventListener('click', function(event) {
					var element = event.srcElement
					if (element.tagName == 'A' && _.isMatchingLink(element, includeHashes)) {
						event.preventDefault();
						event.stopPropagation();
						theFunction(element);
					}
				}, true);
				_.linksWatched = true;
			}
		}

		Public.Get.doc = function() {
			var _ = this;
			return _.frame.doc;
		}

		Public.Set.doc = function(doc) {
			var _ = this;
			_.frame.doc = doc;
		}

		Public.Get.win = function() {
			var _ = this;
			return _.frame.win;
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
			console.log('removed:' + _.url)
			_.clearMemory();
			if (_.frame != null) {
				FrameManager.release(_.frame);
				_.frame = null;
			}
			if (_.isOnStage) {
				_.removeFromStage();
			}
		}
	}

})();

