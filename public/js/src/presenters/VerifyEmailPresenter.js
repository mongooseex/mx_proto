var VerifyEmailPresenter = WizardPresenter.extend('VerifyEmailPresenter', {

  views: ['VerifyEmailView'],

  init: function(options) {
    champ.events
      .on('view:' + this.view.id + ':verifyCodeText change', this.validateCode.bind(this))
      .on('view:' + this.view.id + ':verifyCodeText keyup', this.validateCode.bind(this))
      .on('view:' + this.view.id + ':verifyCodeText blur', this.validateCode.bind(this));
  },

  onShow: function(id) {
    if(WizardPresenter.prototype.onShow.call(this, id)) {
      champ.events
        .trigger('navigation:buttons:state', {
          prev: false,
          next: false
        })
        .trigger('navigation:buttons:label', { next: 'Verify' });
    }
  },

  validateCode: function(e) {
    champ.events.trigger('navigation:buttons:state', {
      next: this.view.$.verifyCodeText.val().trim() !== ''
    });
  }

});