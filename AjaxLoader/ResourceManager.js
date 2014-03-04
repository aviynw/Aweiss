(function() {

	var name = 'Aweiss.AjaxLoader.ResourceManager';

	var importList = ['Aweiss.Events.EventManager', 'Aweiss.Events.BaseEvent', 'Aweiss.AjaxLoader.Events.ResourceDownloadedEvent', 'Aweiss.Utils.Tools', 'Aweiss.AjaxLoader.FrameManager'];

	DEFINE(name, Class, importList);

	function Class(){
	eval(this.eval);
		Static.Private.loadingResources = {};
		Static.Private.pastDownloads = [];
		Static.Private.stage=null;
		
		Static.Public.init=function(){
			var _ = this;
			_.static.stage=FrameManager.getFrame();	
		}
		
		Static.Public.downloadDeps = function(doc){
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
						if(url!=null&&url!=""&&_.static.pastDownloads.indexOf(url)==-1){
						if(Tools.isSameDomain(url)){
							toDownload.push(url);
							EventManager.addCumlativeListener(ResourceDownloadedEvent.getEventType(url), allDownloaded)
						}
						else{
						}
					}
				}
				}
				
				// else if (!_.static.allreadyDownloaded()) {
				for (var i = 0; i < toDownload.length; i++) {
					var url = toDownload[i];
					if (!_.static.isResourceLoading(url)) {
						_.static.retrieve(url, true);
					}
				}
			}
		
		Static.Public.downloadDocAndDeps = function(url, callback) {
			var _ = this;
			_.static.downloadAsType(url, 'document', function(doc){
				_.static.downloadDeps(doc);
			});
		}

		Static.Public.downloadDoc = function(url, callback){
			var _ = this;
			_.static.downloadAsType(url, 'document', callback);
		}
		
		Static.Public.Async.download = function(url, callback) {
			var _ = this;
			_.static.downloadAsType(url, null, callback);
		};
		
		Static.Private.downloadAsType = function(url, responseType, callback) {
			var _ = this;
			EventManager.addListener(ResourceDownloadedEvent.getEventType(url), function(e){
				if(callback!=null){
					callback(e.content);
				}
				}, false);
			// else if (!_.static.allreadyDownloaded()) {
			if (!_.static.isResourceLoading(url)){
				_.static.retrieve(url, true, responseType);
			}
			//else {
			//if (callback != null) {
			//	callback();
			//}
			//}
		};

		/*Static.Private.allreadyDownloaded = function(url) {
		 return (_.static.pastDownloads.indexOf(url) != -1);
		 };*/

		Static.Private.isResourceLoading = function(url) {
			var _ = this;
			return (_.static.loadingResources[url]);
		};
		
		Static.Private.markLoading=function(url, val){
			var _ = this;
			_.static.loadingResources[url]=val;
		}
		
		Static.Private.retrieve = function(url, asynchronous, responseType, callback) {
			var _ = this;
			/*var content;
			 _.static.markResourceLoading(url);
			 var frame = ResourceManager.add(url, ready);

			 function ready(iframe){
			 if(_.static.options.type=='rendered'){
			 _.static.Resources[url]=iframe.contentDocument.documentElement;
			 }
			 else if(_.static.options.type='memory'){
			 _.static.Resources[url]=iframe.contentDocument.documentElement;
			 }
			 else if(_.static.options.type=="cached"){
			 }
			 _.static.show(frame);
			 }

			 DataManager.setItem(frame.contentWindow, 'type', 'stop');*/
			/*_.static.markLoading(url, true);
			new Ajax.Request(url, {
				method : 'get',
				onSuccess : function(transport) {
					var content = transport.responseText;
					EventManager.fire(new ResourceDownloadedEvent(url, content));
					_.static.markLoading(url, false);
					//_.static.pastDownloads.push(url);

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
//_.static.pastDownloads.push(url);
var content = this.response;

EventManager.fire(new ResourceDownloadedEvent(url, content));
_.static.markLoading(url, false);
if(callback!=null){
	callback();
}
}
xhr.open("GET", url, asynchronous);
//xhr.responseType = "document";
xhr.send();
		};
	}

})();
