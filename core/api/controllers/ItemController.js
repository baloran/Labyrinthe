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
			res.redirect('/item');
		});
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
		});
	},

	index: function(req, res) {
		var data;
		Item.find(function(err,item){
			if (err) data = err;
			if (item) {
				data = item;
			}else{
				data = "No item";
			}
			res.view('item/add',{'data':data});
		});
	},

	modif: function(req, res) {
		var id = req.param("id");
		Item.findOne({
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
		Item.update({
			'id': id
		}, req.params.all(), function(err, item) {
			if (err) res.json(err);
			if (item) {
				res.json(item);
			} else {
				res.json("Pas d'item");
			}
		});
	},

	delete: function(req,res){
		var id = req.param('id');
		Item.findOne({'id':id},function(err,data){
			if (err) res.json(err);
			if (data) {
				Item.destroy({'id':id},function(err){
					if (err) res.json(err);
				});
				res.redirect('/item');
			}else{
				res.json("No item with this id");
			}
		});
	}
};
