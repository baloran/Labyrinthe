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
		});
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
		});
	},

	index: function(req, res) {
		var data;
		Ennemy.find(function(err,enemy){
			if (err) data = err;
			if (enemy) {
				data = enemy;
			}else{
				data = "No enemy";
			}
			res.view('ennemy/add',{'data':data});
		});
	},

	modif: function(req, res) {
		var id = req.param("id");
		Ennemy.findOne({
			'id': id
		}, function(err, data) {
			if (err) res.json(err);
			if (data) {
				res.view({
					'data': data
				});
			} else {
				res.json("No Object");
			}
		});
	},

	update: function(req, res) {
		var id = req.param("id");
		Ennemy.update({
			'id': id
		}, req.params.all(), function(err, ennemy) {
			if (err) res.json(err);
			if (ennemy) {
				res.json(ennemy);
			} else {
				res.json("Pas d'item");
			}
		});
	},

	delete: function(req,res){
		var id = req.param('id');
		Ennemy.findOne({'id':id},function(err,data){
			if (err) res.json(err);
			if (data) {
				Ennemy.destroy({'id':id},function(err){
					if (err) res.json(err);
				});
				res.redirect('/ennemy');
			}else{
				res.json("No enemy with this id");
			}
		});
	}
};
