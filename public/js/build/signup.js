;(function($, champ, undefined) {
  'use strict';
  
var SubmitSignupModel = champ.model.extend('SubmitSignupModel', {
  
  properties: {
    apiEndpoint: ''
  }

});
var UserSignupModel = champ.model.extend('UserSignupModel', {
  
  properties: {
    displayName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    state: '',
    bio: ''
  }

});
var NavigationView = champ.view.extend('NavigationView', {

  container: '.js-navigation-view',

  $: {
    prevBtn: '.js-prev-btn : click',
    nextBtn: '.js-next-btn : click'
  },

  init: function(options) { },

  enableBtn: function(btn, enable) {
    this.$[btn + 'Btn'].attr('disabled', !enable);
  },

  setBtnLabel: function(btn, label) {
    this.$[btn + 'Btn'].text(label);
  }

});
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
var BasicInfoView = WizardView.extend('BasicInfoView', {

  container: '.js-basic-info-view',

  $: {
    displayName   : '.js-display-name-input : change keyup blur',
    email         : '.js-email-input : change keyup blur',
    password1     : '.js-password-1-input : change keyup blur',
    password2     : '.js-password-2-input : change keyup blur'
  }

});
var OtherInfoView = WizardView.extend('OtherInfoView', {
  
  container: '.js-other-info-view',

  $: {
    profileImg    : '.js-profile-file : change fileselect',
    profileLabel  : '.js-profile-input : change blur',
    dob           : '.js-dob-input : change keyup blur',
    gender        : '.js-gender-input : change keyup blur',
    city          : '.js-city-input : change keyup blur',
    state         : '.js-state-input : change keyup blur',
    bio           : '.js-bio-input : change keyup blur'
  },

  init: function(options) {
    $(document).on('change', '.btn-file :file', function(e) {
      var input = $(this)
        , numFiles = (input.get(0).files || [0]).length
        , label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

      input.trigger('fileselect', [numFiles, label]);
    });
  }

});
var SubmitSignupView = WizardView.extend('SubmitSignupView', {

  container: '.js-submit-signup-view',

  $: {},

  init: function(options) {}

});
var VerifyEmailView = WizardView.extend('VerifyEmailView', {

  container: '.js-verify-signup-view',

  $: {
    verifyCodeText  : '.js-verify-code-input : keyup change blur',
    resendEmailLink : '.js-resend-email'
  },

  init: function(options) {}

});
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
var BasicInfoPresenter = WizardPresenter.extend('BasicInfoPresenter', {

  views: ['BasicInfoView'],

  init: function(options) {
    this.userModel = options.userModel;
    this.models.push(options.userModel);

    var eventName = 'view:' + this.view.id + ':';

    for(var el in this.view.$) {
      champ.events
        .on(eventName + el + ' change', this.updateModel.bind(this, this.userModel))
        .on(eventName + el + ' keyup', this.updateModel.bind(this, this.userModel));
    }
  },

  onShow: function(id) {
    if(WizardPresenter.prototype.onShow.call(this, id)) {
      champ.events.trigger('navigation:buttons:label', { next: 'Next' });
    }
  }

});
var OtherInfoPresenter = WizardPresenter.extend('OtherInfoPresenter', {

  views: ['OtherInfoView'],

  init: function(options) {
    this.userModel = options.userModel;
    this.models.push(options.userModel);

    var eventName = 'view:' + this.view.id + ':';

    for(var el in this.view.$) {
      champ.events
        .on(eventName + el + ' change', this.updateModel.bind(this, this.userModel))
        .on(eventName + el + ' keyup', this.updateModel.bind(this, this.userModel));
    }

    this.view.$.profileImg.on('fileselect', this.onProfileImgSelect.bind(this));
  },

  onShow: function(id) {
    if(WizardPresenter.prototype.onShow.call(this, id)) {
      champ.events
        .trigger('navigation:buttons:state', { next: this.isValid })
        .trigger('navigation:buttons:label', { next: 'Done' });
    }
  },

  onProfileImgSelect: function(e, numFiles, label) {
    this.view.$.profileLabel.val(label);
  },

  validateForm: function(e) {
    var temp = this.view.$.profileLabel;
    delete this.view.$.profileLabel;

    var valid = WizardPresenter.prototype.validateForm.call(this, e);

    this.view.$.profileLabel = temp;

    return valid;
  }

});
var SubmitSignupPresenter = WizardPresenter.extend('SubmitSignupPresenter', {

  views: ['SubmitSignupView'],

  models: ['SubmitSignupModel'],

  init: function(options) {
    this.userModel = options.userModel;
    this.models.push(options.userModel);

    this.model.property('apiEndpoint', $('script[data-api-endpoint]').data('apiEndpoint'));
  },

  onShow: function(id) {
    if(WizardPresenter.prototype.onShow.call(this, id)) {
      champ.events.trigger('navigation:buttons:state', {
        prev: false,
        next: false
      });

      setTimeout(this.signupRequest.bind(this), 2000);
    }
  },

  signupRequest: function() {
    $.ajax({
      type: 'POST',
      url: this.model.property('apiEndpoint') + 'users',
      dataType: 'json',
      data: this.userModel.properties
    })
    .done(this.signupRequestSuccess)
    .fail(this.signupRequestError);
  },

  signupRequestSuccess: function(data, textStatus, jqXhr) {
    champ.events.trigger('navigation:next');
  },

  signupRequestError: function(jqXhr, textStatus, errorThrown) {
    champ.events.trigger('navigation:next');
  }

});
var VerifyEmailPresenter = WizardPresenter.extend('VerifyEmailPresenter', {

  views: ['VerifyEmailView'],

  init: function(options) {
    champ.events
      .on('view:' + this.view.id + ':verifyCodeText change', this.validateCode.bind(this))
      .on('view:' + this.view.id + ':verifyCodeText keyup', this.validateCode.bind(this))
      .on('view:' + this.view.id + ':verifyCodeText blur', this.validateCode.bind(this));
  },

  onShow: function(id) {
    if(WizardPresenter.prototype.onShow.call(this, id)) {
      champ.events
        .trigger('navigation:buttons:state', {
          prev: false,
          next: false
        })
        .trigger('navigation:buttons:label', { next: 'Verify' });
    }
  },

  validateCode: function(e) {
    champ.events.trigger('navigation:buttons:state', {
      next: this.view.$.verifyCodeText.val().trim() !== ''
    });
  }

});
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
}(jQuery, champ));