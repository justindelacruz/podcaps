(function(angular, $) {
    "use strict";

    angular.module('app.play', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/play/:series/:episodeId', {
                templateUrl: '/static/ng-app/play/play.html',
                controller: 'PlayCtrl'
            });
        }])

        .controller('PlayCtrl', ['$scope', '$routeParams', '$sanitize', 'Popcorn', 'Api',
            function($scope, $routeParams, $sanitize, Popcorn, Api) {
                $scope.time = $routeParams.t || 0;
                $scope.episodeId = $routeParams.episodeId;
                $scope.captions = Api.captions.query({'episode_id': $scope.episodeId});

                var pop = Popcorn.smart("#audio", "http://soundcloud.com/nightvaleradio/" + $scope.episodeId);
                pop.controls(true);
                pop.on("timeupdate", function() {
                    var self = this;
                    $scope.$apply(function() {
                        $scope.time = self.currentTime();
                    });
                });

                pop.on("canplayall", function() {
                    pop.currentTime($scope.time);
                    pop.play();
                });



                $scope.$watch(function() {return $('.caption-text.active').attr('data-start'); }, function(newValue, oldValue) {
                    var a = $('.captions').find('[data-start="'+newValue+'"]');

                    if (a.length > 0) {
                        var pos = a.position().top-90;
                        var completeCalled = false;
                        $("html, body").animate({ scrollTop: pos + "px" }, {
                            complete : function() {
                                if(!completeCalled) {
                                    completeCalled = true;
                                }
                            }
                        });
                    }
                });



                $scope.seek = function($event) {
                    var newTime = $($event.target).data('start');
                    $scope.time = newTime;
                    pop.currentTime(newTime);
                };
            }
        ]);
})(angular, jQuery);
