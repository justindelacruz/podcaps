(function() {
    'use strict';

    // Foundation JavaScript
    $(document).foundation();

    // Declare app level module which depends on views, and components
    angular.module('myApp', [
        'ngRoute',
        'ngSanitize',
        'ngAnimate',
        'myApp.home',
        'myApp.search',
        'myApp.play',
        'myApp.nav',
        'myApp.nightValeServices'
    ])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
            $locationProvider.html5Mode(true);
        }])
        .config(['$resourceProvider', function($resourceProvider) {
            // Don't strip trailing slashes from calculated URLs
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]);
})();
