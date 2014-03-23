'use strict';

var appSettings = require('./app-settings.json')
  , restify = require('restify')
  , path = require('path')
  , glob = require('glob')
  , server = { }
  , routePath = appSettings.routes.path
  , routeFilePattern = appSettings.routes.pattern
  , routePattern = path.join(routePath, routeFilePattern)
  ;

exports.startServices = function startServicesServer() {
  server = restify.createServer({
    name: appSettings.server.name,
    version: appSettings.server.version
  });

  // setup server
  server.use(restify.bodyParser());

  // active routes
  glob.sync(routePattern).forEach(function iterateFiles (file) {
    var rc = require(path.resolve('./', file));
    if (rc) {
      rc.init(server);
    }
  });

  // start server
  server.listen(appSettings.server.port);

  return server;
};

exports.stopServices = function stopServicesServer() {
  server.close();
};