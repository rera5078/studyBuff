from src.externalServices.database.tables import CourseInfo


class GetAllCourseDetails:
    """
    TODO: implement adding course details to elastic search
    """
    course_list = CourseInfo.get_all_course_details()
    print(f"total course count is ${len(course_list)}")
