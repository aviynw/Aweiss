(function() {

	var name = 'Aweiss.AjaxLoader.ResourceManager';

	var importList = ['Aweiss.Events.EventManager', 'Aweiss.Events.BaseEvent', 'Aweiss.AjaxLoader.Events.ResourceDownloadedEvent', 'Aweiss.Utils.Tools', 'Aweiss.AjaxLoader.FrameManager'];

	OOPS.DEFINE(name, Class, importList);

	function Class() {
eval(this.magic);
(function(){
'use strict';
		Private.Static.loadingResources = {};
		Private.Static.pastDownloads = [];
		Private.Static.stage=null;
		
		Public.Static.init=function(){
			var _ = this.magic ? eval(this.magic) : this;
			Static.stage=FrameManager.getFrame();	
		}
		
		Public.Static.downloadDeps = function(doc){
				var elements = doc.getElementsByTagName('*');
				var toDownload = [];
				
				var allDownloaded=function(e) {
					callback(doc);
				};

				for (var i = 0; i < elements.length; i++) {
					var element = elements[i];
					var hasToDownload =false;
					var backgroundImage = window.getComputedStyle(element,null).getPropertyValue("background-image");
					
					addURL(element.src);
					addURL(backgroundImage);
					
					function addURL(url){
						if(url!=null&&url!=""&&Static.pastDownloads.indexOf(url)==-1){
						if(Tools.isSameDomain(url)){
							toDownload.push(url);
							EventManager.addCumlativeListener(ResourceDownloadedEvent.getEventType(url), allDownloaded)
						}
						else{
						}
					}
				}
				}
				
				// else if (!Static.allreadyDownloaded()) {
				for (var i = 0; i < toDownload.length; i++) {
					var url = toDownload[i];
					if (!Static.isResourceLoading(url)) {
						Static.retrieve(url, true);
					}
				}
			}
		
		Public.Static.downloadDocAndDeps = function(url, callback) {
			var _ = this.magic ? eval(this.magic) : this;
			Static.downloadAsType(url, 'document', function(doc){
				Static.downloadDeps(doc);
			});
		}

		Public.Static.downloadDoc = function(url, callback){
			var _ = this.magic ? eval(this.magic) : this;
			Static.downloadAsType(url, 'document', callback);
		}
		
		Public.Static.Async.download = function(url, callback) {
			var _ = this.magic ? eval(this.magic) : this;
			Static.downloadAsType(url, null, callback);
		};
		
		Private.Static.downloadAsType = function(url, responseType, callback) {
			var _ = this.magic ? eval(this.magic) : this;
			EventManager.addListener(ResourceDownloadedEvent.getEventType(url), function(e){
				if(callback!=null){
					callback(e.content);
				}
				}, false);
			// else if (!Static.allreadyDownloaded()) {
			if (!Static.isResourceLoading(url)){
				Static.retrieve(url, true, responseType);
			}
			//else {
			//if (callback != null) {
			//	callback();
			//}
			//}
		};

		/*Private.Static.allreadyDownloaded = function(url) {
		 return (Static.pastDownloads.indexOf(url) != -1);
		 };*/

		Private.Static.isResourceLoading = function(url) {
			var _ = this.magic ? eval(this.magic) : this;
			return (Static.loadingResources[url]);
		};
		
		Private.Static.markLoading=function(url, val){
			var _ = this.magic ? eval(this.magic) : this;
			Static.loadingResources[url]=val;
		}
		
		Private.Static.retrieve = function(url, asynchronous, responseType, callback) {
			var _ = this.magic ? eval(this.magic) : this;
			/*var content;
			 Static.markResourceLoading(url);
			 var frame = ResourceManager.add(url, ready);

			 function ready(iframe){
			 if(Static.options.type=='rendered'){
			 Static.Resources[url]=iframe.contentDocument.documentElement;
			 }
			 else if(Static.options.type='memory'){
			 Static.Resources[url]=iframe.contentDocument.documentElement;
			 }
			 else if(Static.options.type=="cached"){
			 }
			 Static.show(frame);
			 }

			 DataManager.setItem(frame.contentWindow, 'type', 'stop');*/
			/*Static.markLoading(url, true);
			new Ajax.Request(url, {
				method : 'get',
				onSuccess : function(transport) {
					var content = transport.responseText;
					EventManager.fire(new ResourceDownloadedEvent(url, content));
					Static.markLoading(url, false);
					//Static.pastDownloads.push(url);

				},
				onException : function(request, e) {
					throw e;
					//console.log(e.message);
					//console.log(e.stack);
					// prints undefinedVar is not defined
				}
				,
				asynchronous:asynchronous 
			});
			*/
var xhr = new XMLHttpRequest();
if(responseType==null){
	xhr.responseType="";
}
else{
xhr.responseType=responseType;
}
xhr.onload = function() {
//Static.pastDownloads.push(url);
var content = this.response;

EventManager.fire(new ResourceDownloadedEvent(url, content));
Static.markLoading(url, false);
if(callback!=null){
	callback();
}
}
xhr.open("GET", url, asynchronous);
//xhr.responseType = "document";
xhr.send();
		}})();
	}

})();
