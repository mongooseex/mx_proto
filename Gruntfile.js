'use strict';

var jsSrc = 'public/js/src/'

  , jsBuild = 'public/js/build/'

  , cssSrc = 'public/css/'

  , cssBuild = 'public/scss/';

module.exports = function(grunt) {

  var buildComponent = function(comp, opts) {
    if(opts.override) { return opts.override; }

    var baseDir = (buildComponent.baseDir = buildComponent.baseDir || jsSrc + 'components/') + comp

      , order = { 'models': '', 'views': '', 'presenters': '' }

      , expand = grunt.file.expand

      , files = opts.noPartials
        ? []
        : [baseDir + '/' + comp + '.intro.js'];

    Object.keys(order).forEach(function(i) {
        files = files.concat(expand([baseDir, i, order[i] || '**/*.js'].join('/')));
    });

    files.push(baseDir + '/' + comp + '.js');

    return opts.noPartials
      ? files
      : files.concat([baseDir + '/' + comp + '.outro.js']);
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      all: {
        files: [{
          expand: true,
          cwd: 'public/js/build',
          src: ['**/*.js', '!**/*.min.js', '!libs.js'],
          dest: 'public/js/build',
          ext: '.min.js',
          extDot: 'last'
        }]
      }
    },

    concat: {
      init: {
        src: [
          jsSrc + 'libs/jquery/*.js',
          jsSrc + 'libs/bootstrap/*.js',
          jsSrc + 'libs/champion/*.js'
        ],

        dest: jsBuild + 'libs.js'
      },

      dev: {
        files: (function() {
          var concatFiles = {};

          grunt.file.expand(jsSrc + 'components/*').forEach(function(dir) {
            var fName = dir.substring(dir.lastIndexOf('/') + 1)

              , override = grunt.file.exists(dir + '/build.json') && grunt.file
                .readJSON(dir + '/build.json')
                .map(function(i) { return jsSrc + 'components/' + fName + '/' + i; });

            concatFiles[jsBuild + fName + '.js'] = buildComponent(fName, { override: override });
          });

          return concatFiles;
        }())
      }
    },

    sass: {
      dev: {
        options: {
          trace: true,

          style: 'expanded'
        },

        files: [{
          expand: true,
          cwd: 'public/scss',
          src: ['**/*.scss'],
          dest: 'public/css',
          ext: '.css',
          extDot: 'last'
        }]
      },

      prod: {
        options: {
          style: 'compressed'
        },

        files: [{
          expand: true,
          cwd: 'public/scss',
          src: ['**/*.scss'],
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },
    
    watch: {
      js: {
        files: [jsSrc + '**/*.js'],

        tasks: ['concat:dev']
      },

      css: {
        files: [cssBuild + '**/*.scss'],

        tasks: ['sass:dev']
      },

      test: {
        files: [jsSrc + '**/*.js', 'test/spec/**/*.js'],

        tasks: ['concat:dev', 'jasmine']
      }
    },

    nodemon: {
      dev: {
        script: 'app.js',

        options: {
          ext: 'js,json',

          ignore: ['node_modules/**', 'public/**']
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['watch:js', 'watch:css', 'nodemon:dev'],

        options: {
          logConcurrentOutput: true
        }
      }
    },

    jasmine: {
      browser: {
        src: [
          //todo: clean up
          jsSrc + 'components/signup/models/*.js',
          jsSrc + 'components/signup/views/NavigationView.js',
          jsSrc + 'components/signup/views/WizardView.js',
          jsSrc + 'components/signup/views/BasicInfoView.js',
          jsSrc + 'components/signup/views/OtherInfoView.js',
          jsSrc + 'components/signup/views/SubmitSignupView.js',
          jsSrc + 'components/signup/views/VerifyEmailView.js',
          jsSrc + 'components/signup/presenters/NavigationPresenter.js',
          jsSrc + 'components/signup/presenters/WizardPresenter.js',
          jsSrc + 'components/signup/presenters/BasicInfoPresenter.js',
          jsSrc + 'components/signup/presenters/OtherInfoPresenter.js',
          jsSrc + 'components/signup/presenters/SubmitSignupPresenter.js',
          jsSrc + 'components/signup/presenters/VerifyEmailPresenter.js',

          //jsSrc + '**/*.js',
          '!' + jsSrc + 'partials/**/*.js',
          '!' + jsSrc + 'libs/**/*.js',
          '!' + jsSrc + 'signup.js'
        ],

        options: {
          specs: 'test/spec/**/*.js',

          vendor: [
            'node_modules/sinon/pkg/sinon.js',
            'node_modules/chai/chai.js',
            'public/js/build/libs.js'
          ],

          helpers: 'test/helpers/*.js',
          
          outfile: 'test/_SpecRunner.html',

          keepRunner: true
        }
      }
    },

    'json-replace': {
      run: {
        options: {
          replace: {
            appSettings: {
              proxy: {
                host: 'localhost'
              }
            }
          }
        },

        files: [{
          src: 'settings.json',
          dest: 'settings.json'
        }]
      },

      build: {
        options: {
          replace: {
            appSettings: {
              proxy: {
                host: 'mongoosex-services.herokuapp.com'
              }
            }
          }
        },

        files: [{
          src: 'settings.json',
          dest: 'settings.json'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-json-replace');

  grunt.registerTask('init', ['concat']);
  grunt.registerTask('test', 'jasmine');
  grunt.registerTask('run', ['json-replace:run', 'concurrent']);
  grunt.registerTask('build', ['uglify:all', 'sass:prod', 'json-replace:build']);
};