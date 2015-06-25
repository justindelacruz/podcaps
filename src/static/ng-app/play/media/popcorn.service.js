(function(angular) {
    'use strict';

    angular.module('app.play')
        .factory('Popcorn', ['$window', function($window) {
            return $window.Popcorn;
        }]);
})(angular);