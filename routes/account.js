'use strict';

var re = {
  signup: /^\/signup$/i,

  signin: /^\/signin$/i,

  verify: /^\/verify$/i
};

exports.init = function(app) {
  app.get(re.signup, function(req, res) {
    res.render('signup', { 
      scripts: ['signup'],

      stylesheets: ['signup'],

      navLink: {
        message: 'Already have an account?',
        text: 'Sign in',
        href: '/signin'
      }
    });
  });

  app.get(re.signin, function(req, res) {
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

  app.post(re.signin, function(req, res) {
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

  app.get(re.verify, function(req, res) {
    res.render('verifyEmail', { showVerify: 'show', scripts: ['verifyEmail'], stylesheets: ['signup'] });
  });
};