'use strict';

var NavigationView = champ.view.extend('NavigationView', {
  container: '.js-navigation-view',

  $: {
    prevBtn: '.js-prev-btn : click',
    nextBtn: '.js-next-btn : click'
  },

  init: function(options) { },

  enableBtn: function(btn, enable) {
    this.$[btn + 'Btn'].attr('disabled', !enable);
  }
});