(function() {
    'use strict';

    describe("HomeCtrl", function () {
        var ctrl,
            scope,
            routeParams;

        beforeEach(module('app'));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            routeParams = {
                episodeId: 1
            };
            ctrl = $controller('HomeCtrl', {
                $scope: scope,
                $routeParams: routeParams
            });
        }));

        it("should exist", function () {
            expect(ctrl).toBeDefined();
        });
    });
})();
