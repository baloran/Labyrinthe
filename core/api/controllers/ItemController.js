/**
 * ItemController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

	create: function(req, res) {
		Item.create({
			'name': req.param('name'),
			'desc': req.param('desc'),
			'slug': req.param('name'),
		}, function(err, item) {
			if (err) res.json(err);
			res.json(item);
		})
	},

	list: function(req, res) {
		var slug = req.param('slug');
		Item.findOne({
			'slug': slug
		}, function(err, item) {
			if (err) res.json(err);
			if (item) {
				res.json(item);
			} else {
				res.json("Pas d'objet trouvé");
			}
		})
	},

	index: function(req, res) {
		res.view('item/add');
	}
};