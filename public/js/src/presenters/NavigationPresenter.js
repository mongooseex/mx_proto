var NavigationPresenter = champ.presenter.extend('NavigationPresenter', {

  views: ['NavigationView'],

  events: {
    'navigation:next'           : 'onNext',
    'navigation:previous'       : 'onPrev',
    'navigation:buttons:state'  : 'onSetBtnState',
    'navigation:buttons:label'  : 'onSetBtnLabel',
    'navigation:hide'           : 'onNavigationHide',
    'navigation:show'           : 'onNavigationShow'
  },

  init: function(options) {
    this.presenters = options.presenters;
    this.currentIndex = options.currentIndex || 0;

    champ.events
      .on('view:' + this.view.id + ':prevBtn click', this.onPrevClick.bind(this))
      .on('view:' + this.view.id + ':nextBtn click', this.onNextClick.bind(this));
  },

  onNextClick: function(e) {
    e.preventDefault();
    this.onNext();
  },

  onNext: function() {
    this.currentIndex = this.currentIndex < this.presenters.length - 1
      ? this.currentIndex + 1
      : this.currentIndex;

    this.view.enableBtn('next', this.currentIndex !== (this.presenters.length - 1));
    this.view.enableBtn('prev', true);

    champ.events.trigger('presenter:show', this.presenters[this.currentIndex].id);
  },

  onPrevClick: function(e) {
    e.preventDefault();
    this.onPrev();
  },

  onPrev: function() {
    this.currentIndex = this.currentIndex > 0
      ? this.currentIndex - 1
      : this.currentIndex;

    this.view.enableBtn('prev', !!this.currentIndex);
    this.view.enableBtn('next', true);

    champ.events.trigger('presenter:show', this.presenters[this.currentIndex].id);
  },

  onSetBtnState: function(btns) {
    for(var b in btns) {
      this.view.enableBtn(b, btns[b]);
    }
  },

  onSetBtnLabel: function(btns) {
    for(var b in btns) {
      this.view.setBtnLabel(b, btns[b]);
    }
  },

  onNavigationHide: function() {
    this.view.container.slideDown();
  },

  onNavigationShow: function() {
    this.view.container.slideUp();
  }

});