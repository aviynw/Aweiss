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
  Static.Public.isString=function(obj) {
		return Object.prototype.toString.apply(obj) === '[object String]';
	}
  Static.Public.isObject=function(obj) {
		return Object.prototype.toString.apply(obj) === '[object Object]';
	}
  Static.Public.isFunction=function(obj) {
		return Object.prototype.toString.apply(obj) === '[object Function]';
	}
  Static.Public.isArray=function(obj) {
		return Object.prototype.toString.apply(obj) === '[object Array]';
	}
	Static.Public.ie = IE=function(v) {
			 var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
			 return r.test(navigator.userAgent);
	};
	Static.Public.crossAjaxJson=function(req) {
		var _=this;
		var newReq={}
		newReq.url=req.url;
		if(req.success) newReq.success=function(data) { req.success(JSON.parse(data)) }
		if(req.error) newReq.error=function(data) { req.error(JSON.parse(data)) }
		if(req.always) newReq.always=function() { 	req.always() }
		
		_.static.crossAjax(newReq)
		}

	Static.Public.crossAjax=function(req) {
		var _=this;
		var myLoc=window.location.href.match(/http:\/\/.*?\//gi)
		var reqLoc=req.url.match(/http:\/\/.*?\//gi)
		xOrigin=true
		
		if(myLoc && reqLoc) { if(myLoc[0]==reqLoc[0]) xOrigin=false;}
		
		var data=null;
		var error=null;
		var respond=function() {
			
			if(data && req.success) req.success(data)
			if(error && req.error) 	req.error(error)
			if(req.always) req.always()
		}
		if (_.static.ie() && xOrigin) {
			var xdr = new XDomainRequest();
            xdr.open("GET", req.url);
            xdr.timeout = 3000;
            
            xdr.onload= 	function() { data=xdr.responseText;	respond();};
	        xdr.onerror= 	function() { error="ERROR: XDomainRequest error"; respond();};
	        xdr.ontimeout= 	function() { error="ERROR: XDomainRequest timeout"; respond();};
	        xdr.onprogress=	function() { console.log("PROGRASS")};
            xdr.send();
		} else {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', req.url, true);
			xhr.timeout = 3000;
			xhr.responseType = 'text';
            xhr.onload= 	function() { if(xhr.status=='200') { data=xhr.responseText; } else error=xhr.responseText; respond();};
	        xhr.onerror= 	function() { error=xhr.responseText; respond();};
	        xhr.ontimeout= 	function() { error="ERROR: XMLHttpRequest timeout"; respond();};
			xhr.send();
		};
	}
	
	
	Static.Public.filter=function(obj, test){
		var _ = this;
		var matches=[];
		for(var key in obj){
			var value = obj[key];
			if(_.static.isObject(test)){
				var match=true;
				for(var propName in test){
					if(value[propName]!=test[propName]){
						match = false;
						}
				}
				if(match){
					matches.push(value);
				}
			}
			else{
				if(test(value)){
				matches.push(value);
			}
			}
		}
		return matches;
	};	
	Static.Public.values=function(obj){
	var values=[];
	for(key in obj) {
		var value=obj[key];
		values.push(value);
	    }
	return values;
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
			return _.static.getNameSpace(parent, name);
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
		var siblingsdimension = _.static.getSiblingsDimension(e, dimension, 'before');
		var truePosition
		switch (dimension) {
		case _.static.Dimension.HEIGHT:
			 truePosition=e.position().top+siblingsdimension;
			break;
		case _.static.Dimension.WIDTH:
			 truePosition=e.position().left+siblingsdimension;
			break;
		case _.static.Dimension.BOTH:
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
		/*if(dimension==_.static.Dimension.BOTH){
			var dimensions={
					'height':_.static.getSiblingsDimension(e, _.static.Dimension.HEIGHT, type, debug),
					'Width':_.static.getSiblingsDimension(e, _.static.Dimension.WIDTH, type, debug),
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

				case _.static.Dimension.HEIGHT:
					size = Math.ceil(jQuery(this).outerHeight(true));
					break;

				case _.static.Dimension.WIDTH:
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

		if (dimension == _.static.Dimension.HEIGHT) {
			while (this.isAutoHeight(parent)) {
				parent = parent.parent();
			}
		}
		if (debug) {
			alert('Originalparent:' + originalParent.attr('id'));
			alert('Parent:' + parent.attr('id'));
		}
		var siblingsDimension = _.static.getSiblingsDimension(e, dimension, debug);

		if (parent != originalParent) {
			siblingsDimension += _.static.getSiblingsDimension(originalParent, dimension, debug);
		}
		var parentDimension;
		var borderStuff;
		var newDimension;

		switch (dimension) {
			case _.static.Dimension.HEIGHT:
				parentDimension = Math.floor(parent.height());
				borderStuff = Math.ceil(e.outerHeight(true)) - Math.floor(e.height());
				break;
			case _.static.Dimension.WIDTH:
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

			case _.static.Dimension.HEIGHT:
				e.height(newDimension);
				break;
			case _.static.Dimension.WIDTH:
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
		_.static.verticallyCenter(outerDiv);
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
		_.static.show(e);
		e.show(e);
	};

	Static.Public.fadeOut = function(e, duration, easing, callBack) {
		var _ = this;
		e.fadeTo(duration, 0, easing, callBack);
		_.static.hide(e);
		e.hide();
	};

	Static.Public.getParam = function(name) {
		var _ = this;
		return _.static.getParamFromString(_.static.getHash(), name);
	};

	Static.Public.removeParam = function(name) {
		var _ = this;
		_.static.setHash(removeParamFromString(_.static.getHash(), name));
	};

	Static.Public.addParam = function(name, value) {
		var _ = this;
		_.static.setHash(addParamToString(_.static.getHash(), name, value, '#'));
	};
	
	Static.Public.addProperties=function(obj1, obj2, test) {
		var _ = this;
		obj2 = obj2 || [];

		var properties = Object.keys(obj2);
		for (var i = 0; i < properties.length; i++) {
			var propName = properties[i];
			pass = false;
			if(test==null){
				pass=true;
			}
			else if (test(propName, obj2[propName])) {
				pass = true;
			}
			if (pass) {
				obj1[propName] = obj2[propName];
			}
		}
		
	};
	Static.Public.removeParamFromString = function(string, name) {
		var _ = this;
		var toReplace = name + '=' + _.static.getParamFromString(string, name);
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
		if (!_.static.getParamFromString(string, name)) {

			if (string.indexOf(seperator) != -1) {
				string += '&' + name + '=' + value;
			} else {
				string += seperator + name + '=' + value;
			}
		} else {
			string = _.static.removeParamFromString(string, name);
			string = _.static.addParamToString(string, name, value);
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
			string = _.static.addParamToString(string, param, params[param], seperator);
		}
		return string;
	};

	Static.Public.removeParamsFromString = function(string, params) {
		var _ = this;
		if (params instanceof Array) {
			for (var i = 0; i < params.length; i++) {
				string = _.static.removeParamFromString(string, params[i]);
			}
		} else {//must be dictionary
			for (var param in params) {
				string = _.static.removeParamFromString(string, param);
			}
		}
		return string;
	};

	Static.Public.addParams = function(params) {
		var _ = this;
		for (var param in params) {
			_.static.addParam(getHash(), param);
		}
	};

	Static.Public.getParams = function() {
		var _ = this;
		return _.static.getParamsFromString(getHash());
	};

	Static.Public.removeParams = function(params) {
		var _ = this;
		for (var param in params) {
			_.static.removeParam(param);
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
		return(location.host==_.static.extractDomain(string));
	};
	
	Static.Public.isLinkSameDomain = function(link){
		var _ = this;
		//return(_.static.extractDomain(link.baseURI)==_.static.extractDomain(link.href));
		return (location.host==link.host);
	};
	
	Static.Public.isLinkSameBase=function(link){
		var _ = this;
		return (_.static.removeHash(location.href)==_.static.removeHash(link.href));
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
		var newString =string.replace(_.static.extractHash(string), '').replace('#', '');
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
		/*if(!_.static.hasOverFlow(element)){
			while(!_.static.hasOverFlow(element)){
				_.static.increaseFontSizeBy(element, 1);
				if(_.static.hasOverFlow(element)){
					_.static.decreaseFontSizeBy(element, 1);
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
		
		if(_.static.hasOverFlow(element)){
			jQuery(element).wrapInner('<div class="' + wrapperClass + '"/>');
			var wrapperDiv = jQuery(element).find('.'+wrapperClass);
			while(_.static.hasOverFlow(element)){
				_.static.decreaseFontSizeBy(wrapperDiv, 1);
		}
		}
	};
	
	Static.Public.increaseFontSizeBy = function(element, amount){
		var _ = this;
		jQuery(element).css('font-size', parseInt(jQuery(element).css('font-size').replace('px', '')) + amount);
	};
	
	Static.Public.decreaseFontSizeBy = function(element, amount){
		var _ = this;
		_.static.increaseFontSizeBy(element, -1 * amount);
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