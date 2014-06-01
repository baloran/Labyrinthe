/**
 * PartyController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    room:function(req,res){
        var data = sails.sockets.rooms(req);
        console.log(data);
        res.view({'data':data});
    },

    start: function(req,res){
        res.view({layout:null});
    },

    join:function(req,res){
        var room = req.param('room');
        sails.sockets.join(req,room);
        console.log('Il ets connecter a la room');
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
        var name = req.param('name');
        sails.sockets.broadcast(name, 'send_data', req.param,req.socket);
    },

    launch: function(req,res){
        var jeu = req.param('mur');
        console.log(jeu);
        sails.sockets.broadcast(req.param("room"), 'start_game', jeu,req.socket);
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
