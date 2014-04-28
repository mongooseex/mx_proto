var WizardView = champ.view.extend('WizardView', {

  init: function(options) {},

  setVisible: function(visible) {
    this.container[visible ? 'addClass' : 'removeClass']('show');
  },

  setInputError: function(el, err) {
    if(arguments.length === 1) {
      return this.setInputError(Object.keys(this.$), el);
    }

    if(typeof el === 'string') {
      return this.setInputError([el || Object.keys(this.$)], err);
    }

    for(var e in el) {
      this.$[el[e]].parent()[err ? 'addClass' : 'removeClass']('has-error');
    }
  }

});