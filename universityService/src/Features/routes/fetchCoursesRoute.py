from flask.views import MethodView
from flask import jsonify, request

from universityService.src.Features.services.initiationService import InitiationService


class FetchCoursesRoute(MethodView):
    def get(self):
        print(f"Received Fetch Course Request ")
        try:
            clear_flag = request.args.get('clearFlag', default=False)
            InitiationService.get_course_details(clear_flag)
            return jsonify({"message": "Fetched Successfully"}), 200
        except Exception:
            print(f"[ROUTES] Fetch failed with an exception")
            return jsonify({"message": "Fetched Failed"}), 400
