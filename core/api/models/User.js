/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		'mail': {
			type: 'email',
			required: true
		},
		'pseudo': {
			type: 'string',
			required: true
		},
		'password': {
			type: 'password',
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
			type: 'string',
		},
		'id': {
			type: 'string'
		},
		'save': {
			'name': {
				type: 'string',
				required: true
			},
			'id': {
				type: 'string',
				required: true
			},
			'state': {
				type: 'int'
			}
		}
	}
};