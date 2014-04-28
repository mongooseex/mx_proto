'use strict';

exports.registerHelper = function(hbs) {
  hbs.helpers.header = function(env, options) {
    return env.toLowerCase() !== 'production'
      ? options.fn(this)
      : options.fn(this).replace(/\.(.+)$/gim, '.min.$1');
  };
};