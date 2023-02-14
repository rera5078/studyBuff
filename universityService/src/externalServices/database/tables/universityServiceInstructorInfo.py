from dataclasses import dataclass

from ..services.database import Database


@dataclass
class InstructorInfoParameter(object):
    """
    Auxiliary class to handle the high amount of class parameters.
    """
    instructor_id: str
    instructor_name: str
    department_id: str


class InstructorInfo(Database.get_db().Model):
    __tablename__ = "UniversityServiceInstructorInfo"
    InstructorID = Database.get_db().Column(
        Database.get_db().Integer(),
        autoincrement=True,
        nullable=False,
        primary_key=True
    )
    InstructorName = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=False
    )
    DepartmentID = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=False
    )
    __table_args__ = (
        Database.get_db().Index('UniversityServiceInstructorInfoIndex', InstructorID, DepartmentID),
    )

    def __init__(self, instructor_id, instructor_name, department_id):
        self.InstructorID = instructor_id
        self.InstructorName = instructor_name
        self.DepartmentID = department_id

    @staticmethod
    def save(instructor_id, instructor_name, department_id):
        course_info = InstructorInfo(instructor_id, instructor_name, department_id)
        course_info._create()

    def _create(self):
        try:
            with Database.session_manager() as session:
                session.add(self)
        except Exception:
            print(f"[DB] Failed to create in: {self.__tablename__}")

    @staticmethod
    def init_app():
        print("[DB] Instructor Info Table initialisation done")
