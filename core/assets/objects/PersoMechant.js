/*
	MECHANT
	Permet la gestion d'un méchant basique
*/

var PersoMechant = function (lab, id, position){

	var perso = new PersoProta(lab, id, position);

	/*
		Propriétés
	*/

	//	Déplacacements

		perso.timer = setInterval(function(){perso.deplacement();}, 1000);

	/*
		Méthodes
	*/

	//	Déplacements

		perso.deplacement = function (){
			var mouvements = new Array();
		    if(perso.lab.murs[perso.position][0] == 0){
		        mouvements.push({x: 0, y: -1});
		    }
		    if(perso.lab.murs[perso.position][1] == 0){
		        mouvements.push({x: 1, y: 0});
		    }
		    if(perso.lab.murs[perso.position][2] == 0){
		        mouvements.push({x: 0, y: 1});
		    }
		    if(perso.lab.murs[perso.position][3] == 0){
		        mouvements.push({x: -1, y: 0});
		    }

		    var mouvement = mouvements[chiffre_aleatoire(mouvements.length)];

		    perso.moveOnMap(mouvement.x, mouvement.y, true);
		}


	return perso;

};