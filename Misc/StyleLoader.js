var nameSpace = "Aweiss";
var className ='StyleLoader';

var fullName = nameSpace + '.' + className;
Namespace(fullName);

Importer.getList(['Aweiss.Style', 'Aweiss.Tools'], fullName, ready);

Aweiss.StyleLoader = function() {
	
	var loadingSheets = 0;
	var sheets = new Array();
	
	function removeSheet(styleSheet) {
		styleSheet.style.parentNode.removeChild(styleSheet.style);

		var numberToRemove = 0;

		for ( var i = 0; i < sheets.length; i++) {
			var sheet = sheets[i];
			if (sheet.name == styleSheet.name) {
				numberToRemove = sheet.number;
				sheets.splice(i, 1);
				break;
			}
		}

		for ( var i = 0; i < sheets.length; i++) {
			
			var sheet=sheets[i];
			var sheetNumber = sheets.number;

			if (sheetNumber > numberToRemove) {
				sheet.number--;
			} else if (sheetNumber == numberToRemove) {
				sheet.number = null;
			}
		}
	}

	function getSheet(name) {
		for (var i=0;i<sheets.length;i++) {
			var sheet = sheets[i];
			if (sheet.name == name) {
				return sheet;
			}
		}
	}
	
	this.addBaseStyle = function(name, data) {
		loadingSheets += 1;
		this.addStyle(name, data, function() {
			loadingSheets -= 1;
		});
	};
	
	this.addStyle = function(name, data, callBack) {
		var sheetToBeRemoved = getSheet(name);
		if (sheetToBeRemoved) {
			removeSheet(sheetToBeRemoved, name);
			// sheetToBeRemoved.disabled=true;
			// var sheetParent = sheetToBeRemoved.parentNode;
			// sheetParent.removeChild(sheetToBeRemoved);
		}

		var content = Jemplate.process(name, data);
		var rules = document.createTextNode(content);
		var myStyle = document.createElement('style');
		// myStyle.type = 'text/css';
		myStyle.setAttribute('type', 'text/css');
		var sheetNumber = document.styleSheets.length;

		var mySheet = new Style(name, sheetNumber, myStyle);
		sheets.push(mySheet);
		var head = document.getElementsByTagName('head')[0];

		var isLoaded = window.setInterval(function() {
			if(Tools.ie>8||Tools.ie === undefined){
				try {
				if (sheets.indexOf(mySheet) == -1 || myStyle.sheet.cssRules) { // sheet.cssRules <--- MAGIC: only populated when file is loaded
				clearInterval(isLoaded); // either sheet must have already been removed or its there.
				//if(myStyle.sheet.cssRules){
					callBack();
			//	}
			} 
			else {
				//alert('error');
			}
				} catch (e) {
					//alert('not ready');
				}
			}
			else if(Tools.ie<=8){
				if (sheets.indexOf(mySheet) == -1 || myStyle.styleSheet.rules) { // sheet.cssRules <--- MAGIC: only populated when file is loaded
					clearInterval(isLoaded); // either sheet must have already been removed or its there.
					callBack();
				} 
				else {
					//alert('error');
				}
			}
		}, 1);
		
		if(Tools.ie<9)
		{ // IE(i.e. stupid browsers) does(do) it this way
			document.documentElement.firstChild.appendChild(myStyle);
			//head.appendChild(myStyle); // got to append css first or
			// else crash if css contains
			// @import
			// http://www.phpied.com/dynamic-script-and-style-elements-in-ie/
			myStyle.styleSheet.cssText = rules.nodeValue;
		} 
		
		else if (myStyle.styleSheet) { // ie
			if (!Array.prototype.indexOf) {  
			    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {  
			        "use strict";  
			        if (this == null) {  
			            throw new TypeError();  
			        }  
			        var t = Object(this);  
			        var len = t.length >>> 0;  
			        if (len === 0) {  
			            return -1;  
			        }  
			        var n = 0;  
			        if (arguments.length > 0) {  
			            n = Number(arguments[1]);  
			            if (n != n) { // shortcut for verifying if it's NaN  
			                n = 0;  
			            } else if (n != 0 && n != Infinity && n != -Infinity) {  
			                n = (n > 0 || -1) * Math.floor(Math.abs(n));  
			            }  
			        }  
			        if (n >= len) {  
			            return -1;  
			        }  
			        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);  
			        for (; k < len; k++) {  
			            if (k in t && t[k] === searchElement) {  
			                return k;  
			            }  
			        }  
			        return -1;  
			    };  
			} 
			document.documentElement.firstChild.appendChild(myStyle);
			//head.appendChild(myStyle); // got to append css first or
			// else crash if css contains
			// @import
			// http://www.phpied.com/dynamic-script-and-style-elements-in-ie/
			myStyle.styleSheet.cssText = rules.nodeValue;
		}

		else { // not ie
			myStyle.appendChild(rules);
			head.appendChild(myStyle);
		}

		//document.styleSheets.myStyle = myStyle;
	};

	this.allCssLoading = function(callback) {
		// alert('sheets loading at start'+loadingSheets);
		var fi = window.setInterval(function() {
			if (loadingSheets == 0) {
				// alert('no more loading sheets');
				clearInterval(fi);
				callback();
			} else {
				// alert('sheets still loading');
			}
		}, 1);
	};
};
	
function ready(model) {
	
}

