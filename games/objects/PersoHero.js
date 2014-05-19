/*
	HERO
	Gère le personnage principal
*/

var PersoHero = function (lab){

	var perso = new Perso(lab);


	/*
		Initialisation des propriétés
	*/

	//	Position

		perso.position = chiffre_aleatoire(perso.lab.dimensions.totalCases);

	// Gestion des animations des déplacements

		perso.isMoving = false;


	/*
		Méthodes
	*/

	//	Déplacement

		// Déplacement vers le haut

		perso.avancerTop = function (){
			if(perso.lab.murs[perso.position][0] == 0){
		        perso.position = perso.position - perso.lab.dimensions.casesPerLine;
				perso.lab.moveMap(perso.position);
		    }
		};

		// Déplacement vers le bas

		perso.avancerBottom = function (){
			if(perso.lab.murs[perso.position][2] == 0){
		        perso.position = perso.position + perso.lab.dimensions.casesPerLine;
				perso.lab.moveMap(perso.position);
		    }
		};

		// Déplacement vers la gauche

		perso.avancerLeft = function (){
			if(perso.lab.murs[perso.position][3] == 0){
		        perso.position--;
				perso.lab.moveMap(perso.position);
		    }
		};

		// Déplacement vers la droite

		perso.avancerRight = function (){
		    if(perso.lab.murs[perso.position][1] == 0){
		    	perso.position++;
		    	perso.lab.moveMap(perso.position);
		    }
		};



	/*
		Gestion des évènements
	*/

	//	Evènements du clavier

	$(window).keydown(function (event){
		if(perso.isMoving != true){
			//perso.isMoving = true;
			var touche = event.keyCode;
			switch(touche){
				case 39:
					perso.avancerRight();
				break;
				case 37:
					perso.avancerLeft();
				break;
				case  38:
					perso.avancerTop();
				break;
				case 40:
					perso.avancerBottom();
				break;
			}
		}
	});

	

	return perso;

}