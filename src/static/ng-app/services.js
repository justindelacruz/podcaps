(function(angular) {
    'use strict';
    
    var nightValeServices = angular.module('app.nightValeServices', ['ngResource']);
    
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
})(angular);
