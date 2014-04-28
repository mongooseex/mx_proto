'use strict';

var http = require('http');

var proxy = function(res) {
  return function(stream) {
    var data = '';

    stream
      .on('data', function(d) {
        data += d;
      })

      .on('end', function() {
        console.log(stream.headers, stream.statusCode, data);
        res.set(stream.headers);
        res.send(stream.statusCode, data);
      })

      .on('error', function(err) {
        console.log(arguments);
        res.send(500, err);
      });
  };
};

exports.init = function(app) {
  var proxySettings = app.settings.appSettings.proxy

  , reqOptions = {
    host: proxySettings.host,
    port: proxySettings.port
  };

  app.all(/^\/api(?:\/.*)?$/i, function(req, res) {
    reqOptions.path = req.path;
    reqOptions.method = req.method;
    reqOptions.headers = req.headers;
    
    http
      .request(reqOptions, proxy(res))
      .end();
  });
};