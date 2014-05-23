window.onload = function(){
    var socket = io.connect("http://localhost:1337");
    socket.on("connect",function(io){
        console.log("******************* DEBUG *********************");
        console.log(io);
        console.log("***********************************************");

        socket.emit("new_user",{
            data:"hello"
        });

        socket.on("alreadyInRoom",function(data){
            alert("Déjà dans une room: "+ data);
        })


        $('#create_room').submit(function(e){
            e.preventDefault();

            var room = $("#room_name").val();
            socket.emit("new_room",{
                'room':room,
            });
        });
    });
};
