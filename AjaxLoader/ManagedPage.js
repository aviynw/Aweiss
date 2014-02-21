(function() {

	var importList = ['Aweiss.AjaxLoader.DataManager', 'Aweiss.AjaxLoader.ResourceManager', 'Aweiss.AjaxLoader.Frame', 
	'Aweiss.AjaxLoader.FrameManager', 'Aweiss.Utils.Tools', 'Aweiss.Utils.Asserter', 
	'http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js'];

	var name = 'Aweiss.AjaxLoader.ManagedPage';

	DEFINE(name, Class, importList, {'extends':'Aweiss.AjaxLoader.Page'});

	function Class() {
		
	/*Public.addToBackground = function(){
		eval(this.eval);
		//debugger;
		_.bringToBackground();
		//_.render(true);
	}*/
	
	/*Public.remove = function() {
		eval(this.eval);
		_super.remove();
		/*_.clearMemory();
		FrameManager.release(_.frame);
		_.frame = null;
		_.removeFromStage();
	}*/
	
	/*Public.addToForeground = function(){
		eval(this.eval);
		_.bringToForeground();
		_.addToStage();
	}*/
	
	Public.bringToForeground = function() {
		eval(this.eval);
		if (_.isBackgroundPage) {
			_.element.removeClassName(_.classes.background_page);
		}
		_.element.addClassName(_.classes.foreground_page);
			_.setOpacity(1);
			_.show();
	}

	Public.bringToBackground = function() {
		eval(this.eval);
		if (_.isForegroundPage) {
			_.element.removeClassName(_.classes.foreground_page);
		}
		_.element.addClassName(_.classes.background_page);
		_.setOpacity(1);
		_.hide();
	}

	Public.Get.isBackgroundPage = function() {
		eval(this.eval);
		return _.element.hasClassName(_.classes.background_page);
	}

	Public.Get.isForegroundPage = function() {
		eval(this.eval);
		return _.element.hasClassName(_.classes.foreground_page);
	}
	
	}
	})();