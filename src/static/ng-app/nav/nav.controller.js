(function(angular) {
    "use strict";

    angular.module('app.nav', ['ngRoute'])
        .controller('NavCtrl', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
            // $routeParams is populated asynchronously, so we subscribe to when its notified.
            $scope.$on('$routeChangeSuccess', function() {
                $scope.text = $routeParams.q || '';
            });
            
            $scope.submit = function() {
                $location.path('search');
                $location.search('q', this.text);
            };
        }]);
})(angular);