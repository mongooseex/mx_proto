var BasicInfoView = WizardView.extend('BasicInfoView', {

  container: '.js-basic-info-view',

  $: {
    displayName   : '.js-display-name-input : change keyup blur',
    email         : '.js-email-input : change keyup blur',
    password1     : '.js-password-1-input : change keyup blur',
    password2     : '.js-password-2-input : change keyup blur'
  }

});