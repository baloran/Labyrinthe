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
		console.log(req.params.all())
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
		res.view({
			data: 'Coucou'
		})
	},

	process: function(req, res) {
		passport.authenticate('local', function(err, user, info) {
			if ((err) || (!user)) {
				res.redirect('/login');
				return;
			}
			req.logIn(user, function(err) {
				if (err) {
					res.redirect('/login');
				}
				return res.redirect('/');
			});
		})(req, res);
	},

	profil: function(req, res) {
		var username = req.param('username');
		User.findOne({
			'username': username
		}, function(err, data) {
			if (err) {
				console.log("Erreur: " + err);
			};
			console.log(data);
			res.view({
				'data': data
			});
		})
	}
};