from datetime import datetime

from src.externalServices.database.tables import DepartmentInfo, InstructorInfo, CourseInfo
from .catalogService import CatalogService
from .courseDetailsService import CourseDetailsService
from .courseInfoService import CourseInfoService


class InitiationService:
    """
    Starts by clearing existing information if clearFlag is set to True
    1. Fetch Department ID, Department Name and Course ID from CUB catalog 'https://catalog.colorado.edu/'
       and store department information in database
    2. Using the above extracted Course ID's get the unique IDs and fetch course info 'without description and required
       info from 'https://classes.colorado.edu/api/?page=fose&route=search' with body params.
    3. From the above course info extract course id, course name and crn id and fetch all details with the body params
       using https://classes.colorado.edu/api/?page=fose&route=details
    4. Store Course details and instructor info in respective tables.
    """

    @classmethod
    def get_course_details(cls, clear_flag: bool, srcDB: str) -> None:
        start_time = datetime.now()
        if clear_flag:
            cls._clear_course_info()
        course_list = CatalogService.fetch()
        course_info_list = CourseInfoService.fetch(course_list, srcDB)
        CourseDetailsService.fetch(course_info_list)
        end_time = datetime.now()
        print("*********************************************************")
        print('Course Fetch Duration: {}'.format(end_time - start_time))
        print("*********************************************************")

    @classmethod
    def _clear_course_info(cls) -> None:
        DepartmentInfo.delete_all_department_data()
        InstructorInfo.delete_all()
        CourseInfo.delete_all()
        print("[FetchCourseService] Cleared existing Department, Course, Instructor Information!!!")
