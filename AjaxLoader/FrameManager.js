(function() {

	var importList = ['http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js', {'Libs/js_cols/LinkedList.js':'Libs/js_cols/base.js'}, 'Aweiss.AjaxLoader.Frame', 'Aweiss.AjaxLoader.DataManager'];

	var name = 'Aweiss.AjaxLoader.FrameManager';

	OOPS.DEFINE(name, Class, importList);

	function Class() {
eval(this.magic);
(function(){
'use strict';
		Private.Static.counter=0;
		Private.Static.freeFrames=null;
		Private.Static.usedFrames=null;
		
		Public.Static.init=function(){
			var _ = this.magic ? eval(this.magic) : this;
			_.Static.usedFrames = new js_cols.LinkedList();
			_.Static.freeFrames = new js_cols.LinkedList();
			_.Static.createFrame();
		}
		
		Public.Static.release=function(frame){
			var _ = this.magic ? eval(this.magic) : this;
			var emptyNode = document.createElement('html');
			if(frame.document!=null){
				frame.document.replaceChild(emptyNode, frame.document.documentElement);
			}
			_.Static.freeFrames.addLast(frame);
			_.Static.usedFrames.remove(frame);
			DataManager.clearContext(frame.id);
		}
		
		Public.Static.getFrame=function(){
			var _ = this.magic ? eval(this.magic) : this;
			if(_.Static.freeFrames.size==0){
				_.Static.createFrame();
			}
			var frame = _.Static.freeFrames.removeLast();
			_.Static.usedFrames.addLast(frame);
			return frame
		}
		
		Private.Static.createFrame = function() {
			var _ = this.magic ? eval(this.magic) : this;
			var frame = new Frame(_.Static.counter++, null);
			_.Static.freeFrames.addLast(frame);
		}})();
	}
})(); 