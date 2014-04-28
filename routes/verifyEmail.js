'use strict';

exports.init = function(app) {
  app.get(/^\/verify$/i, function(req, res) {
    res.render('verifyEmail', { showVerify: 'show', scripts: ['verifyEmail'], stylesheets: ['signup'] });
  });
};