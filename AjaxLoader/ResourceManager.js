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
			_model.stage=FrameManager.getFrame();	
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
						if(url!=null&&url!=""&&_model.pastDownloads.indexOf(url)==-1){
						if(Tools.isSameDomain(url)){
							toDownload.push(url);
							EventManager.addCumlativeListener(ResourceDownloadedEvent.getEventType(url), allDownloaded)
						}
						else{
						}
					}
				}
				}
				
				// else if (!_model.allreadyDownloaded()) {
				for (var i = 0; i < toDownload.length; i++) {
					var url = toDownload[i];
					if (!_model.isResourceLoading(url)) {
						_model.retrieve(url, true);
					}
				}
			}
		
		Static.Public.downloadDocAndDeps = function(url, callback) {
			var _ = this;
			_model.downloadAsType(url, 'document', function(doc){
				_model.downloadDeps(doc);
			});
		}

		Static.Public.downloadDoc = function(url, callback){
			var _ = this;
			_model.downloadAsType(url, 'document', callback);
		}
		
		Static.Public.Async.download = function(url, callback) {
			var _ = this;
			_model.downloadAsType(url, null, callback);
		};
		
		Static.Private.downloadAsType = function(url, responseType, callback) {
			var _ = this;
			EventManager.addListener(ResourceDownloadedEvent.getEventType(url), function(e){
				if(callback!=null){
					callback(e.content);
				}
				}, false);
			// else if (!_model.allreadyDownloaded()) {
			if (!_model.isResourceLoading(url)){
				_model.retrieve(url, true, responseType);
			}
			//else {
			//if (callback != null) {
			//	callback();
			//}
			//}
		};

		/*Static.Private.allreadyDownloaded = function(url) {
		 return (_model.pastDownloads.indexOf(url) != -1);
		 };*/

		Static.Private.isResourceLoading = function(url) {
			var _ = this;
			return (_model.loadingResources[url]);
		};
		
		Static.Private.markLoading=function(url, val){
			var _ = this;
			_model.loadingResources[url]=val;
		}
		
		Static.Private.retrieve = function(url, asynchronous, responseType, callback) {
			var _ = this;
			/*var content;
			 _model.markResourceLoading(url);
			 var frame = ResourceManager.add(url, ready);

			 function ready(iframe){
			 if(_model.options.type=='rendered'){
			 _model.Resources[url]=iframe.contentDocument.documentElement;
			 }
			 else if(_model.options.type='memory'){
			 _model.Resources[url]=iframe.contentDocument.documentElement;
			 }
			 else if(_model.options.type=="cached"){
			 }
			 _model.show(frame);
			 }

			 DataManager.setItem(frame.contentWindow, 'type', 'stop');*/
			/*_model.markLoading(url, true);
			new Ajax.Request(url, {
				method : 'get',
				onSuccess : function(transport) {
					var content = transport.responseText;
					EventManager.fire(new ResourceDownloadedEvent(url, content));
					_model.markLoading(url, false);
					//_model.pastDownloads.push(url);

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
//_model.pastDownloads.push(url);
var content = this.response;

EventManager.fire(new ResourceDownloadedEvent(url, content));
_model.markLoading(url, false);
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
