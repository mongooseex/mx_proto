'use strict';

var signInValidator = require('../business/validators/signInValidator');

var routes = {
  signup: /^\/signup$/i,

  signin: /^\/signin$/i,

  verify: /^\/verify$/i
};

exports.init = function(app) {
  app.get(routes.signup, function(req, res) {
    res.render('signup', { 
      scripts: ['libs', 'signup'],

      stylesheets: ['signup'],

      navLink: {
        message: 'Already have an account?',
        text: 'Sign in',
        href: '/signin'
      }
    });
  });

  app.get(routes.signin, function(req, res) {
    res.render('signin', {
      scripts: ['libs'],

      stylesheets: ['main'],

      navLink: {
        message: 'Don\'t have an account?',
        text: 'Sign up',
        href: '/signup'
      }
    });
  });

  app.post(routes.signin, function(req, res) {
    var body = req.body
      , err = '<p>Must provide username and password</p>';

    if(signInValidator.validate(body)) {
      req.session.user = body.email;
      return res.redirect('/');
    }

    res.render('signin', {
      scripts: ['libs'],

      stylesheets: ['main'],

      navLink: {
        message: 'Don\'t have an account?',
        text: 'Sign up',
        href: '/signup'
      },

      globalAlert: {
        msg: err,
        type: 'error'
      }
    });
  });

  app.get(routes.verify, function(req, res) {
    res.render('verifyEmail', { showVerify: 'show', scripts: ['verifyEmail'], stylesheets: ['signup'] });
  });
};