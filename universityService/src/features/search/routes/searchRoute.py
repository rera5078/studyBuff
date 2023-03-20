from flask.views import MethodView
from flask import jsonify, request

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
