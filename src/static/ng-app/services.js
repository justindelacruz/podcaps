(function(angular) {
    'use strict';
    
    var nightValeServices = angular.module('myApp.nightValeServices', ['ngResource']);
    
    nightValeServices.factory('Api', ['$resource',
        function($resource) {
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
    
    nightValeServices.factory('Popcorn', function($window) {
        return $window.Popcorn;
    });
})(angular);
