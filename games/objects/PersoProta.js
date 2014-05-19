/*
	PROTAGONISTE
	Gère un personnage secondaire
*/

var PersoProta = function (lab, id, position){

	var perso = new Perso(lab);


	
	/*
		Propriétés
	*/

	//	Identité

		perso.id = id;
		perso.position = position;

	//	Affichage

		perso.html = $('<div class="perso" id="'+this.id+'"></div>');
		var x = perso.position%perso.lab.dimensions.casesPerLine;
		var y = Math.floor(perso.position/perso.lab.dimensions.casesPerLine);
		perso.html.css({
			top: y*perso.lab.dimensions.caseWidth,
			left: x*(perso.lab.dimensions.caseWidth+1),
			width: perso.lab.dimensions.caseWidth-6,
			height: perso.lab.dimensions.caseWidth-6
		});
		$('#characters').append(perso.html);


	/*
		Méthodes
	*/

	//	Déplacements

		perso.moveOnMap = function (x, y, animated){
			var positionX = perso.position%perso.lab.dimensions.casesPerLine;
			var positionY = Math.floor(perso.position/perso.lab.dimensions.casesPerLine);
			if(animated){
				perso.html.animate({
					top: (positionY + y)*perso.lab.dimensions.caseWidth,
					left: (positionX + x)*(perso.lab.dimensions.caseWidth+1)
				});
			}else{
				perso.html.css({
					top: y*perso.lab.dimensions.caseWidth,
					left: x*(perso.dimensions.caseWidth+1)
				});
			}
			var position = (positionY+y)*perso.lab.dimensions.casesPerLine+(positionX+x);
			perso.position = position;
		}



	return perso;

}