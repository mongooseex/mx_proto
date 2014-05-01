;(function($, champ, undefined) {
  'use strict';

var VerifyEmailView = champ.view.extend('VerifyEmailView', {

  container: '.js-verify-signup-view',

  $: {
    verifyCode: '.js-verify-code-input : change keyup'
  },

  init: function(options) {
    this.$.verifyBtn = $(options.verifyBtn || '.js-verify-btn');
  }

});
var VerifyEmailPresenter = champ.presenter.extend('VerifyEmailPresenter', {

  views: ['VerifyEmailView'],

  init: function(options) {
    champ.events
      .on('view:' + this.view.id + ':verifyCode change', this.validateCode.bind(this))
      .on('view:' + this.view.id + ':verifyCode keyup', this.validateCode.bind(this));
  },

  validateCode: function(e) {
    this.view.$.verifyBtn.attr('disabled', this.view.$.verifyCode.val() === '');
  }

});
$(function() {
  var presetner = new VerifyEmailPresenter();
});
}(jQuery, champ));