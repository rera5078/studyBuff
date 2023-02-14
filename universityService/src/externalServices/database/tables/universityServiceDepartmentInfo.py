from dataclasses import dataclass

from ..services.database import Database


@dataclass
class DepartmentInfoParameter(object):
    """
    Auxiliary class to handle the high amount of class parameters.
    """
    department_id: str
    department_name: str


class DepartmentInfo(Database.get_db().Model):
    __tablename__ = "UniversityServiceDepartmentInfo"
    DepartmentID = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=False,
        primary_key=True
    )
    DepartmentName = Database.get_db().Column(
        Database.get_db().String(255),
        nullable=False
    )

    def __init__(self, department_id, department_name):
        self.DepartmentID = department_id
        self.DepartmentName = department_name

    @staticmethod
    def save(department_id, department_name):
        department_info = DepartmentInfo(department_id, department_name)
        department_info._create()

    def _create(self):
        try:
            with Database.session_manager() as session:
                session.add(self)
        except Exception:
            print(f"[DB] Failed to create in: {self.__tablename__}")

    @staticmethod
    def bulk_save(department_info_list: list):
        try:
            with Database.session_manager() as session:
                department_info_objects = []
                for department_info in department_info_list:
                    department_info_objects.append(DepartmentInfo(department_info["department_id"],
                                                                  department_info["department_name"]))
                session.bulk_save_objects(department_info_objects)
        except Exception:
            print(f"[DB] Bulk Operation Failed to add departments")

    @staticmethod
    def delete_all_department_data():
        """
        https://docs.sqlalchemy.org/en/14/orm/session_basics.html#orm-expression-update-delete
        :return:
        """

        try:
            with Database.session_manager() as session:
                session.query(DepartmentInfo) \
                    .delete(synchronize_session="fetch")
        except Exception:
            print(f"[DB] Failed to clear department information from table")

    @staticmethod
    def init_app():
        print("[DB] Department Table initialisation done")
