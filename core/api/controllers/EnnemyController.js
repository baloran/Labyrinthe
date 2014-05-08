/**
 * EnnemyController.js
 *
 * @description :: Controller pour creer des ennemy
 */

module.exports = {
	create: function(req, res) {
		Ennemy.create({
			'name': req.param('name'),
			'desc': req.param('desc'),
			'slug': req.param('name'),
		}, function(err, Ennemy) {
			if (err) res.json(err);
			res.json(Ennemy);
		})
	},

	list: function(req, res) {
		var slug = req.param('slug');
		Ennemy.findOne({
			'slug': slug
		}, function(err, Ennemy) {
			if (err) res.json(err);
			if (Ennemy) {
				res.json(Ennemy);
			} else {
				res.json("Pas d'objet trouvé");
			}
		})
	},

	index: function(req, res) {
		res.view('Ennemy/add');
	},

	modif: function(req, res) {
		var slug = req.param("slug");
		Ennemy.findOne({
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
		Ennemy.update({
			'slug': slug
		}, req.params.all(), function(err, Ennemy) {
			if (err) res.json(err);
			if (Ennemy) {
				res.json(Ennemy);
			} else {
				res.json("Pas d'item");
			}
		})
	}
};