from src import db
from flask.ext.restful import Resource, reqparse
from ..models.episode import Episode as EpisodeModel
from ..models.caption import Caption as CaptionModel

class Episodes(Resource):
    """ Get list of all episodes for a series """
    def get(self, series):
        episodes_query = db.session.query(EpisodeModel).\
            filter_by(series=series)\
            .join(CaptionModel,
                  EpisodeModel.episode == CaptionModel.episode and EpisodeModel.series == CaptionModel.series)\
            .group_by(EpisodeModel.episode)\
            .order_by('date_published desc')
        episodes = [
            {
                'series': episode.series,
                'episode': episode.episode,
                'title': episode.title,
                'description': episode.description,
                'duration': str(episode.duration),
                'date_published': str(episode.date_published)
            } for episode in episodes_query]

        return {
            'episodes': episodes,
            'success': True
        }, 200, {'Access-Control-Allow-Origin': 'http://localhost:8000'}