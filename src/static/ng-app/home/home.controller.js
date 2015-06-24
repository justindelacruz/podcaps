(function(angular) {
    "use strict";

    angular.module('app.home')
        .controller('HomeCtrl', ['Api', function (Api) {
            this.episodes = [];

            var self = this; // TODO: Do this with angular.bind instead
            Api.episodes.get({series: 'nightvaleradio'}).$promise.then(function(episodes) {
                self.episodes = episodes;
            });
        }]);
})(angular);