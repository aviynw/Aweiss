(function() {

	var importList = ['Aweiss.Utils.Tools'];

	var name = 'Aweiss.Dom.Element';

	OOPS.DEFINE(name, Class, importList);

	function Class() {
eval(this.magic);
(function(){
'use strict';
		Public.element=null;
		
		Public.Get.isOnStage = function() {
			var _ = this.magic ? eval(this.magic) : this;
			return Tools.isInDocument(_.element);
	}})();
	}
})();
