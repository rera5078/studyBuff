import requests
import json

from universityService.src.constants.fetchCoursesConstatnts import FetchCoursesConstants


class CourseInfoService:
    """

    """
    total_courses = 0
    srcDB = "9996"  # DB ID for the Academic year 2022-23

    @classmethod
    def fetch(cls, course_list: set, srcDB: str) -> list:
        cls.total_courses = len(course_list)
        if srcDB is not None:
            cls.srcDB = srcDB
        return cls._get_course_info(course_list)


    @classmethod
    def _get_course_info(cls, course_list: set) -> list:
        course_info_list = []
        counter = 5
        for course_id in course_list:
            if counter < 0:
                break
            try:
                resp = requests.get(FetchCoursesConstants.COURSE_INFO_URL, timeout=30,
                                    data=json.dumps(cls.get_course_info_body(course_id)))
                if resp.status_code == 200:
                    for course in resp.json()["results"]:
                        course_info_list.append(cls.reterive_necessary_info(course))
                cls.total_courses -= 1
                print(f"[CourseInfoService] Just {cls.total_courses} Courses More!!")
            except requests.exceptions.RequestException:
                print("[CourseInfoService] Fetching COURSE_INFO Failed")
        print("[CourseInfoService] Fetching COURSE_INFO Successful!!")
        return course_info_list

    @classmethod
    def get_course_info_body(cls, course_id: str) -> dict:
        return {
            "other": {
                "srcdb": cls.srcDB
            },
            "criteria":
                [
                    {
                        "field": "alias",
                        "value": course_id
                    }
                ]
        }

    @classmethod
    def reterive_necessary_info(cls, course_info: dict) -> dict:
        return {
            "group": "code:" + course_info["code"],
            "key": "crn:" + course_info["crn"],
            "srcdb": course_info["srcdb"],
            "course_id": course_info["code"],
            "course_name": course_info["title"],
            "crn": course_info["crn"],
        }
