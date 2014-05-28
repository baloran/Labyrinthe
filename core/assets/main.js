$(document).ready(function(){
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
		alert('vous allez vous connecter à la room');
		e.preventDefault();
		socket.emit("new_room",{'room':'partie2'});
	});

	$(document).on("click", "#rooms li .launch", function (e){
		alert('vous allez lancer la partie');
		e.preventDefault();
		var g = {};
		lab = new Labyrinthe(300, 60, null, 6);
		$('#rooms').hide();
		$('#game').show();
		lab.construct();
		console.log(lab);
		socket.post("/party/launch", {'mur':JSON.stringify(lab.murs)});
	});


	socket.on("start_game",function (data){
		console.log(data);
	});

	socket.on('salut',function(data){
		console.log(data);
	})

	socket.on("launch_game", function (data){
		console.log(data);
	});

	});

	$('#rooms > a').click(function (e){
		var name = prompt("Veuillez choisir un nom pour la room");
		e.preventDefault();
	});

});
