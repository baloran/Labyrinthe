/**
 * ItemController.js
 *
 * @description :: Controller pour creer des items
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
	},

	modif: function(req, res) {
		var slug = req.param("slug");
		Item.findOne({
			'slug': slug
		}, function(err, data) {
			if (err) res.json(err);
			if (data) {
				res.view({
					'data': data
				})
			} else {
				res.json("No Object")
			}
		})
	},

	update: function(req, res) {
		var slug = req.param("slug");
		Item.update({
			'slug': slug
		}, req.params.all(), function(err, item) {
			if (err) res.json(err);
			if (item) {
				res.json(item);
			} else {
				res.json("Pas d'item");
			}
		})
	}
};