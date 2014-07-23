(function(){
OOPS.DEFINE('Aweiss.Utils.Tools', Class);

function Class() {
eval(this.magic);
(function(){
'use strict';
	/*if ( typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function(str) {
			return this.slice(0, str.length) == str;
		};
	}
*/
	Public.Static.Dimension = {
		WIDTH : "width",
		HEIGHT : "height",
		//BOTH : "both"
	};

Public.Static.escapeHTML=function(string){
		return string.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;');
  };
	
Public.Static.unescapeHTML=function(string){
	return string.replace(/&quot;/g, '"')
               .replace(/&gt;/g, '>')
               .replace(/&lt;/g, '<')
               .replace(/&amp;/g, '&');
  };
  	
Public.Static.escapeXML=function(string){
		return string.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/'/g, '@apos;')
               .replace(/"/g, '&quot;');
  };
	
Public.Static.unescapeXML=function(string){
	return string.replace(/&quot;/g, '"')
               .replace(/&gt;/g, '>')
               .replace(/&lt;/g, '<')
               .replace(/@apos;/g, "'")
               .replace(/&amp;/g, '&');
  };
  Public.Static.isString=function(obj) {
		return Object.prototype.toString.apply(obj) === '[object String]';
	}
  Public.Static.isObject=function(obj) {
		return Object.prototype.toString.apply(obj) === '[object Object]';
	}
  Public.Static.isFunction=function(obj) {
		return Object.prototype.toString.apply(obj) === '[object Function]';
	}
  Public.Static.isArray=function(obj) {
		return Object.prototype.toString.apply(obj) === '[object Array]';
	}
	
  Public.Static.Get.ie =function(v) {
		var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');

		while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

		return v > 4 ? v : undef;
	};
	
	Public.Static.crossAjaxJson=function(req) {
		var _ = this.magic ? eval(this.magic) : this;
        var success=req.success;
        var error= req.error;
        var always=req.always;
		if(req.success) req.success=function(data) {
			console.log('success');
			success(JSON.parse(data));
			};
		if(req.error) req.error=function(data) {
			console.log('error');
			error(JSON.parse(data));
			};
		if(req.always) req.always=function() {
			console.log('always');
			always() ;
			};
		
		_.Static.crossAjax(req);
		};

	Public.Static.crossAjax=function(req) {//POST DATA DOESNT WORK WITH IE<9
		var _ = this.magic ? eval(this.magic) : this;
		var myLoc=window.location.href.match(/http:\/\/.*?\//gi)
		var reqLoc=req.url.match(/http:\/\/.*?\//gi)
		var xOrigin=true
		
		if(myLoc && reqLoc) { if(myLoc[0]==reqLoc[0]) xOrigin=false;}
		
		var data=null;
		var error=null;
		var respond=function() {
			
			if(data && req.success) req.success(data)
			if(error && req.error) 	{
				console.log(error);
				req.error(error);
			}
			if(req.always) {
				req.always();
			}
		}
		if (_.Static.ie>=6 && _.Static.ie<=9  && xOrigin) {
			var xdr = new XDomainRequest();
            xdr.open("GET", req.url);
            xdr.timeout = 99000;
            
            xdr.onload= 	function() { data=xdr.responseText;	respond();};
	        xdr.onerror= 	function() { error="ERROR: XDomainRequest error"; respond();};
	        xdr.ontimeout= 	function() { error="ERROR: XDomainRequest timeout"; respond();};
	        xdr.onprogress=	function() { console.log("PROGRASS")};
            xdr.send();
		} else {
            if(_.Static.inNode&&req.url.indexOf('://')==-1) {
                var fs = require('fs');
                fs.readFile(window.location._url.path.split('/').slice(1, -1).join('/') + req.url, 'utf8',function (err, response) {
                    if (err) {
                        throw err;
                    }
                    data=response;
                    respond();
                });
            }
            else {
                var xhr = new XMLHttpRequest();
                if(!req.post){
                    xhr.open('GET', req.url, true);
                }
                else{
                    xhr.open('POST', req.url, true);
                }
                xhr.timeout = 99000;
                xhr.responseType = 'text';
                xhr.onload = function () {
                    if (xhr.status == '200') {
                        data = xhr.responseText;
                    } else error = xhr.responseText;
                    respond();
                };
                xhr.onerror = function () {
                    error = xhr.responseText;
                    respond();
                };
                xhr.ontimeout = function () {
                    error = "ERROR: XMLHttpRequest timeout";
                    respond();
                };
                if(!req.post){
                    xhr.send();
                }
                else{
                    xhr.send(JSON.stringify(req.post));
                }
            }
        }
        ;
    };
	
	Public.Static.Get.inNode=function(){
        return (typeof exports !== 'undefined' && this.exports !== exports)
    }
	Public.Static.filter=function(obj, test){
		var _ = this.magic ? eval(this.magic) : this;
		var matches=[];
		for(var key in obj){
			var value = obj[key];
			if(_.Static.isObject(test)){
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
	Public.Static.values=function(obj){
	var values=[];
	for(var key in obj) {
		var value=obj[key];
		values.push(value);
	    }
	return values;
	}
	
	Public.Static.round=function(num, places){
		
	};
	
	Public.Static.addProperties=function(obj1, obj2, test) {
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
	
	Public.Static.getShortenedName = function (name) {
		var _ = this.magic ? eval(this.magic) : this;
		var last = name.lastIndexOf(".");
		return name.substring(last + 1);
	};
	
	Public.Static.getParentNameSpace=function(parent, name){
		var _ = this.magic ? eval(this.magic) : this;
		var lastDot= name.lastIndexOf('.');
		if(lastDot!=-1){
			name=name.substring(0, lastDot);
			return _.Static.getNameSpace(parent, name);
		}
		else{
			return parent;
		}
	}
	
	Public.Static.getNameSpace = function(parent, name) {
		var _ = this.magic ? eval(this.magic) : this;
		var parts = name.split('.');
		var currentPart = '';

		for (var i = 0, length = parts.length; i < length; i++) {
			currentPart = parts[i];
			parent[currentPart] = parent[currentPart] || {};
			parent = parent[currentPart];
		}

		return parent;
	};
	
	Public.Static.executeFunctionByName = function(functionName, context /* , args */) {
		var _ = this.magic ? eval(this.magic) : this;
		var args = Array.prototype.slice.call(arguments).splice(2);
		var namespaces = functionName.split(".");
		var func = namespaces.pop();
		for (var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		return context[func].apply(this, args);
	};
	
	
	Public.Static.isAutoHeight = function(element) {
		var _ = this.magic ? eval(this.magic) : this;
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

	Public.Static.getSiblingsHeight = function(e, debug) {
		var _ = this.magic ? eval(this.magic) : this;
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
	/*Public.Static.getTruePosition=function(e, dimension, debug){  
		var _ = this.magic ? eval(this.magic) : this;
		var siblingsdimension = _.Static.getSiblingsDimension(e, dimension, 'before');
		var truePosition
		switch (dimension) {
		case _.Static.Dimension.HEIGHT:
			 truePosition=e.position().top+siblingsdimension;
			break;
		case _.Static.Dimension.WIDTH:
			 truePosition=e.position().left+siblingsdimension;
			break;
		case _.Static.Dimension.BOTH:
			truePosition={
				'top':e.position().top+siblingsdimension.height,
				'left':e.position().left+siblingsdimension.width
		}
			return truePosition;
		}	
		};
	*/
	Public.Static.getSiblingsDimension = function(e, dimension, type, debug) {
		var _ = this.magic ? eval(this.magic) : this;
		/*if(dimension==_.Static.Dimension.BOTH){
			var dimensions={
					'height':_.Static.getSiblingsDimension(e, _.Static.Dimension.HEIGHT, type, debug),
					'Width':_.Static.getSiblingsDimension(e, _.Static.Dimension.WIDTH, type, debug),
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

				case _.Static.Dimension.HEIGHT:
					size = Math.ceil(jQuery(this).outerHeight(true));
					break;

				case _.Static.Dimension.WIDTH:
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

	Public.Static.fill_rest = function(e, dimension, debug) {
		var _ = this.magic ? eval(this.magic) : this;
		if (debug) {
			alert("element:" + e.attr('id'));
		}

		var originalParent = e.parent();
		var parent = originalParent;

		if (dimension == _.Static.Dimension.HEIGHT) {
			while (this.static.isAutoHeight(parent)) {
				parent = parent.parent();
			}
		}
		if (debug) {
			alert('Originalparent:' + originalParent.attr('id'));
			alert('Parent:' + parent.attr('id'));
		}
		var siblingsDimension = _.Static.getSiblingsDimension(e, dimension, debug);

		if (parent != originalParent) {
			siblingsDimension += _.Static.getSiblingsDimension(originalParent, dimension, debug);
		}
		var parentDimension;
		var borderStuff;
		var newDimension;

		switch (dimension) {
			case _.Static.Dimension.HEIGHT:
				parentDimension = Math.floor(parent.height());
				borderStuff = Math.ceil(e.outerHeight(true)) - Math.floor(e.height());
				break;
			case _.Static.Dimension.WIDTH:
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

			case _.Static.Dimension.HEIGHT:
				e.height(newDimension);
				break;
			case _.Static.Dimension.WIDTH:
				e.width(newDimension);
				break;
		}

	};

	Public.Static.verticallyCenter = function(e) {
		var _ = this.magic ? eval(this.magic) : this;
		var halfSize = e.outerHeight() / 2;
		var parentHeight = e.parent().height();
		var top = (parentHeight / 2) - halfSize;
		e.css('top', top + 'px');
		e.css('position', 'relative');
	};

	Public.Static.verticallyCenterText = function(e) {
		var _ = this.magic ? eval(this.magic) : this;
		var centerWrapperClass = 'center_wrapper';
		var outerDiv = jQuery(e).children(":first");
		if(outerDiv.length==0){
			e.wrapInner('<div class="'+centerWrapperClass+'"/>');
			outerDiv = jQuery(e).children(":first");
		}
		if (!outerDiv.hasClass(centerWrapperClass)) {
			outerDiv.addClass(centerWrapperClass);
		}
		_.Static.verticallyCenter(outerDiv);
	};

	Public.Static.hide = function(e) {
		var _ = this.magic ? eval(this.magic) : this;
		e.css('visibility', 'hidden');
	};

	Public.Static.show = function(e) {
		var _ = this.magic ? eval(this.magic) : this;
		e.css('visibility', 'visible');
	};

	Public.Static.fadeIn = function(e, duration, easing, callBack) {
		var _ = this.magic ? eval(this.magic) : this;
		e.fadeTo(duration, 1, easing, callBack);
		_.Static.show(e);
		e.show(e);
	};

	Public.Static.fadeOut = function(e, duration, easing, callBack) {
		var _ = this.magic ? eval(this.magic) : this;
		e.fadeTo(duration, 0, easing, callBack);
		_.Static.hide(e);
		e.hide();
	};

	Public.Static.getParam = function(name) {
		var _ = this.magic ? eval(this.magic) : this;
		return _.Static.getParamFromString(_.Static.getHash(), name);
	};

	Public.Static.removeParam = function(name) {
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.setHash(removeParamFromString(_.Static.getHash(), name));
	};

	Public.Static.addParam = function(name, value) {
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.setHash(_.Static.addParamToString(_.Static.getHash(), name, value, '#'));
	};
	
	Public.Static.addProperties=function(obj1, obj2, test) {
		var _ = this.magic ? eval(this.magic) : this;
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
	Public.Static.removeParamFromString = function(string, name) {
		var _ = this.magic ? eval(this.magic) : this;
		var toReplace = name + '=' + JSON.stringify(_.Static.getParamFromString(string, name));
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

	Public.Static.getParamFromString = function(string, name) {
		var _ = this.magic ? eval(this.magic) : this;
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
		return JSON.parse(param);
	};

	Public.Static.addParamToString = function(string, name, value, seperator) {
		var _ = this.magic ? eval(this.magic) : this;
        var stringValue=JSON.stringify(value);
		if (!_.Static.getParamFromString(string, name)) {

			if (string.indexOf(seperator) != -1) {
				string += '&' + name + '=' + stringValue;
			} else {
				string += seperator + name + '=' + stringValue;
			}
		} else {
			string = _.Static.removeParamFromString(string, name);
			string = _.Static.addParamToString(string, name, value, seperator);
		}
		return string;
	};

	Public.Static.getParamsFromString = function(hash) {
		var _ = this.magic ? eval(this.magic) : this;
		if (!hash) {
			return {};
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
			Params[mapping[0]] = JSON.parse(mapping[1]);
		}
		return Params;
	};

	Public.Static.addParamsToString = function(string, params, seperator) {
		var _ = this.magic ? eval(this.magic) : this;
		for (var param in params) {
			string = _.Static.addParamToString(string, param, params[param], seperator);
		}
		return string;
	};

	Public.Static.removeParamsFromString = function(string, params) {
		var _ = this.magic ? eval(this.magic) : this;
		if (params instanceof Array) {
			for (var i = 0; i < params.length; i++) {
				string = _.Static.removeParamFromString(string, params[i]);
			}
		} else {//must be dictionary
			for (var param in params) {
				string = _.Static.removeParamFromString(string, param);
			}
		}
		return string;
	};

	Public.Static.addParams = function(params) {
		var _ = this.magic ? eval(this.magic) : this;
		for (var param in params) {
			_.Static.addParam(_.getHash(), param);
		}
	};

	Public.Static.getParams = function() {
		var _ = this.magic ? eval(this.magic) : this;
		return _.Static.getParamsFromString(_.getHash());
	};

	Public.Static.removeParams = function(params) {
		var _ = this.magic ? eval(this.magic) : this;
		for (var param in params) {
			_.Static.removeParam(param);
		}
	};

	Public.Static.setHash = function(hash) {
		var _ = this.magic ? eval(this.magic) : this;
		window.location.hash = hash;
	};

	Public.Static.extractHash = function(string) {
		var _ = this.magic ? eval(this.magic) : this;
		var position = string.indexOf('#');
		if (position == -1) {
			return null;
		} else {
			return string.substring(position + 1);
		}
	};
	
	Public.Static.extractDomain = function(string){
		var _ = this.magic ? eval(this.magic) : this;
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
	
	Public.Static.isSameDomain = function(string){
		var _ = this.magic ? eval(this.magic) : this;
		return(location.host==_.Static.extractDomain(string));
	};
	
	Public.Static.isLinkSameDomain = function(link){
		var _ = this.magic ? eval(this.magic) : this;
		//return(_.Static.extractDomain(link.baseURI)==_.Static.extractDomain(link.href));
		return (location.host==link.host);
	};
	
	Public.Static.isLinkSameBase=function(link){
		var _ = this.magic ? eval(this.magic) : this;
		return (_.Static.removeHash(location.href)==_.Static.removeHash(link.href));
	};
		
	Public.Static.getPage = function(string) {
		var _ = this.magic ? eval(this.magic) : this;
		var position = string.indexOf('#');
		if (position == -1) {
			position = String.length;
		}
		var baseLink = string.substring(0, position);
	};
	
	Public.Static.removeHash = function(string){
		var _ = this.magic ? eval(this.magic) : this;
		var newString =string.replace(_.Static.extractHash(string), '').replace('#', '');
		return newString;
	}
	
	Public.Static.getHash = function() {
		var _ = this.magic ? eval(this.magic) : this;
		return decodeURIComponent(window.location.hash).substring(1);
	};

	Public.Static.hasOverFlow = function(element) {
		var _ = this.magic ? eval(this.magic) : this;
		if (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth) {
			return true;
		} else {
			return false;
		}
	};
	
	Public.Static.modulateFontSize = function(element) {
		var _ = this.magic ? eval(this.magic) : this;
		/*if(!_.Static.hasOverFlow(element)){
			while(!_.Static.hasOverFlow(element)){
				_.Static.increaseFontSizeBy(element, 1);
				if(_.Static.hasOverFlow(element)){
					_.Static.decreaseFontSizeBy(element, 1);
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
		
		if(_.Static.hasOverFlow(element)){
			jQuery(element).wrapInner('<div class="' + wrapperClass + '"/>');
			var wrapperDiv = jQuery(element).find('.'+wrapperClass);
			while(_.Static.hasOverFlow(element)){
				_.Static.decreaseFontSizeBy(wrapperDiv, 1);
		}
		}
	};
	
	Public.Static.increaseFontSizeBy = function(element, amount){
		var _ = this.magic ? eval(this.magic) : this;
		jQuery(element).css('font-size', parseInt(jQuery(element).css('font-size').replace('px', '')) + amount);
	};
	
	Public.Static.decreaseFontSizeBy = function(element, amount){
		var _ = this.magic ? eval(this.magic) : this;
		_.Static.increaseFontSizeBy(element, -1 * amount);
	};
	
	Public.Static.redraw = function(element){
		var _ = this.magic ? eval(this.magic) : this;
	};
	
	Public.Static.changeAlpha = function(original, alpha){
		var _ = this.magic ? eval(this.magic) : this;
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
	
	Public.Static.getClass = function(object){
		  var _ = this.magic ? eval(this.magic) : this;
		  return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
		};
	Public.Static.getWindowByName=function(name) {
		var _ = this.magic ? eval(this.magic) : this;
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
	
	Public.Static.isInDocument=function(el) {
    var _ = this.magic ? eval(this.magic) : this;
    var html = document.body.parentNode;
    while (el) {
        if (el === html) {
            return true;
        }
        el = el.parentNode;
    }
    return false;
}

    Public.Static.hashcode=function(skuObj){
        var _ = this.magic ? eval(this.magic) : this;
        var string="";
        for(var propName in skuObj){
            var value=skuObj[propName];
            if(value!=null){
                string+=skuObj[propName];
            }
        };
        string.replace(/\s/g, '');
        string.toUpperCase();
        var hash = 0;
        if (string.length == 0) return hash;
        for (i = 0; i < string.length; i++) {
            var char = string.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return  (hash >>> 0); //converts to positive
    };

})();

};
})();