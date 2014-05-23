/**
 * Item.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		'name': {
			type: 'string',
			required: true
		},

		'slug': {
			type: 'string',
		},

		'desc': {
			type: 'text',
			required: true
		},

		'attaque': {
			type: 'int',
		},

		'range': {
			type: 'int',
		},

		'defence': {
			type: 'int',
		},
	},

    beforeCreate:function(item,next){
        // Slug creation
        if (!item.name) {
            return next({err:["No item name !"]});
        }
        item.slug = item.name.replace(/\s+/g,'').toLowerCase();
    },
};
