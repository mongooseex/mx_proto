'use strict';

var scripts = [
    'libs',
    'landing'
  ]
  , stylesheets = [
    'landing'
  ]

  , navLinks = [
    {
      label: '<span class="fa fa-user"></span> Account',
      
      href: '/user',

      children: [
        { label: 'profile', href: '/user/USERID' },
        { label: 'Sign out', href: '/signout' }
      ]
    }
  ];

exports.init = function(app) {
  app.get(/^\/(home)?$/i, function(req, res) {
    if(!req.session.user) {
      return res.render('index', { layout: 'landing', scripts: scripts, stylesheets: stylesheets, showSearch: false });
    }

    res.render('home', {
      scripts: ['libs'],
      
      stylesheets: ['main'],
      
      navLinks: navLinks
    });

  });
};