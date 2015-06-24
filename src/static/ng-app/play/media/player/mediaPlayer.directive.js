(function (angular) {
    "use strict";

    angular.module('app.play')
        .directive('pcMediaPlayer', ['Popcorn', 'MediaPlayerManager', function(Popcorn, MediaPlayerManager) {
            return {
                scope: {
                    type: '@',
                    series: '@',
                    episodeId: '='
                },
                restrict: 'E',
                templateUrl: 'static/ng-app/play/media/player/mediaPlayer.tpl.html',
                link: function(scope, element, attr) {
                    var mediaUrl,
                        mediaPlayer;

                    if(scope.type === 'soundcloud') {
                        mediaUrl = 'http://soundcloud.com/' + scope.series + '/' + scope.episodeId;
                    }

                    mediaPlayer = Popcorn.smart(element.find('.media-player')[0], mediaUrl);
                    mediaPlayer.controls(true);
                    mediaPlayer.on("timeupdate", function() {
                        scope.$apply(function() {
                            MediaPlayerManager.setCurrentTime(mediaPlayer.currentTime());
                        });
                    });

                    mediaPlayer.on("canplayall", function() {
                        mediaPlayer.currentTime( MediaPlayerManager.getCurrentTime() );
                        mediaPlayer.play();
                    });

                    MediaPlayerManager.setMediaPlayer(mediaPlayer);
                }
            };
        }]);
})(angular);