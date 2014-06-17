(function() {

	var importList = ['Aweiss.Utils.Tools', 'Aweiss.Events.EventManager', 'Aweiss.Events.BaseEvent', 'Aweiss.AjaxLoader.Events.WindowLoadedEvent', 
	'Aweiss.AjaxLoader.Events.ResourceDownloadedEvent', 'Aweiss.AjaxLoader.Events.PageRenderedEvent',
	'Aweiss.AjaxLoader.Page', 'Aweiss.AjaxLoader.ManagedPage', 'Aweiss.AjaxLoader.Animator', 
	{'scripty2/dist/s2.js' : 'http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js'}, 'history/src/history.js', {'Libs/js_cols/LinkedList.js':'Libs/js_cols/base.js'}];

	var name = 'Aweiss.AjaxLoader.PageManager';

	OOPS.DEFINE(name, Class, importList);

	function Class() {
eval(this.magic);
(function(){
'use strict';

		Private.pages = {};
		Private.currentPage = null;
		Private.destinationPage = null;
		Private.animator = null;
		Private.inTransition = null;
		Private.events = {
			PAGE_LOADED : 'PAGE_LOADED',
			TRANSITION_DONE:'TRANSITION_DONE'
		};
		Private.pageBeingRendered=null;

		Public.init = function(animator) {
			var _ = this.magic ? eval(this.magic) : this;
			_.animator = animator;

			window.onpopstate = function(event) {
				if (event.state != null) {
					_.setCurrentPage(event.state.url, true);
				}
			};
		}

		Private.changeToHead = function(page) {
			var _ = this.magic ? eval(this.magic) : this;
			function isNotRequired() {
				_.match = function(element) {
					if (element.hasClassName('aweiss_ajax_load_required')) {
						return false;
					} else {
						return true;
					}
				};
			}

			;
			/*function isMetaElement() {
			 _.match = function(element) {
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
			var title = document.head.select('title')[0];
			if (title != null) {
				document.head.select('title')[0].remove();
			}
			/*document.head.childElements().grep(new isNotRequired()).each(
			 function(element) {
			 element.remove();
			 });*/

			//var newTitle = page.doc.head.select('title')[0];
			var newTitle = page.doc.getElementsByTagName('title')[0];
			if (newTitle != null) {
				//newTitle = newTitle.clone(true);
				newTitle = document.importNode(newTitle, true);
			}

			document.head.insert({
				'top' : newTitle
			});
		};

		Public.removePage = function(id) {
			var _ = this.magic ? eval(this.magic) : this;
			page.removeFromStage();
			_.pages[id] = null;
		}

		Private.createPage = function(url) {
			var _ = this.magic ? eval(this.magic) : this;
			var newPage = new ManagedPage(url, true);
			return newPage
		}

		Public.addPage = function(url) {
			var _ = this.magic ? eval(this.magic) : this;
			url = unescape(url);
			var newPage;
			if(_.pages[url]!=null){
				newPage=_.pages[url];
			} 
			else{
				newPage = _.createPage(url);
				_.pages[url] = newPage;
			}
			return newPage;
		}
		
		Public.removePage=function(url){
			var _ = this.magic ? eval(this.magic) : this;
			_.page[url]=null;
		}
		
		/*Public.removeBackgroundPage=function(url){
			var _ = this.magic ? eval(this.magic) : this;
			var page = _.pages[url];
			page.removeFromStage();
		}
		
		ublic.bringToBackground = function(page) {
			var _ = this.magic ? eval(this.magic) : this;
			page.bringToBackground();
			page.setOpacity(1);
			page.hide();
			//page.hide();  //not rendered
		}

		Public.bringToForeground = function(page, callback) {
			var _ = this.magic ? eval(this.magic) : this;
			page.bringToForeground();
			page.setOpacity(1);
			page.show();
		}*/

		Public.addBackgroundPage = function(url) {
			var _ = this.magic ? eval(this.magic) : this;
			if(_.pages[url]==null){
			var newPage = _.addPage(url);
			newPage.bringToBackground();
			newPage.downloadByRender();
			//EventManager.queueRelayListener(PageRenderedEvent.getEventType(""), newPage.render.bind(null, true, null));
			//newPage.render(true);
			/*newPage.download(function(){
				;
				/*EventManager.queueRelayListener(PageRenderedEvent.getEventType(""), function(){
					window.setTimeout(newPage.render.bind(null, true), 1);
					}, true);*
			});
			*/}
			
			//newPage.preDownload();
		}
		
		Private.addBackgroundPages = function(urls) {
			var _ = this.magic ? eval(this.magic) : this;
			for(var i=0;i<urls.length;i++){
				var url=urls[i];
				_.addBackgroundPage(url);
			}
		};
		
		Public.getPage = function(id) {
			var _ = this.magic ? eval(this.magic) : this;
			return _.pages[id];
		}



		Public.setCurrentPage = function(url, pushState) {
			var _ = this.magic ? eval(this.magic) : this;
			var page=_.pages[url];
			if(page==null){
				page=_.addPage(url);
			}
			function transitionDone(){
				_.inTransition=false;
				EventManager.fire(new BaseEvent(_.events.TRANSITION_DONE));
			}
				if(_.inTransition){
					EventManager.queueListener(_.events.TRANSITION_DONE, init);
				}
				else{
					init();
				}
				function init(){
					if (_.currentPage != page) {
					page.hide();
					_.inTransition = true;
					_.destinationPage=page;
					page.display(false, function() {
					_.watchForUnload(page);
					
					if(_.currentPage!=null){
						page.bringToBackground();
						_.appearPage(page, pageReady);
					}
					else{
						//;
						page.bringToForeground();
						pageReady();
					}
					function pageReady() {
						_.currentPage = page;
						if (pushState) {
							var url = page.url;
							window.history.pushState({
								url : url
							}, url, url);
						}
						if(!EventManager.hasQueuedListener(_.events.TRANSITION_DONE)){
						_.initPage(page);
						}
					_.destinationPage=null;
					transitionDone();
					}
				});
				}
				else{
					transitionDone();
				}
				}
		};
		
		Private.initPage=function(page){
			var _ = this.magic ? eval(this.magic) : this;
			_.changeToHead(page);
			var urls = page.getLinkUrls();
			_.addBackgroundPages(urls);
			urls.push(page.url);
			_.removeAllBut(urls);
		}
		
		Private.removeAllBut=function(urls){
			var _ = this.magic ? eval(this.magic) : this;
			for(var pageid in _.pages){
				var page =_.pages[pageid];
				if(urls.indexOf(page.url)==-1){
					page.remove();
				}
			}
			for(var i=0;i<urls.length;i++){
				var url=urls[i];
		}
		}
		
		Private.setDestination = function(destination) {
			var _ = this.magic ? eval(this.magic) : this;
			//var initiatorWindow = _.getInitiatorWindow();
			destination = unescape(destination);
			DataManager.setItem('destination', destination);
		}

		Private.getDestination = function() {
			var _ = this.magic ? eval(this.magic) : this;
			return DataManager.getItem('destination');
		}

		Private.appearPage = function(page, callback) {
			var _ = this.magic ? eval(this.magic) : this;
			//;
			if (_.destinationPage == Page) {
				if (callback != null) {
					callback();
				}
			} else if ((_.currentPage == Page && !_.inTransition)||_.currentPage == null) {
				if (callback != null) {
					callback();
				}
			} else {
				_.animator.transition(_.currentPage, page, function() {
					//;
					var oldPage = _.currentPage;
					var newPage = page;
					newPage.bringToForeground();
					oldPage.bringToBackground();
					callback();
				});
			}
		}

		Private.watchForUnload = function(page) {
			var _ = this.magic ? eval(this.magic) : this;
			page.onLinkClick(function(element) {
				_.setCurrentPage(unescape(element.href), true);
			});
			//page.onUnload(_.copyAndSwitch());
		}

		Private.copyAndSwitch = function(oldPage) {
			var _ = this.magic ? eval(this.magic) : this;
			var oldWin = oldPage.window;
			var destination = _.getDestination();
			var originalLocation = oldWin.location.href;

			if (destination != _.currentPage) {

				var oldDoc = oldWin.document;
				var oldBody = oldDoc.body;
				var copyPageID = 'COPY_' + oldPage.url;
				var copyPage = PageManager.addPage(new Page(null, false), copyPageID);
				var copyWin = copyPage.contentWindow;
				var copyDoc = copyWin.document;

				/*var copyPage = new Element('div', {
				 'class' : _.classes.background_page,
				 id : copyPageID
				 }).setStyle({
				 display : 'none'
				 });

				 while (oldBody.firstChild)
				 {
				 copyPage.appendChild(oldBody.firstChild);
				 }*/
				$$('body')[0].insert({
					'top' : copyPage
				});
				DataManager.setItem('type', 'stop', oldPage.frame.id);
				_.currentPage = copyPageID;
				PageManager.switchClasses(copyPage);
				copyPage.contentDocument.open();
				//copyPage.contentDocument.write(oldDoc.documentElement.outerHTML);
				copyPage.contentDocument.close();
				copyPage.contentDocument.replaceChild(oldPage.contentDocument.documentElement, copyPage.contentDocument.documentElement);
				var links = _.getLinks(copyPageID);
				links.each(function(element) {
					Event.observe(element, 'click', function(event) {
						event.preventDefault();
						event.stopPropagation();
						//event.stop();
						// _.endAnimations();
					});
				});
				//copyPage.contentDocument.open();
				//copyPage.contentDocument.write(oldDoc.documentElement.outerHTML);
				//copyPage.contentDocument.close();
				PageManager.switchClasses(oldPage);
				_.hide(oldPage)
				//_.watchForUnload(copyWin);
				_.show(copyPage);
				//setTimeout(function(){
				function pageSwitched() {
					PageManager.remove(copyPage);
					oldWin.location.href = originalLocation;
				}

				if (destination != null) {
					_.setCurrentPage(destination, pageSwitched);
				} else {
					var check = setInterval(function() {
						if (originalLocation != oldWin.location.href) {
							_.setCurrentPage(oldWin.location.href, pageSwitched);
							clearInterval(check);
						}
					}, 10);
				}
			} else {
				window.location.reload();
			}
			//},6000);
			/*var effect=_.transitionAnimations.getEffects()[0];
			 effect.render((new Date()).getTime());
			 while(effect.state!="finished"){
			 var req = new XMLHttpRequest();
			 req.open("GET", 'http://localhost/~avi2/ajax_load/About%20Me.html', false);
			 req.send(null);
			 }*/
		}})();
		/*var newDoc = newPage.contentWindow.document;
		 newDoc.open();
		 newDoc.write(_.pages[url]);
		 newDoc.close();*/
	}

})(); 


