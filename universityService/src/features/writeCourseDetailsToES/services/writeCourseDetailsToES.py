from src.externalServices.database.tables import CourseInfo


class WriteCourseDetailsToES:

    @classmethod
    def initiate(cls):
        """
        TODO: implement adding course details to elastic search
        """
        course_list = cls.get_course_details()
        print(f"[WriteCourseDetailsToES] Processed Write Course Details To ES")
        return course_list

    @classmethod
    def get_course_details(cls):
        print("get_course_details")
        return CourseInfo.get_all_course_details()
