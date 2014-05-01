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