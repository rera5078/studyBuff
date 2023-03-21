from flask.views import MethodView
from flask import jsonify

from src.features.writeCourseDetailsToES.services.writeCourseDetailsToES import WriteCourseDetailsToES
# from src.views.courseInfoView import CourseInfoSchema

# course_info_load = CourseInfoSchema()


class WriteCourseDetailsToESRoute(MethodView):

    def get(self):
        print(f"Received Write Course Details To ES Request")
        try:
            course_list = WriteCourseDetailsToES.initiate()
            return jsonify(course_list), 200
        except Exception:
            print(f"[WriteCourseDetailsToESRoute] failed with an exception")
            return jsonify({"message": "Write Course Details To ES Failed"}), 400
