from datetime import datetime
from src import db
from flask.ext.restful import Resource
import soundcloud
from ..models.episode import Episode as EpisodeModel


class ImportEpisodes(Resource):
    """ Load episodes from Soundcloud API into DB """
    def get(self, series):
        nightvaleradio_id = '41350296'
        soundcloud_client_id = 'YOUR_CLIENT_ID'

        episodes_query = db.session.query(EpisodeModel).all()
        episodes = {episode.episode: episode for episode in episodes_query}

        client = soundcloud.Client(client_id=soundcloud_client_id)
        tracks = client.get('/users/'+nightvaleradio_id+'/tracks', offset=0, limit=100)
        new_episodes = []
        for track in tracks:
            if track.permalink not in episodes:
                episode = EpisodeModel(
                    series, 
                    track.permalink, 
                    track.title, 
                    track.description, 
                    track.duration, 
                    # 2015/05/15 19:06:08 +0000
                    datetime.strptime(track.created_at, '%Y/%m/%d %H:%M:%S +0000')
                )
                db.session.add(episode)
                new_episodes.append(track.permalink)

        db.session.flush()
        db.session.commit()

        return {
            'total_count': len(episodes) + len(new_episodes),
            'added_count': len(new_episodes),
            'episodes': new_episodes
        }