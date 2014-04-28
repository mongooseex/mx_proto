'use strict';

exports.init = function(app) {
  app.get(/^\/signup$/i, function(req, res) {
    res.render('signup', { scripts: ['signup'], stylesheets: ['signup'] });
  });
};