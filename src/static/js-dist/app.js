(function(angular) {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('app', [
        'ngRoute',
        'ngSanitize',
        'ngAnimate',
        'app.home',
        'app.search',
        'app.play',
        'app.nav',
        'app.nightValeServices',
        'app.templates'
    ])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
            $locationProvider.html5Mode(true);
        }])
        .config(['$resourceProvider', function($resourceProvider) {
            // Don't strip trailing slashes from calculated URLs
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]);
})(angular);
;(function(angular) {
    "use strict";

    angular.module('app.home', ['ngRoute']);
})(angular);;(function(angular) {
    "use strict";

    angular.module('app.play', ['ngRoute']);
})(angular);
;(function(angular) {
    "use strict";

    angular.module('app.search', ['ngRoute']);
})(angular);
;(function(angular) {
    'use strict';

    angular.module('app.nightValeServices', ['ngResource']);
})(angular);
;(function(angular) {
    "use strict";

    angular.module('app.home')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'static/ng-app/home/home.tpl.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            });
        }]);
})(angular);;(function(angular) {
    "use strict";

    angular.module('app.home')
        .controller('HomeCtrl', ['Api', function (Api) {
            this.episodes = [];

            var self = this; // TODO: Do this with angular.bind instead
            Api.episodes.get({series: 'nightvaleradio'}).$promise.then(function(episodes) {
                self.episodes = episodes;
            });
        }]);
})(angular);;(function(angular) {
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
})(angular);;(function (angular, $) {
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
})(angular, jQuery);;(function(angular) {
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
;(function (angular) {
    "use strict";

    angular.module('app.play')
        .directive('pcMediaPlayer', ['Popcorn', 'MediaSeeker', function(Popcorn, MediaSeeker) {
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
                            MediaSeeker.setCurrentTime(mediaPlayer.currentTime());
                        });
                    });

                    mediaPlayer.on("canplayall", function() {
                        mediaPlayer.currentTime( MediaSeeker.getCurrentTime() );
                        mediaPlayer.play();
                    });

                    MediaSeeker.setMediaPlayer(mediaPlayer);
                }
            };
        }]);
})(angular);;(function(angular) {
    'use strict';

    angular.module('app.play')
        .factory('Popcorn', ['$window', function($window) {
            return $window.Popcorn;
        }]);
})(angular);;(function(angular) {
    "use strict";

    angular.module('app.play')
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/play/:series/:episodeId', {
                templateUrl: 'static/ng-app/play/play.tpl.html',
                controller: 'PlayCtrl',
                controllerAs: 'play'
            });
        }]);
})(angular);
;(function(angular) {
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
;(function(angular) {
    "use strict";

    angular.module('app.search')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/search', {
                templateUrl: 'static/ng-app/search/search.tpl.html',
                controller: 'SearchCtrl',
                controllerAs: 'search'
            });
        }]);
})(angular);
;(function(angular) {
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
;(function(angular) {
    'use strict';

    angular.module('app.nightValeServices')
        .factory('Api', ['$resource', function($resource) {
            return {
                search: $resource('/api/search/nightvaleradio/', {}, {
                    query: {method: 'GET', isArray: true}
                }),
                captions: $resource('/api/captions/nightvaleradio/:episode_id', {}, {
                    query: {method: 'GET'}
                }),
                episodes: $resource('/api/episodes/:series/')
            };
        }
    ]);
})(angular);
;angular.module('app.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("static/ng-app/home/home.tpl.html",
    "<div class=\"medium-12 column hero\"> <h2><span class=\"hero-text-caption\">Captions</span> for podcasts.</h2> <p> Podcaps help you read along with popular podcasts. </p> </div> <div class=\"row\"> <div class=\"large-12 column\"> <h3><strong>Welcome to Night Vale</strong></h3> <p> \"Welcome to Night Vale\" is a twice-monthly podcast in the style of community updates for the small desert town of Night Vale, featuring local weather, news, announcements from the Sheriff's Secret Police, mysterious lights in the night sky, dark hooded figures with unknowable powers, and cultural events. </p> <h4>Episodes of Welcome to Night Vale with captions:</h4> </div> <div class=\"large-12 column episode\" ng-repeat=\"episode in home.episodes.episodes\"> <img src=\"/static/images/night-vale-radio.jpg\">\n" +
    "<a ng-href=\"play/{{ episode.series }}/{{ episode.episode }}\" ng-bind-html=\"episode.title\">{{ episode.title }}</a> </div> </div>");
  $templateCache.put("static/ng-app/play/media/caption/mediaCaption.tpl.html",
    "<span class=\"caption-text\" data-start=\"{{model.start}}\" data-end=\"{{model.end}}\" ng-class=\"{'active': isActive(time)}\" ng-bind-html=\"model.text\" ng-click=\"seekTo($event, model.start)\"> </span>");
  $templateCache.put("static/ng-app/play/media/player/mediaPlayer.tpl.html",
    "<div class=\"media-player\"></div>");
  $templateCache.put("static/ng-app/play/play.tpl.html",
    "<div class=\"row\"> <div class=\"captions medium-12 column\"> <pc-media-caption ng-repeat=\"caption in play.captions.captions\" model=\"caption\"></pc-media-caption> </div> </div> <pc-media-player type=\"soundcloud\" series=\"nightvaleradio\" episode-id=\"play.episodeId\"></pc-media-player>");
  $templateCache.put("static/ng-app/search/search.tpl.html",
    "<section id=\"search\"> <div class=\"row\"> <div class=\"small-12\"> <h2> Results for <em>{{ search.query }}</em> </h2> </div> <hr> <h3>Podcast: <strong>Welcome to Night Vale</strong></h3> <hr> </div> <ul class=\"no-bullet\"> <li ng-repeat=\"result in search.results\"> <div class=\"row\"> <div class=\"small-12\"> <h4><a ng-href=\"play/{{ result.series }}/{{ result.episode }}?t={{ result.start }}\" ng-bind-html=\"result.title\"></a></h4> <p ng-bind-html=\"result.text\"></p> </div> </div> </li> </ul> </section>");
}]);
