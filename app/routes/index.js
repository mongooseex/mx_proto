exports.init = function(app) {
	app.get(/^\/(home)?$/, function(req, res) {
		res.render('index');
	});
};