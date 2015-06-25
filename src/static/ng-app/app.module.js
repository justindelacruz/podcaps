(function(angular) {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('app', [
        'ngRoute',
        'ngSanitize',
        'ngAnimate',
        'app.home',
        'app.search',
        'app.play',
        'app.nav',
        'app.nightValeServices',
        'app.templates'
    ])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
            $locationProvider.html5Mode(true);
        }])
        .config(['$resourceProvider', function($resourceProvider) {
            // Don't strip trailing slashes from calculated URLs
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]);
})(angular);
