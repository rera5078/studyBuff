from flask.views import MethodView
from flask import jsonify, request
import requests, json

from src.features.featchAndStoreCourseDetails.services.initiationService import InitiationService

from elasticsearch import Elasticsearch

class FetchCoursesRoute(MethodView):
    def get(self):
        print(f"Searching Elasticsearch")
        query = request.args.get('query', default="")
        print("query", query)
        es_query = {
                "query": {
                    "match": {
                        "Query": query
                        }
                    }
            }
        try:
            es = Elasticsearch(hosts="http://elastic:12312jkhfwdeldncxmfndsa67890wfndsvmdcs@localhost:9200/")
            res = es.search(index="queries_study_buff", body=es_query)
            es_res = [result['_source']["Query"] for result in res['hits']['hits']]
            return jsonify(es_res), 200  

        except Exception:
            print(f"[SearchRouteES] Search failed with an exception")
            return jsonify({"message": "Searching Elasticsearch Failed", "es_query": es_query}), 400
