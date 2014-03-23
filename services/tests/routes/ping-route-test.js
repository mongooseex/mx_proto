'use strict';

var should = require('chai').should()
  , superTest = require('supertest')
  , appSettings = require('../../app-settings.json')
  , dns = appSettings.server.host + ':' + appSettings.server.port.toString()
  , api = superTest('http://' + dns)
  ;

describe('GET /api/ping', function () {
  it('returns json', function (done) {
    api.get('api/ping/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });

  });
});