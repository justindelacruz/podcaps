(function(angular) {
    "use strict";

    angular.module('app.search')
        .controller('SearchCtrl', ['$route', '$sanitize', 'Api',
            function ($route, $sanitize, Api) {
                this.query = $route.current.params.q || '';

                if (this.query) {
                    this.results = Api.search.query({q: this.query});
                }
            }]);
})(angular);
