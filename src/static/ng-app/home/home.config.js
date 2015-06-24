(function(angular) {
    "use strict";

    angular.module('app.home')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/static/ng-app/home/home.tpl.html',
                controller: 'HomeCtrl'
            });
        }]);
})(angular);