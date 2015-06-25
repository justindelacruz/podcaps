(function (angular, $) {
    "use strict";

    angular.module('app.play')
        .directive('pcMediaCaption', ['MediaSeeker', function(MediaSeeker) {
            return {
                scope: {
                    model: '='
                },
                restrict: 'E',
                templateUrl: 'static/ng-app/play/media/caption/mediaCaption.tpl.html',
                link: function(scope, element, attr) {
                    scope.time = 0;
                    scope.isActive = _isActive;
                    scope.seekTo = _seekTo;

                    var isCaptionActive = false;
                    scope.$watch(function() { return MediaSeeker.getCurrentTime(); }, function (newTime, oldTime) {
                        if (newTime !== oldTime) {
                            scope.time = newTime;
                            if (_isActive(newTime)) {
                                if (!isCaptionActive) {
                                    isCaptionActive = true;
                                    _scrollTo(element);
                                }
                            } else {
                                isCaptionActive = false;
                            }
                        }
                    });

                    function _isActive(time) {
                        return time >= scope.model.start && time < scope.model.end;
                    }

                    function _scrollTo(element) {
                        var pos = element.position().top-90;
                        var hasAnimated = false;

                        $("html, body").animate({ scrollTop: pos + "px" }, {
                            complete : function() {
                                // Required because $("html, body") will call animate() twice
                                if (!hasAnimated) {
                                    hasAnimated = true;
                                }
                            }
                        });
                    }

                    function _seekTo($event, time) {
                        MediaSeeker.seekTo(time);
                    }
                }
            };
        }]);
})(angular, jQuery);