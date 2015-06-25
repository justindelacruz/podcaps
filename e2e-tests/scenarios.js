(function() {
    'use strict';

    /* https://github.com/angular/protractor/blob/master/docs/toc.md */

    describe('app', function() {
        describe('/play', function() {
            beforeEach(function() {
                browser.get('/play/nightvaleradio/13-a-story-about-you-1');
            });

            it('should render nightvale episode 13', function() {
                expect(element.all(by.css('.caption-text')).first().getText().length).not.toEqual(0);
            });
        });

        describe('/', function() {
            beforeEach(function () {
                browser.get('/');
            });

            it('should load the home page', function () {
                expect(browser.getLocationAbsUrl()).toMatch('/');
            });
        });
    });
})();