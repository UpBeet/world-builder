module.exports = function (grunt) {
  'use strict';

  var testFiles = ['tests/**/*.js'],
      srcFiles = ['src/**/*.js'],
      buildFiles = 'build/',
      scssFiles = ['src/css/*.scss'],
      scssDir = 'src/scss',
      jsFiles = srcFiles.concat(testFiles);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Delete all files in the build dir, to ensure clean builds everytime
    clean: {
      build: {
        src: buildFiles
      }
    },
    // Copy main html page to build folder
    copy: {
      main: {
        src: 'src/index.html',
        dest: 'build/index.html'
      }
    },
    // Compile scss to css files
    sass: {
      dist: {
        files: {
          'build/style.css': 'src/scss/main.scss'
        }
      }
    },
    // Write node require() code in the browser
    // Convert ES6 to ES5 before hand with Babel
    browserify: {
      options: {
        transform: [
          'babelify',
        ]
      },
      dev: {
        files: {
          'build/app.js': srcFiles
        }
      },
      prod: {
        files: {
          'build/app.js': srcFiles
        }
      }
    },

    watch: {
      js: {
        options: { spawn: false, },
        files: jsFiles,
        tasks: ['default']
      }
    }
  });

  // Load plugins
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['build']);

  grunt.registerTask('build-dev', ['clean', 'browserify:dev', 'copy', 'sass']);
  grunt.registerTask('build-prod', ['clean', 'browserify:prod', 'copy']);
  grunt.registerTask('build', 'build-dev');

  grunt.registerTask('prod', ['build-prod']);
};
