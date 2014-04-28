var BasicInfoPresenter = WizardPresenter.extend('BasicInfoPresenter', {

  views: ['BasicInfoView'],

  init: function(options) {
    this.userModel = options.userModel;
    this.models.push(options.userModel);

    var eventName = 'view:' + this.view.id + ':';

    for(var el in this.view.$) {
      champ.events
        .on(eventName + el + ' change', this.updateModel.bind(this, this.userModel))
        .on(eventName + el + ' keyup', this.updateModel.bind(this, this.userModel));
    }
  },

  onShow: function(id) {
    if(WizardPresenter.prototype.onShow.call(this, id)) {
      champ.events.trigger('navigation:buttons:label', { next: 'Next' });
    }
  }

});