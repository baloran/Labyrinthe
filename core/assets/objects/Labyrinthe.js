/*
	
	LABYRINTHE
	---------------------------

		Objet permettant la création d'un Labyrinthe de jeu.
		Le labyrinthe est configurable et affichage.

*/


var Labyrinthe = function (totalCases, casesPerLine, level, online, callback){

	/*
		Propriétés
	*/

	//	Identite dans le jeu

		this.level = level;
		this.online = online;
		var that = this;

	//	Dimensions

		this.dimensions = {};
		this.dimensions.totalCases = totalCases;
		this.dimensions.casesPerLine = casesPerLine;
		this.dimensions.caseWidth = $(document).width()/15;


	//	Elements du labyrinthe

		this.constructState = new Array();
		this.constructFilAriane = new Array();
		this.constructVoisins = new Array();
		this.constructCheminement = new Array();
		this.murs = new Array();
		this.sortie = Math.floor(Math.random()*totalCases);


	//	Elements graphiques

		this.html = null;
		if(this.online == false){

		}

	//	Gestion des personnages

		this.heros = null;
		this.faim = 180000;
		this.persosPositions = new Array(totalCases);
		this.protagonistes = new Array();
		this.adversaires = new Array();

	// Gestion du timer

		this.timer = null;
		if(this.online == false){
			this.timer = setInterval(function(){
				that.mouvementsMechants(); 
				that.collisions();
				if(that.online == false){
					if(that.faim <= 0){
						that.heros.die();
					}else{
						that.faim = that.faim - 1000;
						var percentage = (that.faim/180000);
						$('#life-bar .life').css("width", $(window).width()*percentage);
						$('#life-bar span').html(that.faim/1000);
					}
				}
			}, 1000);
		}

	// Callback

		this.callback = callback;

	/*
		Méthodes
	*/

	//	Construction du labyrinthe

		this.construct = function (){

			this.html = "<table id='tableau'>";

		    for (i = 0; i < this.dimensions.totalCases; i++){

		        if(i % this.dimensions.casesPerLine == 0 && i !=0){
		            this.html = this.html + "<tr>";
		        }
		        
		        this.html = this.html + "<td><div id='case_" + i + "' class='case'></div></td>";
		        this.constructState[i] = false;
		        this.murs[i] = new Array();
		        for (t = 0; t < 4; t++){
		            this.murs[i][t] = 1;
		        }
		        
		        if(i % this.dimensions.casesPerLine == i - 1 && i !=0){
		            this.html = this.html + "</tr>";
		        }
		    }

		    this.html = this.html + "</table>";
		    $("#content").append(this.html);

		    labyrinthe(0, this);
		};

		this.launch = function (){
			// commentaire
			generatePersos(this);
			affichage(this);
		};


	//	Déplacement de la map

		this.moveMap = function (position){
			var map = $('#map');
			var x = position%this.dimensions.casesPerLine;
			var y = Math.floor(position/this.dimensions.casesPerLine);
			x = x - 7;
			y = y - Math.floor(($(window).height()/this.dimensions.caseWidth)/2);
			var perso = this.heros;
			map.animate({
				top: -y*this.dimensions.caseWidth,
				left: -x*(this.dimensions.caseWidth+0.8)
			}, mapEndedMoving(this));
		};

	// Personnages

		this.generateHeros = function (name){
			var width = $('td').width();
			this.heros = new PersoHero(this, name);
			var heros = this.heros;
			var dimensions = this.dimensions;
			$("#joueur").css({
				width: width - 6,
				height: width - 6,
				top: Math.floor(($(window).height()/dimensions.caseWidth)/2)*width+3,
				left: (($(window).width()/2) - width/2)+3
			});
			if(this.online != false){
				socket.post('/party/sendData',{
					'room': "Test", //this.online.room, // Obligatoire
					'type':'initPosition', // ce que tu envoie par exemple si c'est un mouvement
					'case': heros.position, // enfin tu fous ce que tu veut,
					'id': name
				});
			}
			this.moveMap(this.heros.position);
		}

		this.mouvementsMechants = function (){
			for(var i=0; i<this.protagonistes.length; i++){
				this.protagonistes[i].deplacement();
			}
		};

		this.collisions = function (){
			if(this.persosPositions[this.heros.position] != null){
				//console.log(this.persosPositions[this.heros.position]);
				this.persosPositions[this.heros.position].meet(this.heros);
			}
		};

		this.addAdversaire = function (id, position){
			var perso = new PersoProta(this, id, position);
			this.adversaires[id] = perso;
		};

		this.moveAdversaire = function (id, cell){
			var perso = this.adversaires[id];
			perso.moveToCell(cell);
		}

	




	/*
		Fonctions utilitaires
	*/

	//	Construction du labyrinthe

		function labyrinthe (k, l) {

			//console.log(k);
	    
		    //$('#case_' + k).css("background", "#0d0a02");
		    if(k == l.sortie)
		    {
		        $('#case_' + k).css("background", "#dd00dd");
		    }
		    l.constructState[k] = true;

		    case_suivante = trouver_voisins(k, l);

		    if(case_suivante == false)
		    {
		        l.constructFilAriane.pop();
		        case_suivante = l.constructFilAriane[l.constructFilAriane.length - 1];
		        if(case_suivante == l.constructFilAriane[0])
		        {
		        	$('td div').css('opacity', 1);
		        	affichage(l);
		            return;
		        }
		    }  
		        /********************************************************************************************************** 
		        SWITCH ENTRE CES DEUX LIGNES PERMET D'AVOIR UNE GENERATION SOIT DIRECTE, SOIT "DESSINEE" AU FUR ET A MESURE 
		        ***********************************************************************************************************/
		        //setTimeout('labyrinthe(case_suivante)', 5);
		        labyrinthe(case_suivante, l);
		}

		function trouver_voisins (k, l) {
	    
			voisin = new Array();
		    z = 0;
		    /* ON DETERMINE LES 4 VOISINS */
		    case_dessus = k - l.dimensions.casesPerLine;
		    case_droite = k + 1;
		    case_bas = k + l.dimensions.casesPerLine;
		    case_gauche = k - 1;


		    // TEST SI CHAQUE CASE EST NON EXPLOREE ET CONNECTABLE
		    if(l.constructState[case_dessus] == false && case_dessus >= 0)
		    {
		        voisin[z] = case_dessus;
		        z = z + 1;
		    }
		    if(l.constructState[case_droite] == false && (k % l.dimensions.casesPerLine) != l.dimensions.casesPerLine - 1)
		    {
		        voisin[z] = case_droite;
		        z = z + 1;
		    }
		    if(l.constructState[case_bas] == false && case_dessus <= l.dimensions.totalCases)
		    {
		        voisin[z] = case_bas;
		        z = z + 1;
		    }
		    if((l.constructState[case_gauche] == false && (k % l.dimensions.casesPerLine) != 0))
		    {
		        voisin[z] = case_gauche;
		        z = z + 1;
		    }


		    // SI ON EST DANS UN CUL DE SAC
		    if(voisin.length == 0)
		    {
		        return false;
		    }

		    // STOCK LE PLUS LONG CHEMIN DANS cheminement_long
		    if(l.constructFilAriane.length > l.constructCheminement.length)
		    {
		        for (f = 0; f <= l.constructFilAriane.length; f++)
		        {
		            l.constructCheminement[f] = l.constructFilAriane[f];
		        }
		    }


		    l.constructFilAriane.push(k);

		    
		    // CHOIX D'UNE DES CASES AU HASARD
		    case_suivante = voisin[chiffre_aleatoire(voisin.length)];
		    
		    // ON MODIFIE L'ASPECT GRAPHIQUE ET ON STOCKE LES NOUVEAUX MURS
		    switch(case_suivante) 
		    {
		        case case_dessus:
		        // $("#case_" + k).css('borderTop', '3px #0d0a02 solid');
		        // $("#case_" + case_suivante).css('borderBottom', '3px #0d0a02 solid');
		        l.murs[k][0] = 0;
		        l.murs[case_suivante][2] = 0;
		        break;

		        case case_droite:
		        // $("#case_" + k).css('borderRight', '3px #0d0a02 solid');
		        // $("#case_" + case_suivante).css('borderLeft', '3px #0d0a02 solid');
		        l.murs[k][1] = 0;
		        l.murs[case_suivante][3] = 0;
		        break;

		        case case_bas:
		        // $("#case_" + k).css('borderBottom', '3px #0d0a02 solid');
		        // $("#case_" + case_suivante).css('borderTop', '3px #0d0a02 solid');
		        l.murs[k][2] = 0;
		        l.murs[case_suivante][0] = 0;
		        break;

		        case case_gauche:
		        // $("#case_" + k).css('borderLeft', '3px #0d0a02 solid');
		        // $("#case_" + case_suivante).css('borderRight', '3px #0d0a02 solid');
		        l.murs[k][3] = 0;
		        l.murs[case_suivante][1] = 0;
		        break;
		    }
		    //lumiere();
		    return case_suivante;
		}

		function affichage (l){
		    var case_css = $('.case');
		    case_css.css('backgroundColor', '#0d0a02');
		    case_css.css('borderTopWidth', '3 px').css('borderRightWidth', '3 px').css('borderBottomWidth', '3 px').css('borderLeftWidth', '3 px');
		    case_css.css('borderTopStyle', 'solid').css('borderRightStyle', 'solid').css('borderBottomStyle', 'solid').css('borderLeftStyle', 'solid');
		    case_css.css('borderTopColor', '#063415').css('borderRightColor', '#063415').css('borderBottomColor', '#063415').css('borderLeftColor', '#063415');
		    $('#case_' + l.sortie).css("background", "#dd00dd");
		    for (i = 0; i < l.dimensions.totalCases; i++) 
		    {
		        if (l.murs[i][0] == 0)
		        {
		            $("#case_" + i).css('borderTop', '3px #0d0a02 solid');
		        }
		        if (l.murs[i][1] == 0)
		        {
		            $("#case_" + i).css('borderRight', '3px #0d0a02 solid');
		        }
		        if (l.murs[i][2] == 0)
		        {
		            $("#case_" + i).css('borderBottom', '3px #0d0a02 solid');
		        }
		        if (l.murs[i][3] == 0)
		        {
		            $("#case_" + i).css('borderLeft', '3px #0d0a02 solid');
		        }
		    }
		    var dimensions = l.dimensions;
		    $('.case').css({
				width: dimensions.caseWidth,
				height: dimensions.caseWidth
			});
		}

		function generatePersos (l){
			if(l.level != null && l.online == false){
				for(var i=0; i<l.level*3; i++){
					l.protagonistes[i] = new PersoMechant(l, "mechant"+i, chiffre_aleatoire(l.dimensions.totalCases));
				}
			}
		}

	// Netoyage

		this.clear = function (){
			clearInterval(this.timer);
			this.heros.clear();
			for (prop in this){this[prop]=null}
			$('#content').find('table').remove();
			$('#joueur').css("backgroundImage", "none");
			$('#characters').find('.perso').remove();
		}

	/*
		Callbacks
	*/ 

	// Map

		function mapEndedMoving(l){
			// Test de la fin du labyrinthe
			if(l.heros.position == l.sortie){
				l.callback(true);
			}
			l.heros.luminosite();
			l.heros.isMoving = false;
		}









	

}