from flask.views import MethodView
from flask import jsonify, request

from src.features.writeCourseDetailsToES.services.writeCourseDetailsToES import WriteCourseDetailsToES


class WriteCourseDetailsToESRoute(MethodView):

    def post(self):
        print(f"Received Write Course Details To ES Request")
        try:
            # query_params = request.args.get('query', default="")
            WriteCourseDetailsToES.initiate()
            return jsonify({"message": "Wrote Course Details To ES Successfully"}), 200
        except Exception:
            print(f"[WriteCourseDetailsToESRoute] failed with an exception")
            return jsonify({"message": "Write Course Details To ES Failed"}), 400
