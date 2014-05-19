function extend(ChildClass, ParentClass) {
	ChildClass.prototype = new ParentClass();
	ChildClass.prototype.constructor = ChildClass;
}

$(document).ready(function(){

	var lab = new Labyrinthe(300, 30);
	lab.construct();

});