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
			res.redirect('/ennemy');
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
		var data;
		Ennemy.find(function(err,item){
			if (err) data = err;
			if (item) {
				data = item;
			};
			res.view('ennemy/add',{'data':data})
		})
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
	},

	delete:function(req,res){
		Ennemy.findOne({'id':req.param('id')},function(err,data){
			if (err) res.jsonr(err) ;
			if (data) {
				Ennemy.destroy({'id':req.param('id')},function(err){
					res.redirect('/ennemy')
				});
			};
		})
	}
};