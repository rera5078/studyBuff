import json
import requests
from bs4 import BeautifulSoup as bs

from src.constants.fetchCoursesConstatnts import FetchCoursesConstants
from src.externalServices.database.tables import InstructorInfo, CourseInfo


class CourseDetailsService:
    """
    Making another API call with the course info parameters to obtain the course details.
    Formatting the course information and extract instructor information.
    Store the information about the instructor and the course in database.
    """
    total_course_info = 0
    instructor_list = {}
    course_key_list = []

    @classmethod
    def fetch(cls, course_info_list: list) -> None:
        cls.total_course_info = len(course_info_list)
        course_details = cls._get_course_details(course_info_list)
        print(f"Storing {len(course_details)} Course Details")
        cls._store_course_details(course_details)

    @classmethod
    def _get_course_details(cls, course_info_list: list) -> list:
        course_details_list = []
        for course in course_info_list:
            course_details = cls._fetch_course_details(course)

            if cls._is_key_preset_or_course_details_empty(course_details):
                continue

            department_id = course["course_id"].split(" ")[0]
            section_info = cls._get_section_list(course_details["allInGroup"], department_id)
            course_details_list.append(
                cls._format_course_info(course["course_id"], course["course_name"], course["crn"], department_id,
                                        course_details, section_info))
            cls.total_course_info -= 1
            print(f"Just {cls.total_course_info}  Course Info More!!")
        return course_details_list

    @classmethod
    def _fetch_course_details(cls, course: dict) -> dict:
        try:
            resp = requests.get(FetchCoursesConstants.COURSE_DESCRIPTION_URL, timeout=30,
                                data=json.dumps(cls._get_course_details_body(course)))
            if resp.status_code == 200:
                return resp.json()
        except requests.exceptions.RequestException:
            print("Fetching COURSE_INFO Failed:", course["course_id"])
        return {}

    @classmethod
    def _get_course_details_body(cls, course: dict) -> dict:
        return {
            "group": course["group"],
            "key": course["key"],
            "srcdb": course["srcdb"],
        }

    @classmethod
    def _is_key_preset_or_course_details_empty(cls, course_details: dict) -> bool:
        if not bool(course_details) or course_details["key"] in cls.course_key_list:
            return True
        cls.course_key_list.append(course_details["key"])
        return False

    @classmethod
    def _get_section_list(cls, section_list: list, department_id: str) -> list:
        section_info = []
        for section in section_list:
            instructor_info = cls._handle_instructor_info(section, department_id)
            section_info.append({
                "number": section["no"],
                "instructor_name": instructor_info["name"],
                "instructor_id": instructor_info["id"],
                "location": section["schd"],
                "schedule": section["meets"],
                "acad_career": section["acad_career"],
            })
        return section_info

    @classmethod
    def _handle_instructor_info(cls, instructor_details: dict, department_id: str) -> dict:
        instructor_name = instructor_details["instr"]
        instructor_info = {
            "name": None,
            "id": None
        }
        if len(instructor_name) == 0:
            return instructor_info

        if instructor_name not in cls.instructor_list:
            instr = InstructorInfo.save(instructor_name, department_id)
            cls.instructor_list[instr.InstructorName] = instr.InstructorID
            instructor_info["name"] = instr.InstructorName
            instructor_info["id"] = instr.InstructorID
        else:
            instructor_info["name"] = instructor_name
            instructor_info["id"] = cls.instructor_list[instructor_name]

        return instructor_info

    @classmethod
    def _format_course_info(cls, course_id, course_name, crn, department_id, course_details, section_info) -> dict:
        return {
            "key": course_details["key"],
            "course_id": course_id,
            "course_name": course_name,
            "department_id": department_id,
            "crn": crn,
            "books": cls._convert_html_to_text(course_details["books_html"]),
            "notes": cls._convert_html_to_text(course_details["clssnotes"]),
            "restricted_info": bs(course_details["restrict_info"], "lxml").text,
            "description": bs(course_details["description"], "lxml").text,
            "instruction_mode": cls._convert_html_to_text(course_details["instmode_html"]),
            "sections": section_info
        }

    @classmethod
    def _convert_html_to_text(cls, html_str: str) -> str:
        return bs(html_str, "lxml").text

    @classmethod
    def _store_course_details(cls, course_details: list) -> None:
        CourseInfo.bulk_save(course_details)
