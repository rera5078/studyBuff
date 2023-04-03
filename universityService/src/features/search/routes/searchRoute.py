from flask.views import MethodView
from flask import jsonify, request
from elasticsearch import Elasticsearch 
from src.features.search.services.initiateSearch import InitiateSearch

class SearchRoute(MethodView):

    def get(self):
        print(f"Received Search Request")
        try:
            query_params = request.args.get('query', default="")
            guid = InitiateSearch.start(query_params)
            return jsonify({"guid": guid}), 200
        except Exception:
            print(f"[SearchRoute] Search failed with an exception")
            return jsonify({"message": "Search Failed"}), 400

class SearchES(MethodView):
    
    def get(self):
        print(f"Searching Elasticsearch")
        try:
            query = request.args.get('query', default="") 
            es = Elasticsearch(hosts="http://elastic:12312jkhfwdeldncxmfndsa67890wfndsvmdcs@localhost:9200/")
            res = es.search(index="study_buff", body=query)
            return [result['_source'] for result in res['hits']['hits']]    
        
        except Exception:
            print(f"[SearchRouteES] Search failed with an exception")
            return jsonify({"message": "Searching Elasticsearch Failed"}), 400
