(function() {
    'use strict';

    describe("HomeCtrl", function () {
        var ctrl;

        beforeEach(module('app'));

        beforeEach(inject(function ($controller) {
            ctrl = $controller('HomeCtrl', {});
        }));

        it("should exist", function () {
            expect(ctrl).toBeDefined();
        });
    });
})();
