$(document).ready(function(){
	var socket = io.connect("http://10.30.187.175:1337");
	socket.on("connect",function(){
	// Room actuelle 
	var currentRoom = false;

	// Récupération des rooms
	$.ajax({
		url: "http://10.30.187.175:1337/party/getRoom",
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
		socket.emit("new_room",{'room':'partie1'});
	});

	$(document).on("click", "#rooms li .launch", function (e){
		alert('vous allez lancer la partie');
		e.preventDefault();
		socket.emit("launch_room", {'room': 'partie1'});
	});
	
		socket.on("envoyer_message",function (data){
			console.log(data);
		});

		socket.on("launch_game", function (data){
			console.log(data);
		});
	});

	$('#rooms > a').click(function (e){
		var name = prompt("Veuillez choisir un nom pour la room");
		e.preventDefault();
	});

});