;(function($, champ, undefined) {
  'use strict';

  $(function() {
    var basicInfoPresenter = new WizardPresenter({
        id: 'basicInfoPresenter',
        viewContainer: '.js-basic-info-view'
      })
      
      , otherInfoPresenter = new WizardPresenter({
        id: 'otherInfoPresenter',
        viewContainer: '.js-other-info-view'
      })

      , navigationPresenter = new NavigationPresenter({
        presenters: [
          basicInfoPresenter,
          otherInfoPresenter
        ]
      });
  });

}(jQuery, champ));