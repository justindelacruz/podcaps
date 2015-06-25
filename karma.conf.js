"use strict";

module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'src/static/bower_components/jquery/dist/jquery.js',
            'src/static/bower_components/angular/angular.js',
            'src/static/bower_components/angular-route/angular-route.js',
            'src/static/bower_components/angular-resource/angular-resource.js',
            'src/static/bower_components/angular-sanitize/angular-sanitize.js',
            'src/static/bower_components/angular-animate/angular-animate.js',
            'src/static/bower_components/angular-mocks/angular-mocks.js',
            'src/static/bower_components/justindelacruz-popcorn-js/popcorn.js',
            'src/static/bower_components/justindelacruz-popcorn-js/modules/player/popcorn.player.js',
            'src/static/bower_components/justindelacruz-popcorn-js/wrappers/common/popcorn._MediaElementProto.js',
            'src/static/bower_components/justindelacruz-popcorn-js/wrappers/soundcloud/popcorn.HTMLSoundCloudAudioElement.js',
            'src/static/ng-app/**/*.module.js',
            'src/static/js-dist/templates.js',
            'src/static/ng-app/**/*'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ]
    });
};