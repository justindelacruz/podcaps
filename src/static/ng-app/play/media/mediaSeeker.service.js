(function(angular) {
    'use strict';

    angular.module('app.play')
        .factory('MediaSeeker', function() {
            var _currentTime = 0,
                _mediaPlayer;

            return {
                getCurrentTime: getCurrentTime,
                setCurrentTime: setCurrentTime,
                setMediaPlayer: setMediaPlayer,
                seekTo: seekTo
            };

            function getCurrentTime() {
                return _currentTime;
            }

            function setCurrentTime(newTime) {
                _currentTime = newTime;
            }

            function setMediaPlayer(player) {
                _mediaPlayer = player;
            }

            function seekTo(time) {
                _mediaPlayer.currentTime(time);
            }
        });
})(angular);
