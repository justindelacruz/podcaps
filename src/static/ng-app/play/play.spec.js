(function() {
    'use strict';

    describe("PlayCtrl", function () {
        beforeEach(module('app'));

        var ctrl, scope, routeParams;
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

        it("should have route param 'episodeId' in $scope", function () {
            expect(scope.episodeId).toEqual(1);
        });
    });
})();
