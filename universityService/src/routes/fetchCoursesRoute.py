from flask.views import MethodView
from flask import jsonify

from src.services.fetchCourseService import FetchCourseService


class FetchCoursesRoute(MethodView):
    def get(self):
        print(f"Received Fetch Course Request ")
        try:
            # read_value = request.args.get('crn', default=None)
            FetchCourseService.fetch()
            return jsonify({"message": "Fetched Successfully"}), 200
        except Exception:
            print(f"[ROUTES] Fetch failed with an exception")
            return jsonify({"message": "Fetched Failed"}), 400
