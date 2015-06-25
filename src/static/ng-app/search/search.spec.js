(function() {
    'use strict';

    describe("SearchCtrl", function () {
        beforeEach(module('app'));

        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        it("should exist", function () {
            var controller = $controller('SearchCtrl', {
                $route: {
                    current: {
                        params: {
                            q: 'foobar'
                        }
                    }
                }
            });

            expect(controller).toBeDefined();
        });
    });
})();
