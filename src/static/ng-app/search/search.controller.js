(function(angular) {
    "use strict";

    angular.module('app.search')
        .controller('SearchCtrl', ['$scope', '$route', '$sanitize', 'Api',
            function ($scope, $route, $sanitize, Api) {
                $scope.$route = $route;
                $scope.query = $route.current.params.q || '';

                if ($scope.query) {
                    $scope.results = Api.search.query({q: $scope.query});
                }
            }]);
})(angular);