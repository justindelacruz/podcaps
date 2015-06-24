(function(angular) {
    "use strict";

    angular.module('app.search')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/search', {
                templateUrl: 'static/ng-app/search/search.tpl.html',
                controller: 'SearchCtrl'
            });
        }]);
})(angular);
