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
        res.view();
    },

    join:function(req,res){
        sails.sockets.join(req.socket,'partie2');
        console.log('Il ets connecter a la room');
        sails.sockets.broadcast('partie2', 'salut', {msg: 'nouvel utilisateur dans la room'});
    },

    leave: function(req,res){
        var name = req.param('name');
        sails.sockets.leave('room',name);
    },

    getRoom: function(req,res){
        var room = sails.sockets.rooms();
        res.json(room);
    },

    sendmessage: function(req,res){
        sails.sockets.broadcast('partie2', 'salut', {msg: 'Hi bitch!'});
    },

    launch: function(req,res){
        var jeu = req.param('mur');
        console.log(jeu);
        sails.sockets.broadcast('partie2', 'start_game', {"lab":jeu},req.socket);
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
