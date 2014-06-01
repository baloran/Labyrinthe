/**
 * Routes
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {


	// Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
	// default view engine) your home page.
	//
	// (Alternatively, remove this and add an `index.html` file in your `assets` directory)

	'/': "SitesController.home",
	'POST /login': "UserController.process",
	'POST /register': "UserController.register",
	'GET /profil/:username': "UserController.profil",
    'GET /profil':'UserController.mine',
	'POST /sites/update':"SitesController.update",
	'GET /sites':"SitesController.index",

	// Item
	'GET /item/object/:id': "ItemController.modif",
	'POST /item/object/:id': "ItemController.update",
	'POST /item/object': "ItemController.list",
	'POST /item/add': "ItemController.create",
	'GET /item/delete/:id': "ItemController.delete",

	// Ennemy
	'GET /ennemy/object/:id': "EnnemyController.modif",
	'POST /ennemy/object/:id': "EnnemyController.update",
	'POST /ennemy/object': "EnnemyController.list",
	'POST /ennemy/add': "EnnemyController.create",
	'GET /ennemy/delete/:id': "EnnemyController.delete",

	// Party
    'GET /party/room':'PartyController.room',
    'GET /party/room/:name':'PartyController.enter',
    'GET /party/room/leave/:name':'PartyController.leave',
    'GET /api/getRoom/':'PartyController.getRoom',

    // API
    'POST /giveExp': 'UserController.giveExp',
    'POST /giveMoney': 'UserController.giveMoney',


	// If a request to a URL doesn't match any of the custom routes above, it is matched
	// against Sails route blueprints.  See `config/blueprints.js` for configuration options
	// and examples.

};
