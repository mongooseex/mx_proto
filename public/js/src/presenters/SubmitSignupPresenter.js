var SubmitSignupPresenter = WizardPresenter.extend('SubmitSignupPresenter', {

  views: ['SubmitSignupView'],

  models: ['SubmitSignupModel'],

  init: function(options) {
    this.userModel = options.userModel;
    this.models.push(options.userModel);

    this.model.property('apiEndpoint', $('script[data-api-endpoint]').data('apiEndpoint'));
  },

  onShow: function(id) {
    if(WizardPresenter.prototype.onShow.call(this, id)) {
      champ.events.trigger('navigation:buttons:state', {
        prev: false,
        next: false
      });

      setTimeout(this.signupRequest.bind(this), 2000);
    }
  },

  signupRequest: function() {
    $.ajax({
      type: 'POST',
      url: this.model.property('apiEndpoint') + 'users',
      dataType: 'json',
      data: this.userModel.properties
    })
    .done(this.signupRequestSuccess)
    .fail(this.signupRequestError);
  },

  signupRequestSuccess: function(data, textStatus, jqXhr) {
    champ.events.trigger('navigation:next');
  },

  signupRequestError: function(jqXhr, textStatus, errorThrown) {
    champ.events.trigger('navigation:next');
  }

});