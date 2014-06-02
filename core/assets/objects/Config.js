/*
	Variables de configuration
*/

var Config = {
	armes: {
		base: new Array(
			{
				name: "pistolet",
				img: "url.png",
				degats: 20,
				portee : 3
			},
			{
				name: "epee",
				img: "url.png",
				degats: 40,
				portee: 1
			}
		),
		addionnelles: new Array(

		)
	},
	personnages: {
		heros: {
			arbalette: "arbalete.png",
			epee: "epee.png",
			pistolet: "gun.png",
			hache: "hache.png",
			morgenstern: "morgenstern.png"
		},
		mechants: {
			basiques: new Array(
				{
					name: "Araignée",
					img: "araignee.png",
					degats: 10
				},
				{
					name: "Chauve Souris",
					img: "bat.png",
					degats: 20
				}
			),
			minautaure: {
				name: "Minautaure",
				img: "minautaure.png",
				degats: 30
			}
		}
	},
	urls: {
		assets: {
			img: {
				background: "../assets/img/background/",
				persos: "../assets/img/persos/"
			},
			musics: "../assets/musics/"
		}

	}
};



/*
	Fonctions utilitaires
*/

	//	Génération d'un chiffre aléatoire

	function chiffre_aleatoire(C){
		x = Math.floor(Math.random() * C);
	    return x;
	}


	// Animation rotation

	$.fn.animateRotate = function(angle, duration, easing, complete) {
	    var args = $.speed(duration, easing, complete);
	    var step = args.step;
	    return this.each(function(i, e) {
	        args.step = function(now) {
	            $.style(e, 'transform', 'rotate(' + now + 'deg)');
	            if (step) return step.apply(this, arguments);
	        };

	        $({deg: 0}).animate({deg: angle}, args);
	    });
	};



/*
	Objets utiles
*/

var socket = io.connect("http://localhost:1337");