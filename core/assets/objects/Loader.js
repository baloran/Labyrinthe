/*
	Méthode permettant de gérer la progression du chargement du jeu
*/


function Loader (){


	/*
		Propriétés
	*/

	this.phase = null;

	/*
		Méthodes
	*/

	//	Chargement des ressources

	this.loadAssets = function (){

		var that = this;
		this.phase = "Chargement des éléments graphiques";
		var queue = new createjs.LoadQueue();
 		queue.installPlugin(createjs.Sound);
		//queue.on("complete", handleComplete, this);
		queue.on("progress", function (event){that.progress(event.progress);}, this);
		queue.loadManifest([
		 	{id: "myImage1", src:"assets/img/carre_bas.png"},
		 	{id: "myImage2", src:"assets/img/carre_bas_gauche.png"},
		 	{id: "myImage3", src:"assets/img/carre_complet.png"},
		 	{id: "myImage4", src:"assets/img/carre_droite.png"},
		 	{id: "myImage5", src:"assets/img/carre_droite_bas.png"},
		 	{id: "myImage6", src:"assets/img/carre_droite_bas_gauche.png"},
		 	{id: "myImage7", src:"assets/img/carre_droite_gauche.png"},
		 	{id: "myImage8", src:"assets/img/carre_gauche.png"},
		 	{id: "myImage9", src:"assets/img/carre_haut.png"},
		 	{id: "myImage10", src:"assets/img/carre_haut_bas.png"},
		 	{id: "myImage11", src:"assets/img/carre_haut_droite.png"},
		 	{id: "myImage12", src:"assets/img/carre_haut_droite_bas.png"},
		 	{id: "myImage13", src:"assets/img/carre_haut_droite_gauche.png"},
		 	{id: "myImage14", src:"assets/img/carre_haut_gauche.png"},
		 	{id: "myImage15", src:"assets/img/carre_vide.png"}
		]);

	};

	// Débuter une nouvelle session de chargement

	this.startLoading = function (){

	}

	//	Mise à jour de l'interface graphique lors de la progression d'un chargement

	this.progress = function (progression){

		console.log(progression);

	}

}