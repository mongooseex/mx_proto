'use strict';

var scripts = [
    'libs',
    'landing'
  ]
  , stylesheets = [
    'landing'
  ];

exports.init = function(app) {
  app.get(/^\/(home)?$/i, function(req, res) {
    res.render('index', { layout: 'landing', scripts: scripts, stylesheets: stylesheets });
  });
};