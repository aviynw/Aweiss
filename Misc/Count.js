Namespace("Aweiss");

OOPS.whenReady('Aweiss.Count', ready);

Aweiss.Count = function() {
	var counter=0;
	
	this.count = function(){
		counter++;
		var newCount = counter;
		return newCount;
	};
	
};


function ready(model) {

};