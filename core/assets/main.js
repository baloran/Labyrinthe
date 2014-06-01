$(document).ready(function(){

	var laby = null;


	var socket = io.connect("http://localhost:1337");
	socket.on("connect",function(){
	// Room actuelle
	var currentRoom = false;

	// Récupération des rooms
	$.ajax({
		url: "http://localhost:1337/party/getRoom",
		method: "get",
		success: function (data){
			var html = "";
			for(var i=0; i<data.length; i++){
				html = html + '<li><a class="connect" href="'+data[i]+'">'+data[i]+'</a><a class="launch" href="'+data[i]+'">Launch</a></li>';
			}
			$('#rooms ul').append($(html));
		}
	});

	$(document).on("click","#rooms li .connect",function(e){
		e.preventDefault();
		var name = $(this).attr("href");
		socket.emit("join_room",{'room':name});
	});

	$(document).on("click", "#rooms li .launch", function (e){
		alert('vous allez lancer la partie');
		e.preventDefault();
		var g = {};
		lab = new Labyrinthe(300, 60, null, 6, true);
		$('#rooms').hide();
		$('#game').show();
		lab.construct();
		socket.post("/party/launch", {
			'mur':lab,
			'room': $(this).attr("href"),
		});
		laby = lab;
		laby.generateHeros();
		laby.launch();
		console.log(laby.dimensions);
	});


	socket.on("start_game",function (data){
		alert('hello');
		laby = new Labyrinthe(300, 60, null, 6, "host");
		$('#rooms').hide();
		$('#game').show();
		laby.murs = data.murs;
		laby.sortie = data.sortie;
		laby.html = data.html;
		laby.persosPosition = data.persosPosition;
		laby.protagonistes = data.protagonistes;
		$('#content').append($(data.html));
		laby.generateHeros();
		laby.launch();
		console.log(laby.dimensions);
	});

	socket.on("nouvel_utilisateur",function(data){
		console.log(data);
	});

	socket.on("room_created",function(data){
		$('#rooms ul').append('<li><a class="connect" href="'+data.room+'">'+data.room+'</a><a class="launch" href="'+data.room+'">Launch</a></li>');
	});

	// Socket.post("party/sendData",{"tes":"différents","object":"que tu veut envoyer"});
	$("tadiv").click(function(e){
		e.preventDefault();
		var room = "le nom de ta room(ou une variable)";
		socket.post('party/sendData',{
			'room': room, // Obligatoire
			'type':'movement', // ce que tu envoie par exemple si c'est un mouvement
			'direction':'left', // enfin tu fous ce que tu veut
		});
	});

	// Ici on recoit les data que le controller renvoit.
	// Pour utiliser plusieurs fonction à l'intérieur tu peut mettre des condition à l'interieur.
	socket.on("send_data",function(data){
		if (data.type == 'movement') { // tu peut verifier ce que tu veut
			// alors tu fais ce que tu veut
		}
	});

	});

	$('#rooms > a').click(function (e){
		var name = prompt("Veuillez choisir un nom pour la room");
		sessionStorage.setItem("room",name);
		socket.emit("new_room",{'room':name});
		$('#rooms ul').append('<li><a class="connect" href="'+name+'">'+name+'</a><a class="launch" href="'+name+'">Launch</a></li>');
		e.preventDefault();
	});

});
