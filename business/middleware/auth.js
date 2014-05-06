'use strict';

//todo: add auth logic
module.exports = function(opts) {
  return function(req, res, next) {
    next();
  };
};