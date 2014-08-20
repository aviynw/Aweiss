(function(){
var importList = ['Aweiss.Test.Test'];
OOPS.DEFINE('Aweiss.Test.Test4', Class, importList,{extends:'Aweiss.Test.Test3'});

function Class() {
eval(this.magic);
(function(){
'use strict';
	
	Public.Get.getterSuperTest=function(){
		var _ = this.magic ? eval(this.magic) : this;
		return _.super('Get.getterSuperTest');
	};

	Public.Set.getterSuperTest=function(){
		var _ = this.magic ? eval(this.magic) : this;
		return _.super('Set.getterSuperTest');
	};
})();
};
})();