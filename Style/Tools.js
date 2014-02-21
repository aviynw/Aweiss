(function(){
Namespace("Aweiss");

Importer.whenReady('Aweiss.Tools', ready);

Aweiss.Tools = function() {

};

function ready(model) {
	if ( typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function(str) {
			return this.slice(0, str.length) == str;
		};
	}

	model.ie = ( function() {

			var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');

			while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

			return v > 4 ? v : undef;

		}());

	model.Dimension = {
		WIDTH : "width",
		HEIGHT : "height"
	};

	model.executeFunctionByName = function(functionName, context /* , args */) {
		var args = Array.prototype.slice.call(arguments).splice(2);
		var namespaces = functionName.split(".");
		var func = namespaces.pop();
		for (var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		return context[func].apply(this, args);
	};

	model.isAutoHeight = function(element) {// http://gregpettit.ca/2012/jquery-check-if-element-has-auto-widthheight/
		// make a staging area for all our work.
		var autoHeight = false;
		/*
		 * jQuery('body').append('<div id="stage" style="position: absolute;
		 * height:500px; width:500px;"></div>'); // assume false by default var
		 * autoHeight = false; // clone the div and move it; get its height var
		 * clone = element.clone(true, true); clone.appendTo('#stage');
		 */
		var initialHeight = element.height();
		element.append('<div id="stage" style="height:10000px; width:10000px;"></div>');
		// destroy all the content and compare height
		// clone.html('');
		var currentHeight = element.height();
		if (currentHeight != initialHeight) {
			autoHeight = true;
		}

		// get that clone and its smelly duplicate ID out of the DOM!
		// clone.remove();
		jQuery('#stage').remove();
		return autoHeight;
	};

	model.getSiblingsHeight = function(e, debug) {
		if (debug) {
			alert('getting siblings For:' + e.attr('id'));
		}
		var siblingsHeight = 0;
		e.siblings().filter(function(index) {
			return (!(jQuery(this).css('position') == 'absolute') && jQuery(this).is(":visible"));
		}).each(function(index) {
			if (debug) {
				alert('sibling: ' + index + jQuery(this).attr('id') + jQuery(this).outerHeight(true));
			}
			siblingsHeight += jQuery(this).outerHeight(true);
		});
		if (debug) {
			alert('siblings: ' + siblingsHeight);
		}
		return siblingsHeight;
	};

	model.getSiblingsDimension = function(e, dimension, debug) {
		if (debug) {
			alert('getting siblings For:' + e.attr('id'));
		}
		var siblingsDimension = 0;
		e.siblings().filter(function(index) {
			return (!(jQuery(this).css('position') == 'absolute') && jQuery(this).is(":visible"));
		}).each(function(index) {
			var size = 0;
			switch (dimension) {

				case model.Dimension.HEIGHT:
					size = Math.ceil(jQuery(this).outerHeight(true));
					break;

				case model.Dimension.WIDTH:
					size = Math.ceil(jQuery(this).outerWidth(true));
					break;
			};
			siblingsDimension += size;

			if (debug) {
				alert('sibling: ' + index + jQuery(this).attr('id') + size);
			}
		});
		if (debug) {
			alert('siblings: ' + siblingsDimension);
		}
		return siblingsDimension;
	};

	model.fill_rest = function(e, dimension, debug) {
		if (debug) {
			alert("element:" + e.attr('id'));
		}

		var originalParent = e.parent();
		var parent = originalParent;

		if (dimension == model.Dimension.HEIGHT) {
			while (this.isAutoHeight(parent)) {
				parent = parent.parent();
			}
		}
		if (debug) {
			alert('Originalparent:' + originalParent.attr('id'));
			alert('Parent:' + parent.attr('id'));
		}
		var siblingsDimension = model.getSiblingsDimension(e, dimension, debug);

		if (parent != originalParent) {
			siblingsDimension += model.getSiblingsDimension(originalParent, dimension, debug);
		}
		var parentDimension;
		var borderStuff;
		var newDimension;

		switch (dimension) {
			case model.Dimension.HEIGHT:
				parentDimension = Math.floor(parent.height());
				borderStuff = Math.ceil(e.outerHeight(true)) - Math.floor(e.height());
				break;
			case model.Dimension.WIDTH:
				parentDimension = Math.floor(parent.width());
				borderStuff = Math.ceil(e.outerWidth(true)) - Math.floor(e.width());
				break;
		}

		var newDimension = parentDimension - siblingsDimension - borderStuff;

		if (debug) {
			alert('TotalSiblings: ' + siblingsDimension);
			alert('parent:' + parentDimension);
			alert("border stuff:" + borderStuff);
			alert('new' + dimension + ':' + (newDimension));
		}
		switch (dimension) {//not sure why the -1 is needed, but seems needed for firefox and ie9.

			case model.Dimension.HEIGHT:
				e.height(newDimension);
				break;
			case model.Dimension.WIDTH:
				e.width(newDimension);
				break;
		}

	};

	model.verticallyCenter = function(e) {
		var halfSize = e.outerHeight() / 2;
		var parentHeight = e.parent().height();
		var top = (parentHeight / 2) - halfSize;
		e.css('top', top + 'px');
		e.css('position', 'relative');
	};

	model.verticallyCenterText = function(e) {
		var centerWrapperClass = 'center_wrapper';
		var outerDiv = jQuery(e).children(":first");
		if(outerDiv.length==0){
			e.wrapInner('<div class="'+centerWrapperClass+'"/>');
			outerDiv = jQuery(e).children(":first");
		}
		if (!outerDiv.hasClass(centerWrapperClass)) {
			outerDiv.addClass(centerWrapperClass);
		}
		model.verticallyCenter(outerDiv);
	};

	model.hide = function(e) {
		e.css('visibility', 'hidden');
	}

	model.show = function(e) {
		e.css('visibility', 'visible');
	}

	model.fadeIn = function(e, duration, easing, callBack) {
		e.fadeTo(duration, 1, easing, callBack);
		model.show(e);
		e.show(e);
	}

	model.fadeOut = function(e, duration, easing, callBack) {
		e.fadeTo(duration, 0, easing, callBack);
		model.hide(e);
		e.hide();
	}

	model.getParam = function(name) {
		return model.getParamFromString(model.getHash(), name);
	};

	model.removeParam = function(name) {
		model.setHash(removeParamFromString(model.getHash(), name));
	};

	model.addParam = function(name, value) {
		model.setHash(addParamToString(model.getHash(), name, value, '#'));
	};

	model.removeParamFromString = function(string, name) {
		var toReplace = name + '=' + model.getParamFromString(string, name);
		var indexOf = string.indexOf(toReplace);
		var newString = string;
		if (indexOf != -1) {
			newString = string.replace(toReplace, '');
			if (newString.charAt(indexOf - 1) == "&") {
				newString = newString.substring(0, indexOf - 1) + newString.substring(indexOf);
			}
			else if (newString.charAt(indexOf) == "&") {
				newString = newString.substring(0, indexOf) + newString.substring(indexOf + 1);
			}
		}
		return newString;
	};

	model.getParamFromString = function(string, name) {
		var hash = string;
		if (!hash) {
			return null;
		}
		var position = hash.indexOf(name);
		if (position == -1) {
			return null;
		}
		var nextParam = hash.indexOf('&', position);
		if (nextParam == -1) {
			nextParam = hash.length;
		}
		var valuePosition = position + name.length + 1;
		var param = hash.substring(valuePosition, nextParam);
		return param;
	};

	model.addParamToString = function(string, name, value, seperator) {
		if (!model.getParamFromString(string, name)) {

			if (string.indexOf(seperator) != -1) {
				string += '&' + name + '=' + value;
			} else {
				string += seperator + name + '=' + value;
			}
		} else {
			string = model.removeParamFromString(string, name);
			string = model.addParamToString(string, name, value);
		}
		return string;
	}

	model.getParamsFromString = function(hash) {
		if (!hash) {
			return null;
		}
		var Params = {};
		var pairs = [];
		if (hash.indexOf('&') != -1) {
			pairs = hash.split('&');
		} else {
			pairs[0] = hash;
		}
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];
			var mapping = pair.split('=');
			Params[mapping[0]] = mapping[1];
		}
		return Params;
	};

	model.addParamsToString = function(string, params, seperator) {
		for (var param in params) {
			string = model.addParamToString(string, param, params[param], seperator);
		}
		return string;
	};

	model.removeParamsFromString = function(string, params) {
		if (params instanceof Array) {
			for (var i = 0; i < params.length; i++) {
				string = model.removeParamFromString(string, params[i]);
			}
		} else {//must be dictionary
			for (var param in params) {
				string = model.removeParamFromString(string, param);
			}
		}
		return string;
	};

	model.addParams = function(params) {
		for (var param in params) {
			model.addParam(getHash(), param);
		}
	};

	model.getParams = function() {
		return model.getParamsFromString(getHash());
	};

	model.removeParams = function(params) {
		for (var param in params) {
			model.removeParam(param);
		}
	};

	model.setHash = function(hash) {
		if (string.indexOf('#') != -1) {
			hash = '#' + hash;
		}
		window.location.hash = hash;
	};

	model.extractHash = function(string) {
		var position = string.indexOf('#');
		if (position == -1) {
			return null;
		} else {
			return string.substring(position + 1);
		}
	};
	
	model.getPage = function(string) {
		var position = string.indexOf('#');
		if (position == -1) {
			position = String.length;
		}
		var baseLink = string.substring(0, position);
	};

	model.getHash = function() {
		return decodeURIComponent(window.location.hash).substring(1);
	}

	model.hasOverFlow = function(element) {
		if (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth) {
			return true;
		} else {
			return false;
		}

	}
	model.modulateFontSize = function(element) {
		/*if(!model.hasOverFlow(element)){
			while(!model.hasOverFlow(element)){
				model.increaseFontSizeBy(element, 1);
				if(model.hasOverFlow(element)){
					model.decreaseFontSizeBy(element, 1);
					break;
				}
			}
		}
		*/
		var wrapperClass= 'font_size_wrapper';
		
		if(jQuery(element).has('.'+ wrapperClass).length>0){
			var wrapperDiv = jQuery(element).find('.'+wrapperClass);
			var parentDiv = wrapperDiv.parent();
			parentDiv.html(wrapperDiv.html());
		}
		
		if(model.hasOverFlow(element)){
			jQuery(element).wrapInner('<div class="' + wrapperClass + '"/>');
			var wrapperDiv = jQuery(element).find('.'+wrapperClass);
			while(model.hasOverFlow(element)){
				model.decreaseFontSizeBy(wrapperDiv, 1);
		}
		}
	}
	
	model.increaseFontSizeBy = function(element, amount){
		jQuery(element).css('font-size', parseInt(jQuery(element).css('font-size').replace('px', '')) + amount);
	}
	
	model.decreaseFontSizeBy = function(element, amount){
		model.increaseFontSizeBy(element, -1 * amount);
	}
	
	model.redraw = function(element){
  }

}
})();
