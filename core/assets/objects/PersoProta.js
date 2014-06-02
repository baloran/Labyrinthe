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

		var color = "red";
		if(perso.lab.online == false){color = "transparent"}

		perso.html = $('<div class="perso" id="'+this.id+'"></div>');
		var x = perso.position%perso.lab.dimensions.casesPerLine;
		var y = Math.floor(perso.position/perso.lab.dimensions.casesPerLine);
		perso.html.css({
			top: y*perso.lab.dimensions.caseWidth,
			left: x*(perso.lab.dimensions.caseWidth+1),
			width: perso.lab.dimensions.caseWidth-6,
			height: perso.lab.dimensions.caseWidth-6,
			backgroundColor: color
		});
		$('#characters').append(perso.html);
		perso.lab.persosPositions[perso.position] = perso;


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
					left: (positionX + x)*(perso.lab.dimensions.caseWidth+0.8)
				});
			}else{
				perso.html.css({
					top: y*perso.lab.dimensions.caseWidth,
					left: x*(perso.dimensions.caseWidth+0.8)
				});
			}
			var position = (positionY+y)*perso.lab.dimensions.casesPerLine+(positionX+x);
			perso.lab.persosPositions[perso.position] = null;
			perso.position = position;
			perso.lab.persosPositions[position] = perso;
		}

		perso.moveToCell = function (cell){
			console.log(cell);
			var x = parseInt(cell)%perso.lab.dimensions.casesPerLine;
			var y = Math.floor(parseInt(cell)/perso.lab.dimensions.casesPerLine);
			console.log(x+' | '+y);
			perso.html.animate({
				top: y*perso.lab.dimensions.caseWidth,
				left: x*(perso.lab.dimensions.caseWidth+0.8)
			});
		};

	// Mort

		perso.die = function (){
			console.log("mort");
			perso.html.remove();
			perso.lab.persosPositions[perso.position] = null;
		};



	return perso;

}