exports.init = function(app) {
  app.get(/^\/(home)?$/i, function(req, res) {
    res.render('index', { layout: 'landing' });
  });
};