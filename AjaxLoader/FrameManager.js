(function() {

	var importList = ['http://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js', {'Libs/js_cols/LinkedList.js':'Libs/js_cols/base.js'}, 'Aweiss.AjaxLoader.Frame', 'Aweiss.AjaxLoader.DataManager'];

	var name = 'Aweiss.AjaxLoader.FrameManager';

	DEFINE(name, Class, importList);

	function Class(){
	eval(this.eval);
		Static.Private.counter=0;
		Static.Private.freeFrames=null;
		Static.Private.usedFrames=null;
		
		Static.Public.init=function(){
			var _ = this;
			_model.usedFrames = new js_cols.LinkedList();
			_model.freeFrames = new js_cols.LinkedList();
			_model.createFrame();
		}
		
		Static.Public.release=function(frame){
			var _ = this;
			var emptyNode = document.createElement('html');
			if(frame.document!=null){
				frame.document.replaceChild(emptyNode, frame.document.documentElement);
			}
			_model.freeFrames.addLast(frame);
			_model.usedFrames.remove(frame);
			DataManager.clearContext(frame.id);
		}
		
		Static.Public.getFrame=function(){
			var _ = this;
			if(_model.freeFrames.size==0){
				_model.createFrame();
			}
			var frame = _model.freeFrames.removeLast();
			_model.usedFrames.addLast(frame);
			return frame
		}
		
		Static.Private.createFrame = function() {
			var _ = this;
			var frame = new Frame(_model.counter++, null);
			_model.freeFrames.addLast(frame);
		}
	}
})(); 