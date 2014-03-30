'use strict';

exports.init = function(app) {
  app.get(/^\/signup$/i, function(req, res) {
    res.render('signup', { layout: 'signup' });
  });
};