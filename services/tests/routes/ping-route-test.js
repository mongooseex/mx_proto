'use strict';

var expect = require('chai').expect
  , appSettings = require('../../app-settings.json')
  , dns = appSettings.server.host + ':' + appSettings.server.port.toString()
  , service = require('../../services').startServices()
  , client = require('restify')
      .createJsonClient({ url: 'http://' + dns, version: '*' })
  ;

describe('GET /api/ping', function () {
  it('returns valid json -- no nulls', function (done) {
    client.get('/api/ping', function(err, req, res, obj) {
      if (err) {
        done(err);
      }

      var property = 'data'
        , value = 'pong'
        ;

      expect(err).to.be.a('null');
      expect(req).to.not.be.a('null');
      expect(res).to.not.be.a('null');
      expect(obj).to.not.be.a('null');

      expect(obj[property]).to.equal(value);

      done();
    });
  });
});