module.exports = function (grunt) {
  'use strict';


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        indent: 2,
        plusplus: true,
        quotmark: 'single',
        latedef: true,
        undef: true,
        unused: true,
        maxlen: 80,
        strict: true,
        laxcomma: true,
        node: true
      },
      defaults: [
        'Gruntfile.js',
        'services.js',
        'lib/**/*.js',
        'routes/**/*.js'
      ],
      tests: {
        options: {
          unused: false,
          camelcase: false,
          globals: {
            describe: true,
            it: true,
            before: true,
            beforeEach: true,
            after: true,
            afterEach: true
          }
        },
        src: [ 
          'tests/**/*.js',
          'Gruntfile.js'
        ]        
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/**/*.js'
        ]
      }
    }    
  });

  // npm tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  // grunt tasks
  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('default', ['test']);
};