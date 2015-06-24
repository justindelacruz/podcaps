(function(angular) {
    "use strict";

    angular.module('app.home')
        .controller('HomeCtrl', ['$scope', 'Api',
            function ($scope, Api) {
                Api.episodes.get({series: 'nightvaleradio'}).$promise.then(function(episodes) {
                    $scope.episodes = episodes;
                });
            }
        ]);
})(angular);