/**
 * PartyController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	enter: function(req,res){
        var name = req.param('name');
        var room = req.socket.join(name);
        console.log(room);
    },

    room:function(req,res){
        var data = sails.sockets.rooms(req);
        console.log(data);
        res.view({'data':data});
    },

    leave: function(req,res){
        var name = req.param('name');
        sails.sockets.leave('room',name);
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
