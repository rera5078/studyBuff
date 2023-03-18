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
    crn_id: str
    books: str
    notes: str
    restricted_info: str
    description: str
    location: str
    instruction_mode: str
    sections: list


class CourseInfo(Database.get_db().Model):
    __tablename__ = "UniversityServiceCourseInfo"
    Key = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=False,
        primary_key=True
    )
    CourseID = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=False
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
    CrnID = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=False
    )
    Books = Database.get_db().Column(
        Database.get_db().Text(),
        nullable=True
    )
    Notes = Database.get_db().Column(
        Database.get_db().Text(),
        nullable=True
    )
    RestrictedInfo = Database.get_db().Column(
        Database.get_db().Text(),
        nullable=True
    )
    Description = Database.get_db().Column(
        Database.get_db().Text(),
        nullable=True
    )
    SectionInfo = Database.get_db().Column(
        Database.get_db().JSON(),
        nullable=True
    )
    InstructionMode = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=True
    )
    __table_args__ = (
        Database.get_db().Index('UniversityServiceDepartmentInfoIndex', CourseID, DepartmentID),
    )

    def __init__(self, key, course_id, course_name, department_id, crn_id, books, notes,
                 restricted_info, description, instruction_mode, sections):
        self.Key = key
        self.CourseID = course_id
        self.CourseName = course_name
        self.DepartmentID = department_id
        self.CrnID = crn_id
        self.Books = books
        self.Notes = notes
        self.RestrictedInfo = restricted_info
        self.Description = description
        self.SectionInfo = sections
        self.InstructionMode = instruction_mode

    @staticmethod
    def save(key, course_id, course_name, department_id, crn_id, books, notes,
             restricted_info, description, instruction_mode, sections):
        course_info = CourseInfo(key, course_id, course_name, department_id, crn_id, books, notes,
                                 restricted_info, description, instruction_mode, sections)
        course_info._create()

    @staticmethod
    def bulk_save(course_info_list: list):
        try:
            with Database.session_manager() as session:
                course_info_objects = []
                for course_info in course_info_list:
                    course_object = CourseInfo(course_info["key"], course_info["course_id"], course_info["course_name"],
                                               course_info["department_id"], course_info["crn"], course_info["books"],
                                               course_info["notes"], course_info["restricted_info"],
                                               course_info["description"], course_info["instruction_mode"],
                                               course_info["sections"])
                    course_info_objects.append(course_object)
                session.bulk_save_objects(course_info_objects)
        except Exception:
            print(f"[DB] Bulk Operation Failed to add Course Info")

    def _create(self):
        try:
            with Database.session_manager() as session:
                session.add(self)
        except Exception:
            print(f"[DB] Failed to create in: {self.__tablename__}")

    @staticmethod
    def delete_all():
        """
        https://docs.sqlalchemy.org/en/14/orm/session_basics.html#orm-expression-update-delete
        :return:
        """

        try:
            with Database.session_manager() as session:
                session.query(CourseInfo).delete()
        except Exception:
            print(f"[DB] Failed to clear course information from table")

    @staticmethod
    def get_all_course_details():
        with Database.session_manager() as session:
            course_list = session.query(CourseInfo).all()
            session.expunge_all()
            return course_list

    @staticmethod
    def init_app():
        print("[DB] Course Info Table initialisation done")
