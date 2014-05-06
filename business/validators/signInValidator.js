'use strict';

var validator = require('./validatorBase');

module.exports = validator.create({
  email: function(email) { return email.trim() !== ''; },

  password: function(pword) { return pword.trim() !== ''; }
});