(function(){
DEFINE('Aweiss.Utils.Tools', Class);

function Class(){
	eval(this.eval);
	/*if ( typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function(str) {
			return this.slice(0, str.length) == str;
		};
	}
*/
	Static.Public.Dimension = {
		WIDTH : "width",
		HEIGHT : "height",
		//BOTH : "both"
	};

Static.Public.escapeHTML=function(string){
		return string.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;');
  };
	
Static.Public.unescapeHTML=function(string){
	return string.replace(/&quot;/g, '"')
               .replace(/&gt;/g, '>')
               .replace(/&lt;/g, '<')
               .replace(/&amp;/g, '&');
  };
  	
Static.Public.escapeXML=function(string){
		return string.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/'/g, '@apos;')
               .replace(/"/g, '&quot;');
  };
	
Static.Public.unescapeXML=function(string){
	return string.replace(/&quot;/g, '"')
               .replace(/&gt;/g, '>')
               .replace(/&lt;/g, '<')
               .replace(/@apos;/g, "'")
               .replace(/&amp;/g, '&');
  };
  	
	Static.Public.ie = ( function() {
		var _ = this;

			var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');

			while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

			return v > 4 ? v : undef;

		}());
	
	Static.Public.filter=function(obj, test){
		var matches=[];
		for(var key in obj){
			var value = obj[key];
			if(test(value)){
				matches.push(value);
			}
		}
		return matches;
	}
	
	Static.Public.round=function(num, places){
		
	}
	
	Static.Public.addProperties=function(obj1, obj2, test) {
		obj2 = obj2 || [];

		var properties = Object.keys(obj2);
		for (var i = 0; i < properties.length; i++) {
			var propName = properties[i];
			pass = true;
			if (test != null && test(propName, obj2[propName]) == false) {
				pass = false;
			}
			if (pass) {
				obj1[propName] = obj2[propName];
			}
		}
	};
	
	Static.Public.getShortenedName = function (name) {
		var _ = this;
		var last = name.lastIndexOf(".");
		return name.substring(last + 1);
	};
	
	Static.Public.getParentNameSpace=function(parent, name){
		var _ = this;
		var lastDot= name.lastIndexOf('.');
		if(lastDot!=-1){
			name=name.substring(0, lastDot);
			return _model.getNameSpace(parent, name);
		}
		else{
			return parent;
		}
	}
	
	Static.Public.getNameSpace = function(parent, name) {
		var _ = this;
		var parts = name.split('.');
		var currentPart = '';

		for (var i = 0, length = parts.length; i < length; i++) {
			currentPart = parts[i];
			parent[currentPart] = parent[currentPart] || {};
			parent = parent[currentPart];
		}

		return parent;
	};
	
	Static.Public.executeFunctionByName = function(functionName, context /* , args */) {
		var _ = this;
		var args = Array.prototype.slice.call(arguments).splice(2);
		var namespaces = functionName.split(".");
		var func = namespaces.pop();
		for (var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		return context[func].apply(this, args);
	};
	
	
	Static.Public.isAutoHeight = function(element) {
		var _ = this;
		// http://gregpettit.ca/2012/jquery-check-if-element-has-auto-widthheight/
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

	Static.Public.getSiblingsHeight = function(e, debug) {
		var _ = this;
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
	 //can't now if to get hieght or width fo siblings, based on the context should call 
	 //'top':e.position().top+siblingsdimension.height ore.position().left+siblingsdimension.width
	/*Static.Public.getTruePosition=function(e, dimension, debug){  
		var _ = this;
		var siblingsdimension = _model.getSiblingsDimension(e, dimension, 'before');
		var truePosition
		switch (dimension) {
		case _model.Dimension.HEIGHT:
			 truePosition=e.position().top+siblingsdimension;
			break;
		case _model.Dimension.WIDTH:
			 truePosition=e.position().left+siblingsdimension;
			break;
		case _model.Dimension.BOTH:
			truePosition={
				'top':e.position().top+siblingsdimension.height,
				'left':e.position().left+siblingsdimension.width
		}
			return truePosition;
		}	
		};
	*/
	Static.Public.getSiblingsDimension = function(e, dimension, type, debug) {
		var _ = this;
		/*if(dimension==_model.Dimension.BOTH){
			var dimensions={
					'height':_model.getSiblingsDimension(e, _model.Dimension.HEIGHT, type, debug),
					'Width':_model.getSiblingsDimension(e, _model.Dimension.WIDTH, type, debug),
			}
			return dimensions;
		}
		else{*/
		if(!type){
			type='both'
		};
		if (debug) {
			alert('getting siblings For:' + e.attr('id'));
		}
		function match(index) {
			return (!(jQuery(this).css('position') == 'absolute') && jQuery(this).is(":visible"));
		}
		
		function todo(index) {
			var size = 0;
			switch (dimension) {

				case _model.Dimension.HEIGHT:
					size = Math.ceil(jQuery(this).outerHeight(true));
					break;

				case _model.Dimension.WIDTH:
					size = Math.ceil(jQuery(this).outerWidth(true));
					break;
			};
			siblingsDimension += size;

			if (debug) {
				alert('sibling: ' + index + jQuery(this).attr('id') + size);
			}
		//}
		};
		
		var siblingsDimension = 0;
		switch(type){
		case 'before':
			e.prevAll().filter(match).each(todo);
			break;
		case 'after':
			e.nextAll().filter(match).each(todo);
			break;
		case 'both':
			e.siblings().filter(match).each(todo);
			break;
		}
		if (debug) {
			alert('siblings: ' + siblingsDimension);
		}
		return siblingsDimension;
	};

	Static.Public.fill_rest = function(e, dimension, debug) {
		var _ = this;
		if (debug) {
			alert("element:" + e.attr('id'));
		}

		var originalParent = e.parent();
		var parent = originalParent;

		if (dimension == _model.Dimension.HEIGHT) {
			while (this.isAutoHeight(parent)) {
				parent = parent.parent();
			}
		}
		if (debug) {
			alert('Originalparent:' + originalParent.attr('id'));
			alert('Parent:' + parent.attr('id'));
		}
		var siblingsDimension = _model.getSiblingsDimension(e, dimension, debug);

		if (parent != originalParent) {
			siblingsDimension += _model.getSiblingsDimension(originalParent, dimension, debug);
		}
		var parentDimension;
		var borderStuff;
		var newDimension;

		switch (dimension) {
			case _model.Dimension.HEIGHT:
				parentDimension = Math.floor(parent.height());
				borderStuff = Math.ceil(e.outerHeight(true)) - Math.floor(e.height());
				break;
			case _model.Dimension.WIDTH:
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

			case _model.Dimension.HEIGHT:
				e.height(newDimension);
				break;
			case _model.Dimension.WIDTH:
				e.width(newDimension);
				break;
		}

	};

	Static.Public.verticallyCenter = function(e) {
		var _ = this;
		var halfSize = e.outerHeight() / 2;
		var parentHeight = e.parent().height();
		var top = (parentHeight / 2) - halfSize;
		e.css('top', top + 'px');
		e.css('position', 'relative');
	};

	Static.Public.verticallyCenterText = function(e) {
		var _ = this;
		var centerWrapperClass = 'center_wrapper';
		var outerDiv = jQuery(e).children(":first");
		if(outerDiv.length==0){
			e.wrapInner('<div class="'+centerWrapperClass+'"/>');
			outerDiv = jQuery(e).children(":first");
		}
		if (!outerDiv.hasClass(centerWrapperClass)) {
			outerDiv.addClass(centerWrapperClass);
		}
		_model.verticallyCenter(outerDiv);
	};

	Static.Public.hide = function(e) {
		var _ = this;
		e.css('visibility', 'hidden');
	};

	Static.Public.show = function(e) {
		var _ = this;
		e.css('visibility', 'visible');
	};

	Static.Public.fadeIn = function(e, duration, easing, callBack) {
		var _ = this;
		e.fadeTo(duration, 1, easing, callBack);
		_model.show(e);
		e.show(e);
	};

	Static.Public.fadeOut = function(e, duration, easing, callBack) {
		var _ = this;
		e.fadeTo(duration, 0, easing, callBack);
		_model.hide(e);
		e.hide();
	};

	Static.Public.getParam = function(name) {
		var _ = this;
		return _model.getParamFromString(_model.getHash(), name);
	};

	Static.Public.removeParam = function(name) {
		var _ = this;
		_model.setHash(removeParamFromString(_model.getHash(), name));
	};

	Static.Public.addParam = function(name, value) {
		var _ = this;
		_model.setHash(addParamToString(_model.getHash(), name, value, '#'));
	};

	Static.Public.removeParamFromString = function(string, name) {
		var _ = this;
		var toReplace = name + '=' + _model.getParamFromString(string, name);
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

	Static.Public.getParamFromString = function(string, name) {
		var _ = this;
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

	Static.Public.addParamToString = function(string, name, value, seperator) {
		var _ = this;
		if (!_model.getParamFromString(string, name)) {

			if (string.indexOf(seperator) != -1) {
				string += '&' + name + '=' + value;
			} else {
				string += seperator + name + '=' + value;
			}
		} else {
			string = _model.removeParamFromString(string, name);
			string = _model.addParamToString(string, name, value);
		}
		return string;
	};

	Static.Public.getParamsFromString = function(hash) {
		var _ = this;
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

	Static.Public.addParamsToString = function(string, params, seperator) {
		var _ = this;
		for (var param in params) {
			string = _model.addParamToString(string, param, params[param], seperator);
		}
		return string;
	};

	Static.Public.removeParamsFromString = function(string, params) {
		var _ = this;
		if (params instanceof Array) {
			for (var i = 0; i < params.length; i++) {
				string = _model.removeParamFromString(string, params[i]);
			}
		} else {//must be dictionary
			for (var param in params) {
				string = _model.removeParamFromString(string, param);
			}
		}
		return string;
	};

	Static.Public.addParams = function(params) {
		var _ = this;
		for (var param in params) {
			_model.addParam(getHash(), param);
		}
	};

	Static.Public.getParams = function() {
		var _ = this;
		return _model.getParamsFromString(getHash());
	};

	Static.Public.removeParams = function(params) {
		var _ = this;
		for (var param in params) {
			_model.removeParam(param);
		}
	};

	Static.Public.setHash = function(hash) {
		var _ = this;
		if (string.indexOf('#') != -1) {
			hash = '#' + hash;
		}
		window.location.hash = hash;
	};

	Static.Public.extractHash = function(string) {
		var _ = this;
		var position = string.indexOf('#');
		if (position == -1) {
			return null;
		} else {
			return string.substring(position + 1);
		}
	};
	
	Static.Public.extractDomain = function(string){
		var _ = this;
		var domain='';
		var parts = string.split('/');
		if(string.indexOf('://')>0){
			domain=parts[2];
		}
		else{
			domain=parts[0];
		}
		return domain;
	};
	
	Static.Public.isSameDomain = function(string){
		var _ = this;
		return(location.host==_model.extractDomain(string));
	};
	
	Static.Public.isLinkSameDomain = function(link){
		var _ = this;
		//return(_model.extractDomain(link.baseURI)==_model.extractDomain(link.href));
		return (location.host==link.host);
	};
	
	Static.Public.isLinkSameBase=function(link){
		var _ = this;
		return (_model.removeHash(location.href)==_model.removeHash(link.href));
	};
		
	Static.Public.getPage = function(string) {
		var _ = this;
		var position = string.indexOf('#');
		if (position == -1) {
			position = String.length;
		}
		var baseLink = string.substring(0, position);
	};
	
	Static.Public.removeHash = function(string){
		var _ = this;
		var newString =string.replace(_model.extractHash(string), '').replace('#', '');
		return newString;
	}
	
	Static.Public.getHash = function() {
		var _ = this;
		return decodeURIComponent(window.location.hash).substring(1);
	};

	Static.Public.hasOverFlow = function(element) {
		var _ = this;
		if (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth) {
			return true;
		} else {
			return false;
		}
	};
	
	Static.Public.modulateFontSize = function(element) {
		var _ = this;
		/*if(!_model.hasOverFlow(element)){
			while(!_model.hasOverFlow(element)){
				_model.increaseFontSizeBy(element, 1);
				if(_model.hasOverFlow(element)){
					_model.decreaseFontSizeBy(element, 1);
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
		
		if(_model.hasOverFlow(element)){
			jQuery(element).wrapInner('<div class="' + wrapperClass + '"/>');
			var wrapperDiv = jQuery(element).find('.'+wrapperClass);
			while(_model.hasOverFlow(element)){
				_model.decreaseFontSizeBy(wrapperDiv, 1);
		}
		}
	};
	
	Static.Public.increaseFontSizeBy = function(element, amount){
		var _ = this;
		jQuery(element).css('font-size', parseInt(jQuery(element).css('font-size').replace('px', '')) + amount);
	};
	
	Static.Public.decreaseFontSizeBy = function(element, amount){
		var _ = this;
		_model.increaseFontSizeBy(element, -1 * amount);
	};
	
	Static.Public.redraw = function(element){
		var _ = this;
	};
	
	Static.Public.changeAlpha = function(original, alpha){
		var _ = this;
		var parts = original.split(',');
		var newColor;
		if(parts[3]){
			parts[3]=alpha+')';
		}
		else{
			parts[2]=parts[2].replace(')', ','+alpha+')');
		}
		newColor = parts.join();
		return newColor;
	};
	
	Static.Public.getClass = function(object){
		  var _ = this;
		  return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
		};
	Static.Public.getWindowByName=function(name) {
		var _ = this;
		if (window.name == name) {
			return window;
		} else {
			var currentWindow = window;
			while (window.parent != currentWindow) {
				currentWindow = window.parent;
				if (currentWindow.name == name) {
					return currentWindow;
				}
			}
		}
	};
	
	Static.Public.isInDocument=function(el) {
    var _ = this;
    var html = document.body.parentNode;
    while (el) {
        if (el === html) {
            return true;
        }
        el = el.parentNode;
    }
    return false;
};

};
})();