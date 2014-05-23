module.exports = function(req, res, next) {
	req.options.locals = req.options.locals || {};

	Sites.find({identification:'site'},function(err,data){
		if (err) console.log(err);
		console.log(data);
		req.options.locals.sites = data;
		return next()
	})
};
