(function() {

	var importList = ['Aweiss.Utils.Tools'];

	var name = 'Aweiss.Dom.Element';

	DEFINE(name, Class, importList);

	function Class(){
	eval(this.eval);
		Public.element=null;
		
		Public.Get.isOnStage = function() {
			var _ = this;
			return Tools.isInDocument(_.element);
	}
	}
})();
