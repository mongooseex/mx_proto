var OtherInfoPresenter = WizardPresenter.extend('OtherInfoPresenter', {

  views: ['OtherInfoView'],

  init: function(options) {
    this.userModel = options.userModel;
    this.models.push(options.userModel);

    var eventName = 'view:' + this.view.id + ':';

    for(var el in this.view.$) {
      champ.events
        .on(eventName + el + ' change', this.updateModel.bind(this, this.userModel))
        .on(eventName + el + ' keyup', this.updateModel.bind(this, this.userModel));
    }

    this.view.$.profileImg.on('fileselect', this.onProfileImgSelect.bind(this));
  },

  onShow: function(id) {
    if(WizardPresenter.prototype.onShow.call(this, id)) {
      champ.events
        .trigger('navigation:buttons:state', { next: this.isValid })
        .trigger('navigation:buttons:label', { next: 'Done' });
    }
  },

  onProfileImgSelect: function(e, numFiles, label) {
    this.view.$.profileLabel.val(label);
  },

  validateForm: function(e) {
    var temp = this.view.$.profileLabel;
    delete this.view.$.profileLabel;

    var valid = WizardPresenter.prototype.validateForm.call(this, e);

    this.view.$.profileLabel = temp;

    return valid;
  }

});