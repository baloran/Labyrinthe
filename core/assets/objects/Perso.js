/*
	PERSO
	Gère un personnage, aussi bien au niveau graphique qu'algorithmique
*/

var Perso = function (lab){

	
	/*
		Propriétés
	*/

	//	Identité

		this.position = null;
		this.degat = 0;
		this.life = 100;


	//	Référence au labyrinthe

		this.lab = lab;


	/*
		Méthodes 
	*/

	// Rencontre

		this.meet = function (victime){
			victime.attacked(this.degats);
		};

	// Attaque

		this.attacked = function (degats){
			var html = this.html.css("background-color", "red");
			if(this.life > 0){
				this.life = this.life - degats;
			}else{
				this.die();
			}
		};

	// Mort

		this.die = function (){
			
		}



	

}