(function(angular) {
    "use strict";

    angular.module('myApp.home', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/static/ng-app/home/home.html',
                controller: 'HomeCtrl'
            });
        }])

        .controller('HomeCtrl', ['$scope', '$location', 'Api',
            function ($scope, $location, Api) {
                $scope.episodes = Api.episodes.get({series: 'nightvaleradio'});
            }
        ]);
})(angular);