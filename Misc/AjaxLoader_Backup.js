function jsCols(callBack) {
	Importer.get('js_cols/base.js', ready);
	function ready() {
		js_cols.basePath = Importer.baseDir;
		Importer.get('js_cols/LinkedList.js', callBack);
	}

}

var importList = ['Aweiss.Tools', 'Aweiss.Events', 'Aweiss.EEvent', 'Aweiss.Events.PageLoadedEvent', {
	'scripty2/dist/s2.js' : ['http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js']
}, 'history/src/history.js', jsCols];

Importer.getAndDefine('Aweiss.AjaxLoader', importList);

Aweiss.AjaxLoader = function() {
	var _ = this;

	Private.pages = {};
	Private.loadingPages = {};
	Private.originalURL = '';
	Private.transitionAnimations = null;
	Private.pageListeners = {};
	Private.currentPage = '';
	Private.destinationPage = '';
	Private.events = {
		'ANIMATION_DONE' : 'ANIMATION_DONE',
	};
	Private.classes = {
		foreground_page : 'foreground_page',
		background_page : 'background_page',
		links_added : 'links_added'
	};
	Private.options={};
	
	Public.init = function(options) {
		var _ = this;
		_this.transitionAnimations = new S2.FX.Queue();
		_this.options=options;
	};

	Public.initialize = function() {
		/*var div = document.createElement("div");
		 div.className += _this.classes.foreground_page;
		 div.id = unescape(location.href);
		 while (document.body.firstChild) {
		 div.appendChild(document.body.firstChild);
		 }
		 _this.initPage(div);
		 document.body.appendChild(div);
		 */
		var url = unescape(window.location.href);
		//_this.setPage(url, document.documentElement.outerHTML);
		//_this.addPageToStage(url);
		//document.implementation.createHTMLDocument(title);

		_this.originalURL = url;

		history.replaceState({
			url : url
		}, url, url);

		window.onpopstate = function(event) {
			alert('p');
			if (event.state != null) {
				_this.switchToPage(event.state.url);
			}
		};
		
		function pageReady() {
			var page=$(url)
			_this.initPage(url);
			_this.show(page);
			_this.setCurrentPage(url);
			_this.createPagesFromLinks(url);
		};

		_this.currentPage = url;
		_this.createPage(url, pageReady);
		/*
		 * var content = "<html>"+document.documentElement.innerHTML+"</html>";
		 * setPage(url, content); _this.initPage();
		 */
	};
	
	Public.setOptions=function(options){
		_this.options=options;
	}
	
	Private.setPage = function(url, content) {
		_this.pages[url] = content;
	};

	Private.changeToHead = function(url) {

		function isNotRequired() {
			_this.match = function(element) {
				if (element.hasClassName('aweiss_ajax_load_required')) {
					return false;
				} else {
					return true;
				}
			};
		}

		;
		/*function isMetaElement() {
		 _this.match = function(element) {
		 if (Tools.getClass(element) == 'HTMLMetaElement') {
		 return true;
		 } else {
		 return false;
		 }
		 };
		 };
		 var metaElements = $(url).contentDocument.head.childElements().grep(
		 new isMetaElement()).each(function(element) {
		 document.head.insert({
		 'top' : element.clone(true)
		 });
		 });
		 */
		var title=document.head.select('title')[0];
		if(title!=null){
			document.head.select('title')[0].remove();
		}
		/*document.head.childElements().grep(new isNotRequired()).each(
		 function(element) {
		 element.remove();
		 });*/

		var newTitle = $(url).contentDocument.head.select('title')[0];
		if(newTitle!=null){
			newTitle=newTitle.clone(true);
		}

		document.head.insert({
			'top' : newTitle
		});
	};


	Private.switchToPage = function(url) {
		_this.createPage(url, function() {
			_this.initPage(url);
			_this.appearPage(url, _this.createPagesFromLinks.bind(_this, url));
		});
	}; 

	Private.createPage = function(url, callBack) {
		_this.getPage(url, pageReady);
		function pageReady() {
			var page = $(url);
			if (page == null) {
				_this.addPageToStage(url, callBack);
			} else {
				if (callBack != null) {
					callBack();
				}
			}

		}

	};
	Private.addNewIframe=function(url){
		var newPage = new Element('iframe', {
			'class' : _this.classes.background_page,
			id : url,
			seamless:'seamless'
		}).setStyle({
			display : 'none'
		});
		$$('body')[0].insert({
			'top' : newPage
		});
		newPage.contentWindow.location.hash=Tools.getHash();
		return newPage;
	}
	
	Private.addPageToStage = function(url, callback) {
		var newPage = _this.addNewIframe(url);
		window.addEventListener("aweiss_ajax_load:iframeLoaded_" + url, function() {
			if (callback != null) {
				callback();
			}
		});

		newDoc = newPage.contentWindow.document;
		newDoc.open();
		newDoc.write(_this.pages[url]);
		newDoc.close();
	};

	Private.endAnimations = function() {
		if (activeAnimations.active()) {
			var effects = activeAnimations.getEffects();
			var effectsToCancel = [];
			for (var i = 0; i < effects.length; i++) {
				effectsToCancel.push(effects[i]);
			}
			for (var i = 0; i < effectsToCancel.length; i++) {
				effectsToCancel[i].finish();
				// effectsToCancel[i].finish();
				// effectsToCancel[i].after();
				activeAnimations.remove(effectsToCancel[i]);
			}
		}
	};

	Private.show = function(page) {
		page.setStyle({
			display : 'inline'
		});
	};

	Private.hide = function(page) {
		page.setStyle({
			display : 'none'
		});
	};

	Private.setOpacity = function(page, num) {
		page.setStyle({
			opacity : 1
		});
	};

	Private.appearPage = function(url, callBack) {
		if (_this.destinationPage == url) {
			if(callBack!=null){
				callBack();
			}
			return;
		}
		
		else if(_this.currentPage == url&&!_this.transitionAnimations.active()){
			if(callBack!=null){
				callBack();
			}
			return;
		}
		
		var newPage;
		var oldPage;
		_this.destinationPage = url;
		
		function done() {
			_this.setOpacity(oldPage, 1);
			_this.removeCurrentPage();
			_this.setCurrentPage(url, true);
			Events.fire(new EEvent(_this.events.ANIMATION_DONE));
			if(callBack!=null){
				callBack();
			}
		};
		
		function init(event) {
			newPage = $(url);
			_this.show(newPage);
			// var color =
			// $('_this.classes.foreground_page').getStyle('background_page-color');
			// $('_this.classes.foreground_page').setStyle({'background_page-color' :
			// Tools.changeAlpha(color, 1)});
			oldPage = $(_this.currentPage);
			var effect = new S2.FX.Morph(oldPage, {
				style : 'opacity:0;',
				duration : 1.0,
				after : done,
				queue : _this.transitionAnimations,
				position : 'end'
			});
			// activeAnimations.add(effect, {position:'end'});
			// activeAnimations.render((new Date()).getTime());
			effect.play();
			// effect.render(new Date);
		}

		if (_this.transitionAnimations.active()) {
			Events.queueListener(_this.events.ANIMATION_DONE, init);
		} else {
			init();
		}

	}

	Private.setCurrentPage = function(url, pushState) {
		_this.switchClasses($(url));
		_this.currentPage = url;
		_this.changeToHead(url);
		if(pushState){
		window.history.pushState({
			url : url
		}, url, url);
		}
	};

	Private.removeCurrentPage = function() {
		var oldPage = $(_this.currentPage);
		if (!( oldPage instanceof HTMLIFrameElement)) {
			oldPage.remove();
			_this.addPageToStage(oldPage.id);
		}
		_this.switchClasses(oldPage);
		_this.hide(oldPage);
	}

	Private.switchClasses = function(element) {
		if (element.hasClassName(_this.classes.foreground_page)) {
			element.removeClassName(_this.classes.foreground_page);
			element.addClassName(_this.classes.background_page);
		} else if (element.hasClassName(_this.classes.background_page)) {
			element.removeClassName(_this.classes.background_page);
			element.addClassName(_this.classes.foreground_page);
		}
	};

	Private.getPage = function(url, callback) {
		if (_this.isPageLoading(url)) {
			Events.addListener(PageLoadedEvent.getEventType(url), callback, true);
		} else if (_this.pages[url] == null) {
			_this.downloadPage(url, callback);
		} else if (callback != null) {
			callback();
		}
	};

	Private.isPageLoading = function(url) {
		return (_this.loadingPages[url]);
	};

	Private.markPageReady = function(url) {
		_this.loadingPages[url] = false;
		Events.fire(new PageLoadedEvent(url));
	};

	Private.markPageLoading = function(url) {
		_this.loadingPages[url] = true;
	};

	Private.downloadPage = function(url, callback) {
		var content;
		_this.markPageLoading(url);
		var newPage = _this.addNewIframe(url);
		window.addEventListener("aweiss_ajax_load:iframeLoaded_" + url, function() {
			if (callback != null) {
				callback();
			}
		});
		/*new Ajax.Request(url, {
			method : 'get',
			onSuccess : function(transport) {
				content = transport.responseText;
				_this.pages[url] = content;

				_this.markPageReady(url);

				if (callback != null) {
					callback();
				}
			},
			onException : function(request, e) {
				console.log(e.message);
				console.log(e.stack);
				// prints undefinedVar is not defined
			}
		});
		*/
	};
	
	Private.initPage=function(url){
		_this.watchForUnload(url)
		_this.initUnload($(url).contentWindow);
		_this.initLinks(url);
	};
	
	Private.watchForUnload=function(url){
		Event.observe(window,'aweiss_ajax_load:iframeClosed_'+url, function(e){
		
		var oldPage = $(url);
		var oldWin=oldPage.contentWindow;
		var oldDoc = oldWin.document;
		
		var copyPage = _this.addNewIframe(url); 
		var copyWin=copyPage.contentWindow;
		var copyDoc=copyWin.document;
		
		copyDoc.replaceChild(oldDoc.documentElement, copyDoc.documentElement);
		_this.initUnload(copyWin);
		_this.show(copyPage);
		_this.switchClasses(copyPage);
		oldPage.remove();
		var initiatorWindow = _this.getInitiatorWindow();
		_this.appearPage(initiatorWindow.destination);
		/*var effect=_this.transitionAnimations.getEffects()[0];
		effect.render((new Date()).getTime());
		while(effect.state!="finished"){
		var req = new XMLHttpRequest();
		req.open("GET", 'http://localhost/~avi2/ajax_load/About%20Me.html', false);
		req.send(null);
		}*/
	});
	}
	
	Private.initUnload=function(win){
		var initiatorWindow=_this.getInitiatorWindow();
		event.observe
		win.onbeforeunload = function(e){
			Event.fire(initiatorWindow, 'aweiss_ajax_load:iframeClosed_'+win.frameElement.id, true, true);
		}
	}

	
	Private.createPagesFromLinks=function(url){
		var links = _this.getLinks(url);
		links.each(function(element){
			var linkUrl = unescape(element.href);
			_this.createPage(linkUrl);
		});
	};
	
	Private.initLinks=function(url){
		var page=$(url);
		if (!page.hasClassName(_this.classes.links_added)) {
		var links = _this.getLinks(url);
		links.each(function(element){
			var linkUrl = unescape(element.href);
			Event.observe(element, 'click', function(event) {
					//event.stop();
					// _this.endAnimations();
					var initiatorWindow = _this.getInitiatorWindow();
					initiatorWindow.destination=linkUrl;
				});
		});
		page.addClassName(_this.classes.links_added);
		}
	};
	
	Private.getLinks=function(url){
		var page=$(url);
			var linkWrapper = page;
			if ( page instanceof HTMLIFrameElement) {
				linkWrapper = page.contentDocument.body;
			}
			
			function isMatching() {
				this.match = function(element) {
					if (Tools.isLinkSameDomain(element)) {
						if(!_this.options.loadHashes && element.hash!=""){
							return false;
						}
						else{
							return true;
						}
					} else {
						return false;
					}
				};
			}
			var links=[];
			linkWrapper.select('a').grep(new isMatching()).each(function(element) {
				links.push(element);
			});
			return links;
	}
	
	Private.getInitiatorWindow=function(){
		return Tools.getWindowByName('aweiss_ajax_load_initiator');
	}
	/*$$('div').each(function(box, i) {
	 box.morph('left:10px; right:10px', {
	 duration : 2,
	 delay : 0,
	 propertyTransitions : {
	 right : 'wobble',
	 left : 'wobble'
	 }
	 });
	 });
	 */
};
