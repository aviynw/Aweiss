(function() {

	var importList = ['Aweiss.Utils.Tools'];

	var name = 'Aweiss.Dom.Element';

	DEFINE(name, Class, importList);

	function Class() {
		eval(this.eval);
		Public.element=null;
		
		Public.Get.isOnStage = function() {
			eval(this.eval);
			return Tools.isInDocument(_.element);
	}
	}
})();
