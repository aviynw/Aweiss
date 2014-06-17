(function() {

	var importList = ['Aweiss.Events.EventManager', 'Aweiss.AjaxLoader.Page', 'Aweiss.Events.BaseEvent'];

	var name = 'Aweiss.AjaxLoader.Animator';

	OOPS.DEFINE(name, Class, importList);

	function Class() {
eval(this.magic);
(function(){
'use strict';
		Private.transitionAnimations = null;
		Private.events = {
			ANIMATION_DONE : 'ANIMATION_DONE'
		};
		
		Public.init = function() {
			var _ = this.magic ? eval(this.magic) : this;
			_.transitionAnimations = new S2.FX.Queue();
		}

		Public.transition = function(oldPage, newPage, callback) {
			var _ = this.magic ? eval(this.magic) : this;
			function done() {
				if (callback != null) {
					callback();
					EventManager.fire(new BaseEvent(_.events.ANIMATION_DONE));
				}
			};

			function init() {
				newPage.show();
				var effect = new S2.FX.Morph(oldPage.element, {
					style : 'opacity:0;',
					duration : 1.0,
					after : done,
					queue : _.transitionAnimations,
					position : 'end'
				});
				// activeAnimations.add(effect, {position:'end'});
				// activeAnimations.render((new Date()).getTime());
				effect.play();
				// effect.render(new Date);
			}

			if (_.transitionAnimations.active()) {
				EventManager.queueListener(_.events.ANIMATION_DONE, init);
			} else {
				init();
			}
		}

		Private.endAnimations = function() {
			var _ = this.magic ? eval(this.magic) : this;
			if (activeAnimations.active()) {
				var effects = activeAnimations.getEffects();
				var effectsToCancel = [];
				for (var i = 0; i < effects.length; i++) {
					effectsToCancel.push(effects[i]);
				}
				for (var i = 0; i < effectsToCancel.length; i++) {
					effectsToCancel[i].finish();
					// effectsToCancel[i].finish();
					// effectsToCancel[i].after();
					activeAnimations.remove(effectsToCancel[i]);
				}
			}
		}})();

		/*$$('div').each(function(box, i) {
		 box.morph('left:10px; right:10px', {
		 duration : 2,
		 delay : 0,
		 propertyTransitions : {
		 right : 'wobble',
		 left : 'wobble'
		 }
		 });
		 });
		 */
	}

})();


