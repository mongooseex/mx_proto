'use strict';

var fs = require('fs')
  , path = require('path');

exports.registerHelper = function(hbs) {
  var tmpl = fs.readFileSync(
        path.join(__dirname, '../partials/shared/navSearch.html'),
        { encoding: 'utf8' }
      )
    
    , html = hbs.compile(tmpl);

  hbs.helpers.navSearch = function(showSearch, options) {
    return showSearch 
      ? new hbs.SafeString(html(options)) 
      : '';
  };
};