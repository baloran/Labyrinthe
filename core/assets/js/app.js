window.onload = function(){
    var socket = io.connect("http://localhost:1337");
    socket.on("connect",function(io){
        // console.log("******************* DEBUG *********************");
        // console.log(io);
        // console.log("***********************************************");
        //
        // socket.emit("new_user",{
        //     data:"hello"
        // });
        //
        // socket.on("alreadyInRoom",function(data){
        //     alert("Déjà dans une room: "+ data);
        // })
        //
        // socket.emit("new_room",{
        //         'room':"partie1",
        //     });
        //
        // socket.join("partie1");
        // // $('#create_room').submit(function(e){
        // //     e.preventDefault();
        // //
        // //     var room = $("#room_name").val();
        // //     socket.emit("new_room",{
        // //         'room':room,
        // //     });
        // // });

        socket.on('envoyer_message',function(data){

        })

        $('.send_message').click(function(e){
            e.preventDefault();
            socket.post('/party/sendmessage',function(data){
                console.log("Je suis un test 2 ");
            });
        });

    });
};

$(window).bind('beforeunload', function(){
  return 'Are you sure you want to leave?';
});
