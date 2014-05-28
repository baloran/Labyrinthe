/**
 * UserController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var passport = require("passport");

module.exports = {
	register: function(req, res) {
		var username = req.param('username');
		var password = req.param('password');
		var email = req.param('mail');
        User.findOne();
		User.create({
			'mail': email,
			'username': username,
			'password': password
		}, function(err, data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data);
			}
		});
	},

	login: function(req, res) {
        console.log(sails.sockets);
		res.view({
			data: 'Coucou'
		});
	},

	process: function(req, res) {
		passport.authenticate('local', function(err, user, info) {
			if ((err) || (!user)) {
				res.redirect('/');
				return;
			}
			req.logIn(user, function(err) {
				if (err) {
					res.redirect('/');
				}
                req.session.authenticated = true;
                req.session.username = req.param('username');
				return res.redirect('/profil');
			});
		})(req, res);
	},

	profil: function(req, res) {
		var slug = req.param('username');
		User.findOne({
			'slug': slug
		}, function(err, data) {
			if (err) {
				console.log("Erreur: " + err);
			}
			console.log(data);
			res.view({
				'data': data
			});
		});
	},

    getData:function(req,res){
        var username = req.param('username');
        User.findOne({
            'username': username
        },function(err,data){
            if (err) {
                res.json(err);
            }
            if (data) {
                res.json(data);
            }else{
                res.json("Pas d'utilisateur !");
            }
        });
    },

    mine:function(req,res){
        console.log(req.session);
    },

    giveMoney: function(req,res){
        User.findOne({id:req.param('id')},function(err,user){
            user.money += req.param('money');
        });
    },

    giveExp: function(req,res){

        User.findOne({id:req.param('id')},function(err,user){
            user.exp += req.param('exp');
        });
    }
};
