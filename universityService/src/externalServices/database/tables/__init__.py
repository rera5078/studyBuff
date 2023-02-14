from .universityServiceDepartmentInfo import DepartmentInfo
from .universityServiceCourseInfo import CourseInfo
from .universityServiceInstructorInfo import InstructorInfo


def init_app():
    """
    Load models to them get loaded with the correct db "session"
    """
    DepartmentInfo.init_app()
    CourseInfo.init_app()
    InstructorInfo.init_app()
