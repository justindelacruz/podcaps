(function(angular) {
    "use strict";

    angular.module('app.play', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/play/:series/:episodeId', {
                templateUrl: '/static/ng-app/play/play.html',
                controller: 'PlayCtrl'
            });
        }])

        .controller('PlayCtrl', ['$scope', '$routeParams', 'Api', 'MediaPlayerManager',
            function($scope, $routeParams, Api, MediaPlayerManager) {
                $scope.episodeId = $routeParams.episodeId;
                $scope.captions = Api.captions.query({'episode_id': $scope.episodeId});
                MediaPlayerManager.setCurrentTime($routeParams.t || 0);
            }
        ]);
})(angular);
