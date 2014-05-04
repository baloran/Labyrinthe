/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');

module.exports = {

	attributes: {
		'mail': {
			type: 'email',
			required: true,
			unique: true
		},
		'username': {
			type: 'STRING',
			required: true,
			unique: true
		},
		'password': {
			type: 'STRING',
			required: true
		},
		'exp': {
			type: 'int',
		},
		'nbr_win': {
			type: 'int',
		},
		'nbr_play': {
			type: 'int',
		},
		'first_connection': {
			type: 'datetime',
		},
		'avatar': {
			type: 'STRING',
		},
		'id': {
			type: 'STRING'
		},
		'save': {
			'name': {
				type: 'STRING',
				required: true
			},
			'id': {
				type: 'STRING',
				required: true
			},
			'state': {
				type: 'int'
			}
		}
	},

	toJSON: function() {
		var obj = this.toObject();
		// Remove the password object value
		delete obj.password;
		// return the new object without password
		return obj;
	},


	beforeCreate: function(user, cb) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					console.log(err);
					cb(err);
				} else {
					user.password = hash;
					cb(null, user);
				}
			});
		});
	}
};