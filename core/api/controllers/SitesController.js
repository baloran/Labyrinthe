/**
 * SiteController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

	home: function (req, res){
		res.view({layout: null});
	},

	index:function(req,res){
		var data;
		Sites.findOne(1,function(err,options){
			if (err) console.log(err);
			data = options;
		});
		res.view({'data':data});
	},

	update:function(req,res){
		Sites.update(1,req.params.all(),function(err,data){
			if (err) console.log(err);
			res.redirect('/sites');
		});
	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SiteController)
   */
  _config: {}


};
