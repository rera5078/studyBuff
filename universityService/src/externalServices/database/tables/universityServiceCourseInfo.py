from dataclasses import dataclass

from ..services.database import Database


@dataclass
class CourseInfoParameter(object):
    """
    Auxiliary class to handle the high amount of class parameters.
    """
    course_id: str
    course_name: str
    department_id: str
    schedule: str
    instructor: str
    crn_id: str
    books: str
    notes: str
    restricted_info: str
    description: str
    location: str
    instruction_mode: str
    instructor_id: int


class CourseInfo(Database.get_db().Model):
    __tablename__ = "UniversityServiceCourseInfo"
    CourseID = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=False,
        primary_key=True
    )
    CourseName = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=False
    )
    DepartmentID = Database.get_db().Column(
        Database.get_db().String(255),
        Database.get_db().ForeignKey("UniversityServiceDepartmentInfo.DepartmentID",
                                     ondelete='SET NULL'),
        nullable=True, default=None
    )
    Schedule = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=True
    )
    InstructorID = Database.get_db().Column(
        Database.get_db().Integer(),
        Database.get_db().ForeignKey("UniversityServiceInstructorInfo.InstructorID",
                                     ondelete='SET NULL'),
        nullable=True, default=None
    )
    CrnID = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=False
    )
    Books = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=True
    )
    Notes = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=True
    )
    RestrictedInfo = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=True
    )
    Description = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=True
    )
    Location = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=True
    )
    InstructionMode = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=True
    )
    __table_args__ = (
        Database.get_db().Index('UniversityServiceDepartmentInfoIndex', CourseID, DepartmentID),
    )

    def __init__(self, course_id, course_name, department_id, schedule, instructor_id, crn_id, books, notes,
                 restricted_info, description, location, instruction_mode):
        self.CourseID = course_id
        self.CourseName = course_name
        self.DepartmentID = department_id
        self.Schedule = schedule
        self.InstructorID = instructor_id
        self.CrnID = crn_id
        self.Books = books
        self.Notes = notes
        self.RestrictedInfo = restricted_info
        self.Description = description
        self.Location = location
        self.InstructionMode = instruction_mode

    @staticmethod
    def save(course_id, course_name, department_id, schedule, instructor_id, crn_id, books, notes,
             restricted_info, description, location, instruction_mode):
        course_info = CourseInfo(course_id, course_name, department_id, schedule, instructor_id, crn_id, books, notes,
                                 restricted_info, description, location, instruction_mode)
        course_info._create()

    def _create(self):
        try:
            with Database.session_manager() as session:
                session.add(self)
        except Exception:
            print(f"[DB] Failed to create in: {self.__tablename__}")

    @staticmethod
    def init_app():
        print("[DB] Course Info Table initialisation done")
