'use strict';

var WizardPresenter = champ.presenter.extend('WizardPresenter', {

  views: ['WizardView'],

  events: {
    'presenter:show': 'onShow'
  },

  init: function(options) {
    this.view.container = options.viewContainer
      ? $(options.viewContainer)
      : this.view.container;
  },

  onShow: function(id) {
    this.view.setVisible(id === this.id);
  }

});