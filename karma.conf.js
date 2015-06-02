module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'src/static/bower_components/angular/angular.js',
      'src/static/bower_components/angular-route/angular-route.js',
      'src/static/bower_components/angular-mocks/angular-mocks.js',
      'src/static/ng-app/**/*.js',
      'src/static/ng-app/view*/**/*.js'
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
