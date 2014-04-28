var userModel = new UserSignupModel();

$(function() {
  var basicInfoPresenter = new BasicInfoPresenter({ id: 'basicInfoPresenter', userModel: userModel })
    
    , otherInfoPresenter = new OtherInfoPresenter({ id: 'otherInfoPresenter', userModel: userModel })

    , submitSignupPresenter = new SubmitSignupPresenter({ id: 'submitSignupPresenter', userModel: userModel })

    , verifyEmailPresenter = new VerifyEmailPresenter({ id: 'verifyEmailPresenter', userModel: userModel })

    , navigationPresenter = new NavigationPresenter({
      presenters: [
        basicInfoPresenter,
        otherInfoPresenter,
        submitSignupPresenter,
        verifyEmailPresenter
      ]
    });
});