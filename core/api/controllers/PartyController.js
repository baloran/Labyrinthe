/**
 * PartyController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    room:function(req,res){
        var data = sails.sockets.rooms(req);
        res.view({'data':data});
    },

    start: function(req,res){
        res.view({layout:null});
    },

    join:function(req,res){
        //var room = req.param('room');
        var room = "Test";
        sails.sockets.join(req,room);
        sails.sockets.broadcast(room, 'nouvel_utilisateur', {msg: 'nouvel utilisateur dans la room'},req.socket);
    },

    leave: function(req,res){
        var name = req.param('name');
        sails.sockets.leave('room',name);
    },

    getRoom: function(req,res){
        var room = sails.sockets.rooms();
        res.json(room);
    },

    sendData: function(req,res){
        var name = req.param('room');
        sails.sockets.broadcast("Test", 'send_data', req.params.all(),req.socket);
    },

    launch: function(req,res){
        var jeu = req.param('mur');
        sails.sockets.broadcast("Test", 'start_game', jeu,req.socket);
    },

    my:function(req,res){
        var room = req.param('room');
        // If request from WebSocket, this method is exist.
        req.socket.join(room);

        res.json({
          success: true
        });
    }
};
