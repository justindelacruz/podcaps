(function() {
    'use strict';

    describe("mediaCaption directive", function () {
        var $compile,
            scope,
            element,
            isolateScope,
            html = '<pc-media-caption model="caption"></pc-media-caption>';

        beforeEach(module('app'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            scope = _$rootScope_.$new();
            scope.caption = {
                start: 0,
                end: 10
            };

            element = $compile(html)(scope);
            scope.$digest();
            isolateScope = element.isolateScope();
        }));

        it("should be active if time=5", function() {
           expect(isolateScope.isActive(5)).toEqual(true);
        });

        it("should be inactive if time=11", function() {
            expect(isolateScope.isActive(11)).toEqual(false);
        });
    });
})();
