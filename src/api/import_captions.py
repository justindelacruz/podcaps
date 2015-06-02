from src import es, db
from flask.ext.restful import Resource
from captionstransformer import core
from captionstransformer.transcript import Reader
from ..models.caption import Caption as CaptionModel
from ..models.episode import Episode as EpisodeModel
from elasticsearch import helpers
import os.path

class ImportCaptions(Resource):
    """ Import captions into DB and ES """
    CAPTIONS_DIR = 'src/data/timings/'
    EXTENSION = 'xml'

    def get(self, series):
        result = []
        episodes = db.session.query(EpisodeModel).filter_by(series=series).all()

        for episode in episodes:
            result.append(self.save_captions(series, episode))

        return {
            'result': result,
            'success': True
        }

    def get_filename(self, episode):
        return ''.join([self.CAPTIONS_DIR, episode, '.', self.EXTENSION])

    def save_captions(self, series, episode):
        captions = []
        episode_id = episode.episode
        filename = self.get_filename(episode_id)

        if os.path.isfile(filename):
            with open(filename) as f:
                episode = db.session.query(EpisodeModel).filter_by(series=series, episode=episode_id).first()

                for timed_text in Reader(f).read():
                    text = timed_text.text
                    start = (timed_text.start - core.get_date()).total_seconds()
                    end = (timed_text.end - core.get_date()).total_seconds()

                    caption = CaptionModel(series, episode_id, start, end, text)
                    captions.append(caption)
                    db.session.add(caption)

                db.session.flush()
                db.session.commit()

                self.save_to_search(episode, captions)

        return {
            'episode': episode_id,
            'count': len(captions),
        }

    def save_to_search(self, episode, captions):
        """ Save to ElasticSearch
        :param episode: Episode ID
        :param captions: List of captions
        :return:
        """
        for cur, next1, next2 in zip(captions, captions[1:]+[None,None], captions[2:]+[None,None,None]):
            cur.text_with_context = ' '.join([
                cur.text,
                getattr(next1, 'text', ''),
                getattr(next2, 'text', '')
            ])

        helpers.bulk(es, [
            {
                '_index': 'podcaps',
                '_type': 'caption',
                '_id': caption.id,
                '_source': {
                    'episode': caption.episode,
                    'series': episode.series,
                    'title': episode.title,
                    'start': caption.start,
                    'end': caption.end,
                    'text': caption.text,
                    'text_with_context': caption.text_with_context
                }
            }
            for caption in captions[::3]]
        )