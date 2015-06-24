(function() {
    'use strict';

    describe("PlayCtrl", function () {
        var ctrl,
            scope,
            routeParams;

        beforeEach(module('app'));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            routeParams = {
                episodeId: 1
            };
            ctrl = $controller('PlayCtrl', {
                $scope: scope,
                $routeParams: routeParams
            });
        }));

        it("should exist", function () {
            expect(ctrl).toBeDefined();
        });

        it("should have route param 'episodeId' in $scope", function () {
            expect(scope.episodeId).toEqual(1);
        });
    });
})();
