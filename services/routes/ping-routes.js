'use strict';

var rc = require('./route-collection').create('/api/ping')
  ;

rc.add({
  verb: 'get',
  route: '/',
  handler: function pingDefaultRouteHandler(req, res, next) {
    res.send({ data: 'pong' });
    next();
  }
});

exports.init = rc.init;