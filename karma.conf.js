"use strict";

module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'src/static/bower_components/jquery/dist/jquery.js',
            'src/static/bower_components/foundation/js/foundation.js',
            'src/static/bower_components/angular/angular.js',
            'src/static/bower_components/angular-route/angular-route.js',
            'src/static/bower_components/angular-resource/angular-resource.js',
            'src/static/bower_components/angular-sanitize/angular-sanitize.js',
            'src/static/bower_components/angular-animate/angular-animate.js',
            'src/static/bower_components/angular-mocks/angular-mocks.js',
            'src/static/ng-app/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};