(function() {
  'use strict';

  var expect = chai.expect;

  jasmine.getFixtures().fixturesPath = 'fixtures';

  describe('Wizard Spec', function() {
    beforeEach(function() {
      loadFixtures('Wizard.fixture.html');

      champ.ioc.reset();
      champ.ioc.register('WizardView', WizardView);

      WizardView.extend('TestView1', { container: '#js-wizard-1' });
      WizardView.extend('TestView2', { container: '#js-wizard-2' });

      var TestPresenter1 = WizardPresenter.extend('TestPresenter1', { views: ['TestView1'] })
        , TestPresenter2 = WizardPresenter.extend('TestPresenter2', { views: ['TestView2'] });

      this.triggerSpy = sinon.spy(champ.events, 'trigger');

      this.presenter1 = new TestPresenter1({
        id: 'presenter1'
      });

      this.presenter2 = new TestPresenter2({
        id: 'presenter2'
      });

      this.view1 = this.presenter1.view;
      this.view2 = this.presenter2.view;
    });

    afterEach(function() {
      this.triggerSpy.restore();
    });

    describe('Show event', function() {
      it('Shows itself when the presenter:show event is triggered with the presenters ID', function() {
        champ.events.trigger('presenter:show', 'presenter2');

        expect(this.view2.container.hasClass('show')).to.be.true;
      });

      it('Hides itself when the presenter:show event is triggered without the presenters ID', function() {
        expect(this.view1.container.hasClass('show')).to.be.true;

        champ.events.trigger('presenter:show', 'presenter2');

        expect(this.view1.container.hasClass('show')).to.be.false;
      });
    });
  });

}());