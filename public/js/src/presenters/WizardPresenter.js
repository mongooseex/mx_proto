var WizardPresenter = champ.presenter.extend('WizardPresenter', {

  views: ['WizardView'],

  events: {
    'presenter:show': 'onShow'
  },

  init: function(options) {
    this.isValid = false;
  },

  onShow: function(id) {
    this.view.setVisible(id === this.id);

    return id === this.id;
  },

  validateField: function(val) {
    return val.trim() !== '';
  },

  validateForm: function(e) {
    if(e.which === 9) { return this.isValid = false; }

    if(!this.validateField($(e.target).val())) {
      champ.events.trigger('navigation:buttons:state', { next: false });
      $(e.target).parent().addClass('has-error');
      return this.isValid = false;
    }

    for(var e in this.view.$) {
      var el = this.view.$[e];
      if(!this.validateField(el.val())) {
        champ.events.trigger('navigation:buttons:state', { next: false });
        return this.isValid = false;
      }

      this.view.setInputError(e, false);
    }

    this.view.setInputError(false);
    champ.events.trigger('navigation:buttons:state', { 'next': true });

    return this.isValid = true;
  },

  updateModel: function(model, e) {
    if(!this.validateForm(e)) { return; }

    for(var i in this.view.$) {
      var prop = this.view.$[i];

      if(!prop.data('modelBind')) { continue; }

      model.property(prop.data('modelBind'), prop.val());
    }
  },

});