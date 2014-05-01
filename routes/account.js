'use strict';

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

  app.get(routes.verify, function(req, res) {
    res.render('verifyEmail', { showVerify: 'show', scripts: ['verifyEmail'], stylesheets: ['signup'] });
  });
};