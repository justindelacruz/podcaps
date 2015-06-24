(function(angular) {
    "use strict";

    angular.module('app.play')
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/play/:series/:episodeId', {
                templateUrl: 'static/ng-app/play/play.tpl.html',
                controller: 'PlayCtrl'
            });
        }]);
})(angular);
