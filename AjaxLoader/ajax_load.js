(function init() {
	function ready() {
		var ajaxLoader = new AjaxLoader();
		ajaxLoader.initialize();
		//var a = new Test();
		//Importer.printImports();
		}
		var url=window.localStorage.url;
		history.replaceState(url, url, url);
		//Importer.get(['Aweiss.Test'], ready);
		Importer.addScripts(["Aweiss.AjaxLoader.AjaxLoader", "Aweiss.AjaxLoader.PageManager", "Aweiss.AjaxLoader.Page", "Aweiss.AjaxLoader.DataManager", 
		"Aweiss.AjaxLoader.Animator", "Aweiss.Utils.Tools", "Aweiss.Events.EventManager", 
		"Aweiss.Events.BaseEvent", "Aweiss.AjaxLoader.Events.WindowLoadedEvent", "Aweiss.AjaxLoader.ManagedPage", 
		"http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js", "history/src/history.js", 
		"js_cols/base.js", "Aweiss.AjaxLoader.ResourceManager", "Aweiss.AjaxLoader.Frame", "Aweiss.AjaxLoader.FrameManager", 
		"Aweiss.Utils.Asserter", "Aweiss.Dom.Element", "Aweiss/DataStructures/DirectedGraph.js", "Aweiss.Events.DynamicEvent", 
		"scripty2/dist/s2.js", "js_cols/LinkedList.js", "js_cols/Queue.js", "Aweiss.AjaxLoader.Events.ResourceDownloadedEvent", 
		"Aweiss/DataStructures/LinkedList.js", "Aweiss.Utils.Exception"]);
		Importer.get(['Aweiss.AjaxLoader.AjaxLoader'], ready);
})();
