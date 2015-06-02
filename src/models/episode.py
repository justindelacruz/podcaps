from sqlalchemy import Column, Integer, String, Text, Sequence, UniqueConstraint, TIMESTAMP
from src import db


class Episode(db.Model):
    __tablename__ = 'episodes'
    __table_args__ = (UniqueConstraint('episode', 'series', name='_series_episode'),)
    id = Column(Integer, Sequence('episode_id_seq'), primary_key=True)
    episode = Column(String(100), unique=True)
    series = Column(String(100), unique=True)
    title = Column(String(100))
    description = Column(Text())
    duration = Column(Integer)
    date_published = Column(TIMESTAMP)
    date_created = Column(TIMESTAMP)

    def __init__(self, series, episode, title, description, duration, date_published):
        self.series = series
        self.episode = episode
        self.title = title
        self.description = description
        self.duration = duration
        self.date_published = date_published

    def __repr__(self):
        return "<Episodes('%s','%s','%s','%s','%s','%s','%s')>" % (
            self.series,
            self.episode,
            self.title,
            self.description,
            self.duration,
            self.date_created,
            self.date_published
        )