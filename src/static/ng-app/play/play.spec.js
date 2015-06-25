(function() {
    'use strict';

    describe("PlayCtrl", function () {
        beforeEach(module('app'));

        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        it("should have 'episodeId' in the route param", function () {
            var controller = $controller('PlayCtrl', {
                $routeParams: {
                    episodeId: 1
                }
            })

            expect(controller.episodeId).toEqual(1);
        });
    });
})();
