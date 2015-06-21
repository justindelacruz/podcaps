(function(angular) {
    "use strict";

    angular.module('app.home', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/static/ng-app/home/home.html',
                controller: 'HomeCtrl'
            });
        }])

        .controller('HomeCtrl', ['$scope', '$location', 'Api',
            function ($scope, $location, Api) {
                Api.episodes.get({series: 'nightvaleradio'}).$promise.then(function(episodes) {
                    $scope.episodes = episodes;
                });
            }
        ]);
})(angular);