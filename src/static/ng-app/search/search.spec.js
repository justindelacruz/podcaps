(function() {
    'use strict';

    describe("SearchCtrl", function () {
        var ctrl,
            scope,
            route;

        beforeEach(module('app'));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            route = {
                current: {
                    params: {
                        q: 'foobar'
                    }
                }
            };
            ctrl = $controller('SearchCtrl', {
                $scope: scope,
                $route: route
            });
        }));

        it("should exist", function () {
            expect(ctrl).toBeDefined();
        });
    });
})();
