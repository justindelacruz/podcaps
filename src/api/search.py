from flask.ext.restful import Resource, reqparse
from src import es


class Search(Resource):
    """ Return search results """
    def get(self, series):
        parser = reqparse.RequestParser()
        parser.add_argument('q', required=True, help='Search param missing.')
        args = parser.parse_args()

        body = {
            "query": {
                "common": {
                    "text_with_context": {
                        "query": args.q,
                        "minimum_should_match": {
                            "low_freq": "75%",
                            "high_freq": 2
                        },
                        "cutoff_frequency": 0.001
                    }
                }
            },
            "highlight": {
                "fields": {
                    "text_with_context": {
                        "number_of_fragments": 0
                    }
                }
            },
        }
        data = es.search(index="podcaps",
                         doc_type="caption",
                         body=body,
                         analyzer="english",
                         fields='text_with_context,episode,title,start,highlight,series')
        results = [
            {
                'series': hit['fields']['series'][0],
                'text': hit['highlight']['text_with_context'][0],
                'episode': hit['fields']['episode'][0],
                'start': hit['fields']['start'][0],
                'title': hit['fields']['title'][0]
            } for hit in data['hits']['hits']]

        return results, 200, {'Access-Control-Allow-Origin': 'http://localhost:8000'}