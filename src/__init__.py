from src.config import *
from flask import Flask
from flask.ext.restful import Api
from flask.ext.sqlalchemy import SQLAlchemy
from elasticsearch import Elasticsearch

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = MYSQL_URL
app.config['SQLALCHEMY_POOL_RECYCLE'] = SQLALCHEMY_POOL_RECYCLE
db = SQLAlchemy(app)
es = Elasticsearch(
    ELASTIC_SEARCH_HOST,
    http_auth=(ELASTIC_SEARCH_USERNAME, ELASTIC_SEARCH_PASSWORD),
)
api = Api(app)

import src.routes
