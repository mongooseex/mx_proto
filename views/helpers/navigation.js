'use strict';

var fs = require('fs')
  , path = require('path');

exports.registerHelper = function(hbs) {
  var linkTmpl = '<li><a href="{{href}}">{{{label}}}</a></li>'
    
    , dropDownTmpl = fs.readFileSync(
        path.join(__dirname, '../partials/shared/dropdown.html'),
        { encoding: 'utf8' }
      )
    
    , linkHtml = hbs.compile(linkTmpl)
    
    , dropDownHtml = hbs.compile(dropDownTmpl);

  hbs.helpers.navigation = function(links, options) {
    var nav = '';

    for(var i=0; i<links.length; i++) {
      var link = links[i];

      if(link.children instanceof Array) {
        nav += dropDownHtml(link);

        continue;
      }

      nav += linkHtml(link);
    }

    return new hbs.SafeString(nav);
  };
};