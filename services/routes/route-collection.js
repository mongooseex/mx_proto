'use strict';

// internal

function initRoutes(prefix, routes, server) {
  var r = ''
    , i = 0
    , wholeRoute = ''
    ;

  for (i = 0; i < routes.length; i += 1) {
    r = routes[i];
    wholeRoute = prefix + r.route;
    server[r.verb](wholeRoute, r.handler);
  } 

  return server;
}

// exports

exports.create = function createRouteCollection(prefix) {

  var routePrefix = prefix
    , routes = []
    ;

  return {
    add: function addRouteObj(routeObj) {
      routes.push(routeObj);
    },
    init: function initRouteCollection(server) {
      initRoutes(routePrefix, routes, server);
    }
  };
};