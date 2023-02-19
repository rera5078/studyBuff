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

    def __init__(self, instructor_name, department_id):
        self.InstructorName = instructor_name
        self.DepartmentID = department_id

    @staticmethod
    def save(instructor_name, department_id):
        instructor_info = InstructorInfo(instructor_name, department_id)
        instructor_info._create()
        return instructor_info

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
                session.query(InstructorInfo).delete()
        except Exception:
            print(f"[DB] Failed to clear Instructor information from table")

    @staticmethod
    def init_app():
        print("[DB] Instructor Info Table initialisation done")
