var VerifyEmailView = WizardView.extend('VerifyEmailView', {

  container: '.js-verify-signup-view',

  $: {
    verifyCodeText  : '.js-verify-code-input : keyup change blur',
    resendEmailLink : '.js-resend-email'
  },

  init: function(options) {}

});