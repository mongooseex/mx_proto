'use strict';

exports.registerHelper = function(hbs) {
  var tmpl = '<div class="js-header-alert header-alert alert alert-danger {{hidden}}">{{{msg}}}</div>'
    , html = hbs.compile(tmpl);

  hbs.helpers.globalAlert = function(msg, type, options) {
    var opts = { 
      hidden: (msg || '').trim() === ''
        ? 'hidden'
        : '',

      msg: (msg || '').trim(),

      type: (type || 'error').trim()
    };

    return new hbs.SafeString(html(opts));
  };
};