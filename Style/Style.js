(function(){
	
var name='Aweiss.Style.Style';

var importList = null;

DEFINE(name, Class, importList);

function Class(){
	eval(this.eval);
	Public.name="";
	Public.number=null;
	Public.style=null;
	
Public.init=function(name, number, style) {
	var _ = this;
	_.name=name;
	_.number=number;
	_.style=style;
};
}
})();