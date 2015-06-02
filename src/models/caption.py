from sqlalchemy import Column, Integer, String, Sequence, Numeric, UniqueConstraint
from src import db


class Caption(db.Model):
    __tablename__ = 'captions'
    __table_args__ = (UniqueConstraint('episode', 'series', name='_series_episode'),)
    id = Column(Integer, Sequence('caption_id_seq'), primary_key=True)
    series = Column(String(100))
    episode = Column(String(100))
    start = Column(Numeric)
    end = Column(Numeric)
    text = Column(String(255))

    def __init__(self, series, episode, start, end, text):
        self.series = series
        self.episode = episode
        self.start = start
        self.end = end
        self.text = text

    def __repr__(self):
        return "<Captions('%s','%s','%s','%s','%s','%s')>" % (
            self.id,
            self.series,
            self.episode,
            self.start,
            self.end,
            self.text
        )
