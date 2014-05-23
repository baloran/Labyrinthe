/**
 * Ennemy.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		'name': {
			type: "string",
			required: true
		},

        'slug':{
            type:'string'
        },

		'desc': {
			type: 'text',
			required: true,
		},

		'attaque': {
			type: 'int',
		},

		'range': {
			type: 'int',
		}
	},

    beforeCreate:function(ennemy,next){
        // Slug creation
        if (!ennemy.name) {
            return next({err:["No ennemy name !"]});
        }
        ennemy.slug = ennemy.name.replace(/\s+/g,'').toLowerCase();
    },
};
