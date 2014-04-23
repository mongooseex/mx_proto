'use strict';

var WizardView = champ.view.extend('WizardView', {

  init: function(options) {},

  setVisible: function(visible) {
    this.container[visible ? 'addClass' : 'removeClass']('show');
  }

});