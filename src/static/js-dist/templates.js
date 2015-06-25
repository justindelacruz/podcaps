angular.module('app.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("static/ng-app/home/home.tpl.html",
    "<div class=\"medium-12 column hero\"> <h2><span class=\"hero-text-caption\">Captions</span> for podcasts.</h2> <p> Podcaps help you read along with popular podcasts. </p> </div> <div class=\"row\"> <div class=\"large-12 column\"> <h3><strong>Welcome to Night Vale</strong></h3> <p> \"Welcome to Night Vale\" is a twice-monthly podcast in the style of community updates for the small desert town of Night Vale, featuring local weather, news, announcements from the Sheriff's Secret Police, mysterious lights in the night sky, dark hooded figures with unknowable powers, and cultural events. </p> <h4>Episodes of Welcome to Night Vale with captions:</h4> </div> <div class=\"large-12 column episode\" ng-repeat=\"episode in home.episodes.episodes\"> <img src=\"/static/images/night-vale-radio.jpg\">\n" +
    "<a ng-href=\"play/{{ episode.series }}/{{ episode.episode }}\" ng-bind-html=\"episode.title\">{{ episode.title }}</a> </div> </div>");
  $templateCache.put("static/ng-app/play/media/caption/mediaCaption.tpl.html",
    "<span class=\"caption-text\" data-start=\"{{model.start}}\" data-end=\"{{model.end}}\" ng-class=\"{'active': isActive(time)}\" ng-bind-html=\"model.text\" ng-click=\"seekTo($event, model.start)\"> </span>");
  $templateCache.put("static/ng-app/play/media/player/mediaPlayer.tpl.html",
    "<div class=\"media-player\"></div>");
  $templateCache.put("static/ng-app/play/play.tpl.html",
    "<div class=\"row\"> <div class=\"captions medium-12 column\"> <pc-media-caption ng-repeat=\"caption in play.captions.captions\" model=\"caption\"></pc-media-caption> </div> </div> <pc-media-player type=\"soundcloud\" series=\"nightvaleradio\" episode-id=\"play.episodeId\"></pc-media-player>");
  $templateCache.put("static/ng-app/search/search.tpl.html",
    "<section id=\"search\"> <div class=\"row\"> <div class=\"small-12\"> <h2> Results for <em>{{ search.query }}</em> </h2> </div> <hr> <h3>Podcast: <strong>Welcome to Night Vale</strong></h3> <hr> </div> <ul class=\"no-bullet\"> <li ng-repeat=\"result in search.results\"> <div class=\"row\"> <div class=\"small-12\"> <h4><a ng-href=\"play/{{ result.series }}/{{ result.episode }}?t={{ result.start }}\" ng-bind-html=\"result.title\"></a></h4> <p ng-bind-html=\"result.text\"></p> </div> </div> </li> </ul> </section>");
}]);
