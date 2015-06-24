(function(angular) {
    "use strict";

    angular.module('app.play')
        .controller('PlayCtrl', ['$routeParams', 'Api', 'MediaPlayerManager',
            function($routeParams, Api, MediaPlayerManager) {
                this.episodeId = $routeParams.episodeId;
                this.captions = Api.captions.query({'episode_id': this.episodeId});
                MediaPlayerManager.setCurrentTime($routeParams.t || 0);
            }
        ]);
})(angular);
