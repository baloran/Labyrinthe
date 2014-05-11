module.exports = function(req, res, next) {
	req.options.locals = req.options.locals || {};

	Sites.findOne(1,function(err,data){
		if (err) console.log(err);
		req.options.locals.sites = data;
		return next()
	})
};
