/*
	HERO
	Gère le personnage principal
*/

var PersoHero = function (lab){

	var perso = new Perso(lab);


	/*
		Initialisation des propriétés
	*/

	//	Identité

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
		    afterMoving(perso);
		};

		// Déplacement vers le bas

		perso.avancerBottom = function (){
			if(perso.lab.murs[perso.position][2] == 0){
		        perso.position = perso.position + perso.lab.dimensions.casesPerLine;
				perso.lab.moveMap(perso.position);
				afterMoving(perso);
		    }
		};

		// Déplacement vers la gauche

		perso.avancerLeft = function (){
			if(perso.lab.murs[perso.position][3] == 0){
		        perso.position--;
				perso.lab.moveMap(perso.position);
		    }
		    afterMoving(perso);
		};

		// Déplacement vers la droite

		perso.avancerRight = function (){
		    if(perso.lab.murs[perso.position][1] == 0){
		    	perso.position++;
		    	perso.lab.moveMap(perso.position);
		    }
		    afterMoving(perso);
		};

	// Gestion des attaques

		// Subir une attaque

		perso.attacked = function (degats){
			if(perso.life > 0){
				perso.life = perso.life - degats;
			}else{
				perso.die();
			}
		};

		// Mourrir

		perso.die = function (){
			//Mourir
			console.log('die');
		};



	/*
		Méthodes utilitaires
	*/

	//	Gestion de la luminosité

	perso.luminosite = function () {
		var distance_vue = 3;
	    var right = true;
	    var left = true;
	    var top = true;
	    var bottom = true;

	    var distance;

	    $('td div').css('opacity', 0);  /**** LIGNE A METTRE EN COMMENTAIRE SI ON VEUT QUE LES LUMIERES RESTENT APRES DECOUVERTE ****/

	    $('#case_' + perso.position).css('opacity', 1);

	    // RIGHT 
	    distance = -1;
	    for (j = perso.position + 1 ; j < perso.position + distance_vue ; j++)
	    {
	        distance ++;
	        if(perso.lab.dimensions.casesPerLine == j % perso.lab.dimensions.casesPerLine)
	        {
	            break;
	        }
	        if(j >= perso.lab.dimensions.totalCases)
	        {
	            break;
	        }
	        if(perso.lab.murs[j][3] == 1)
	        {
	            break;
	        }
	        if(perso.lab.murs[j][3] == 0 && right == true)
	        {
	            $('#case_' + j).css('opacity', 1 - (distance * 0.2));
	        }
	    }


	    // LEFT
	    distance = -1;
	    for (j = perso.position - 1 ; j > perso.position - distance_vue ; j--)
	    {
	        distance ++;
	        if(j < 0)
	        {
	            break;
	        }
	        if(perso.lab.murs[j][1] == 1)
	        {
	            break;
	        }
	        if(perso.lab.murs[j][1] == 0 && left == true)
	        {
	            $('#case_' + j).css('opacity', 1 - (distance * 0.2));
	        }
	        if(j % perso.lab.dimensions.casesPerLine == 0)
	        {
	            break;
	        }
	    }

	    // BOTTOM
	    distance = -1;
	    for (j = perso.position + perso.lab.dimensions.casesPerLine ; j < perso.position + (perso.lab.dimensions.casesPerLine * distance_vue) ; j = j + perso.lab.dimensions.casesPerLine)
	    {
	        distance ++;
	        if(j >= perso.lab.dimensions.totalCases)
	        {
	            break;
	        }
	        if(perso.lab.murs[j][0] == 1)
	        {
	            break;
	        }
	        if(perso.lab.murs[j][0] == 0 && bottom == true)
	        {
	            $('#case_' + j).css('opacity', 1 - (distance * 0.2));
	        }
	    }

	    // TOP
	    distance = -1;
	    for (j = perso.position - perso.lab.dimensions.casesPerLine ; j > perso.position - (perso.lab.dimensions.casesPerLine * distance_vue) ; j = j - perso.lab.dimensions.casesPerLine)
	    {
	        distance ++;
	        if(j < 0)
	        {
	            break;
	        }
	        if(perso.lab.murs[j][2] == 1)
	        {
	            break;
	        }
	        if(perso.lab.murs[j][2] == 0 && top == true)
	        {
	            $('#case_' + j).css('opacity', 1 - (distance * 0.2));
	        }
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

	//	Callbacks

		function afterMoving (perso){
			// Gestion des collisions
			perso.lab.collisions();

			// Gestion du mode online
			if(perso.lab.online = true){
				
			}
		};


	return perso;

}