(function() {
    'use strict';

    describe("PlayCtrl", function () {
        beforeEach(module('app'));

        var ctrl, routeParams;
        beforeEach(inject(function ($controller) {
            routeParams = {
                episodeId: 1
            };
            ctrl = $controller('PlayCtrl', {
                $routeParams: routeParams
            });
        }));

        it("should have 'episodeId' in the route param", function () {
            expect(ctrl.episodeId).toEqual(1);
        });
    });
})();
