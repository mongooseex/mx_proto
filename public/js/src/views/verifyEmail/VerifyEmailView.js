var VerifyEmailView = champ.view.extend('VerifyEmailView', {

  container: '.js-verify-signup-view',

  $: {
    verifyCode: '.js-verify-code-input : change keyup'
  },

  init: function(options) {
    this.$.verifyBtn = $(options.verifyBtn || '.js-verify-btn');
  }

});