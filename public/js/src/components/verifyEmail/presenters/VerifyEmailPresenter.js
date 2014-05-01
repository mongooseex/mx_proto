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