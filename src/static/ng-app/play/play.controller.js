(function(angular) {
    "use strict";

    angular.module('app.play')
        .controller('PlayCtrl', ['$routeParams', 'Api', 'MediaSeeker',
            function($routeParams, Api, MediaSeeker) {
                this.episodeId = $routeParams.episodeId;
                this.captions = Api.captions.query({'episode_id': this.episodeId});
                MediaSeeker.setCurrentTime($routeParams.t || 0);
            }
        ]);
})(angular);
