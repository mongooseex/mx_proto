(function() {
  'use strict';

  var expect = chai.expect
    , TestPresenter = champ.presenter.extend('TestPresenter', {
      views: ['TestView'],

      events: {
        'presenter:show': 'onShow'
      },

      onShow: sinon.spy()
    });

  jasmine.getFixtures().fixturesPath = 'fixtures';

  describe('SignupNavigation Spec', function() {
    beforeEach(function() {
      loadFixtures('SignupNavigation.fixture.html');

      champ.ioc.reset();
      champ.ioc
        .register('NavigationView', NavigationView)
        .register('TestView', champ.view);

      this.triggerSpy = sinon.spy(champ.events, 'trigger');

      this.presenter = new NavigationPresenter({
        presenters: [
          new TestPresenter({ id: 'pre1' }),
          new TestPresenter({ id: 'pre2' }),
          new TestPresenter({ id: 'pre3' })
        ]
      });

      this.view = this.presenter.view;
    });

    afterEach(function() {
      this.triggerSpy.restore();
    });

    describe('Click next', function() {
      beforeEach(function() {
        this.view.$.nextBtn.trigger('click');
      });

      it('Tells the next view to show itself', function() {
        expect(this.triggerSpy.getCall(1)).to.be.calledWithExactly('presenter:show', 'pre2');
      });

      it('Enables the "previous" button if the first view isn\'t visible', function() {
        expect(this.view.$.prevBtn.attr('disabled')).to.be.undefined;
      });

      it('Enables the "next" button if the last view isn\'t visible', function() {
        expect(this.view.$.nextBtn.attr('disabled')).to.be.undefined;
      });

      it('Disables the "next" button if the last view is visible', function() {
        this.view.$.nextBtn.trigger('click');
        expect(this.view.$.nextBtn.attr('disabled')).to.equal('disabled');
      });
    });

    describe('Click previous', function() {
      beforeEach(function() {
        this.presenter.currentIndex = 2;
        this.view.$.prevBtn.trigger('click');
      });

      it('Tells the previous view to show itself', function() {
        expect(this.triggerSpy.getCall(1)).to.be.calledWithExactly('presenter:show', 'pre2');
      });

      it('Enables the "next" button if the last view isn\'t visible', function() {
        expect(this.view.$.nextBtn.attr('disabled')).to.be.undefined;
      });

      it('Enables the "previous" button if the first view isn\'t visible', function() {
        expect(this.view.$.prevBtn.attr('disabled')).to.be.undefined;
      });

      it('Disables the "previous" button if the first view is visible', function() {
        this.view.$.prevBtn.trigger('click');
        expect(this.view.$.prevBtn.attr('disabled')).to.equal('disabled');
      });
    });
  });

}());