'use strict';

var NavigationPresenter = champ.presenter.extend('NavigationPresenter', {

  views: ['NavigationView'],

  events: {
    'navigation:next'     : 'onNext',
    'navigation:previous' : 'onPrev'
  },

  init: function(options) {
    this.presenters = options.presenters;
    this.currentIndex = options.currentIndex || 0;

    champ.events
      .on('view:' + this.view.id + ':prevBtn click', this.onPrev.bind(this))
      .on('view:' + this.view.id + ':nextBtn click', this.onNext.bind(this));
  },

  onNext: function(e) {
    e.preventDefault();

    this.currentIndex = this.currentIndex < this.presenters.length - 1
      ? this.currentIndex + 1
      : this.currentIndex;

    this.view.enableBtn('next', this.currentIndex !== (this.presenters.length - 1));
    this.view.enableBtn('prev', true);

    champ.events.trigger('presenter:show', this.presenters[this.currentIndex].id);
  },

  onPrev: function(e) {
    e.preventDefault();

    this.currentIndex = this.currentIndex > 0
      ? this.currentIndex - 1
      : this.currentIndex;

    this.view.enableBtn('prev', !!this.currentIndex);
    this.view.enableBtn('next', true);

    champ.events.trigger('presenter:show', this.presenters[this.currentIndex].id);
  }

});