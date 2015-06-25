(function(Popcorn, jasmine) {
    'use strict';

    describe("mediaPlayer directive", function () {
        var html = '<pc-media-player type="soundcloud" series="nightvaleradio" episode-id="episodeId"></pc-media-player>',
            $compile,
            scope,
            element,
            isolateScope,
            MediaSeeker;

        beforeEach(module('app'));

        beforeEach(function() {
            module(function ($provide) {
                spyOn(Popcorn, 'smart').and.callThrough();
                $provide.value('Popcorn', Popcorn);

                MediaSeeker = jasmine.createSpyObj('MediaSeeker', ['setMediaPlayer']);
                $provide.value('MediaSeeker', MediaSeeker);
            });

            inject(function (_$compile_, _$rootScope_) {
                $compile = _$compile_;
                scope = _$rootScope_.$new();
                scope.episodeId = 1;

                element = $compile(html)(scope);
                scope.$digest();
                isolateScope = element.isolateScope();
            });
        });

        it("should have called Popcorn.smart()'", function() {
            expect(Popcorn.smart).toHaveBeenCalled();
        });

        it("should have soundcloud.com in the mediaUrl", function() {
            var mediaUrl = Popcorn.smart.calls.first().args[1];
            expect(mediaUrl).toMatch(/.*soundcloud\.com.*/);
        });

        it("should have called MediaSeeker.setMediaPlayer()'", function() {
            expect(MediaSeeker.setMediaPlayer).toHaveBeenCalled();
        });
    });
})(Popcorn, jasmine);
