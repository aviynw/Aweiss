(function(){
	
var name='Aweiss.AjaxLoader.AjaxLoader';

var importList = ['Aweiss.AjaxLoader.PageManager', 'Aweiss.AjaxLoader.Page','Aweiss.AjaxLoader.DataManager', 'Aweiss.AjaxLoader.Animator'];

OOPS.DEFINE(name, Class, importList);

function Class() {
eval(this.magic);
(function(){
'use strict';
	
	Private.options={};
	Private.pageManager = null;
	Private.originalURL = '';
	
	
	Public.init = function(options) {
		var _ = this.magic ? eval(this.magic) : this;
		_.options=options;
		_.pageManager = new PageManager(new Animator());
	};
	
	Public.initialize = function() {
		var _ = this.magic ? eval(this.magic) : this;
		/*var div = document.createElement("div");
		 div.className += _.classes.foreground_page;
		 div.id = unescape(location.href);
		 while (document.body.firstChild) {
		 div.appendChild(document.body.firstChild);
		 }
		 _.initPage(div);
		 document.body.appendChild(div);
		 */
		var url = unescape(window.localStorage.url);
		//_.setPage(url, document.documentElement.outerHTML);
		//_.addPageToStage(url);
		//document.implementation.createHTMLDocument(title);
		/*history.replaceState({
			url : url
		}, url, url);*/
		
		_.originalURL = url;
		var page = _.pageManager.addPage(url);
		_.pageManager.setCurrentPage(url);
		/*
		 * var content = "<html>"+document.documentElement.innerHTML+"</html>";
		 * setPage(url, content); _.initPage();
		 */
		}
	
	Public.setOptions=function(options){
		var _ = this.magic ? eval(this.magic) : this;
		_.options=options;
	}})();
};

})();
