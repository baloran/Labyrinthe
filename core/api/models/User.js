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
			type: 'string',
			required: true,
			unique: true
		},
		'password': {
			type: 'string',
			required: true
		},
        'role':{
            type:'int',
            defaultsTo:'0',
        },
        'slug':{
            type:'string',
        },
		'exp': {
			type: 'int',
            defaultsTo:'0'
		},
        'money':{
            type:'int',
            defaultsTo:'0'
        },
		'nbr_win': {
			type: 'int',
            defaultsTo:'0'
		},
		'nbr_play': {
			type: 'int',
            defaultsTo:'0'
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
            type:'json'
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
		// Password encryption
        bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					cb(err);
				} else {
					user.password = hash;
					cb(null, user);
				}
			});
		});


	},
};
