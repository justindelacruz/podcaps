(function(Popcorn, jasmine) {
    'use strict';

    describe("mediaSeeker service", function () {
        var mediaSeeker,
            MediaPlayer;

        beforeEach(module('app'));

        beforeEach(function() {
            MediaPlayer = jasmine.createSpyObj('MediaPlayer', ['currentTime']);

            inject(function (_MediaSeeker_) {
                mediaSeeker = _MediaSeeker_;
            });
        });

        it("should set currentTime to 10", function() {
            mediaSeeker.setCurrentTime(10);
            expect(mediaSeeker.getCurrentTime()).toEqual(10);
        });

        it("should seek mediaPlayer to 10", function() {
            mediaSeeker.setMediaPlayer(MediaPlayer);
            mediaSeeker.seekTo(10);
            expect(MediaPlayer.currentTime).toHaveBeenCalled();
        });
    });
})(Popcorn, jasmine);
