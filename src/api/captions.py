from src import db
from flask.ext.restful import Resource, reqparse
from ..models.caption import Caption as CaptionModel

class Captions(Resource):
    """ Get list of all captions for an episode """
    def get(self, series, episode):
        captions_query = db.session.query(CaptionModel).\
            filter_by(series=series, episode=episode).order_by('start asc')
        captions = [
            {
                'start': float(caption.start),
                'end': float(caption.end),
                'text': caption.text
            } for caption in captions_query]

        return {
            'captions': captions,
            'success': True
        }, 200, {'Access-Control-Allow-Origin': 'http://localhost:8000'}