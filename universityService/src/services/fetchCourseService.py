from bs4 import BeautifulSoup as bs
import unicodedata
import urllib
import urllib.request
import requests
import pandas as pd
import json
from datetime import datetime

from ..constants.fetchCoursesConstatnts import FetchCoursesConstants
from ..externalServices.database.tables import DepartmentInfo, InstructorInfo, CourseInfo


class FetchCourseService:
    LINK_PD = pd.DataFrame(columns=FetchCoursesConstants.LINK_PD_COLUMNS)
    DEPARTMENT_PD = pd.DataFrame(columns=FetchCoursesConstants.DEPARTMENT_PD_COLUMNS)
    GET_COURSE_DETAILS_PD = pd.DataFrame(columns=FetchCoursesConstants.GET_COURSE_DETAILS_PD_COLUMNS)
    COURSES_DESC_PD = pd.DataFrame(columns=FetchCoursesConstants.COURSES_DESC_PD_COLUMNS)

    @classmethod
    def get_soup(cls, url):
        return bs(requests.get(url).text, 'html.parser')

    @classmethod
    def fetch(cls):
        start_time = datetime.now()
        DepartmentInfo.delete_all_department_data()
        InstructorInfo.delete_all()
        CourseInfo.delete_all()
        print("[FetchCourseService] Cleared existing Department, Course, Instructor Information!!!")

        index = 1
        for link in cls.get_soup(FetchCoursesConstants.COURSE_CATALOG_URL).find_all('a'):
            file_link = link.get('href')
            if link.string in FetchCoursesConstants.COURSE_CATALOG:
                cls.LINK_PD.loc[index] = [link.string, file_link,
                                          'https://catalog.colorado.edu' + file_link]
                index += 1

        cls.DEPARTMENT_PD['department_name'] = cls.LINK_PD["Courses"].str.split("(", n=1, expand=True)[0]
        cls.DEPARTMENT_PD['department_id'] = \
            cls.LINK_PD["Courses"].str.split("(", n=1, expand=True)[1].str.split(")", n=1, expand=True)[0]

        department_info_dict = cls.DEPARTMENT_PD.to_dict('records')
        DepartmentInfo.bulk_save(department_info_dict)
        print("[FetchCourseService] Successfully Created Department Info!!!")

        print("[FetchCourseService] Fetching Course information")
        print(cls.LINK_PD.shape)

        current_course_counter = 0

        for i in range(1, cls.LINK_PD.shape[0] + 1):
            url = urllib.request.urlopen(cls.LINK_PD['full_links'][i])
            content = url.read()
            soup = bs(content, 'lxml')
            table = soup.findAll('div', attrs={"class": "courseblock"})

            for course_name in table:
                current_course_counter += 1
                cls.GET_COURSE_DETAILS_PD.loc[current_course_counter] = [course_name.find('p').text,
                                                                         cls.LINK_PD['full_links'][i]]
            print("current course count: ", current_course_counter)

        print(f"Fetched {current_course_counter} Courses Success !!!")

        cls.COURSES_DESC_PD['courses_id'] = cls.GET_COURSE_DETAILS_PD['Courses']. \
            str.split(' ', n=1, expand=True)[0].replace(u'\xa0', u' ')
        cls.COURSES_DESC_PD['course_name'] = cls.GET_COURSE_DETAILS_PD["Courses"]. \
            str.split(")", n=1, expand=True)[1].replace(u'\xa0', u' ')
        cls.COURSES_DESC_PD['department_id'] = cls.GET_COURSE_DETAILS_PD["Courses"]. \
            str.split(" ", n=1, expand=True)[0].str.split("\xa0", expand=True)[0]

        cls.COURSES_DESC_PD.head()
        course_info_dictionary = cls.COURSES_DESC_PD.to_dict('records')

        course_info_list = []
        unique_course = set()

        for course_info in course_info_dictionary:
            value = unicodedata.normalize("NFKD", course_info['courses_id'])
            unique_course.add(value)

        total_courses = len(unique_course)
        print(f"Total courses: {total_courses}")

        for course_id in unique_course:
            fetch_course_info_body = {
                "other": {
                    "srcdb": "9996"
                },
                "criteria":
                    [
                        {
                            "field": "alias",
                            "value": course_id
                        }
                    ]
            }
            try:
                resp = requests.get(FetchCoursesConstants.COURSE_INFO_URL, timeout=30,
                                    data=json.dumps(fetch_course_info_body))
                if resp.status_code == 200:
                    for course in resp.json()["results"]:
                        course_info_list.append(course)
                        print(f"Fetched {course['code']} Courses Success !!!")
                total_courses -= 1
                print(f"{total_courses} Just Courses More!!")
            except requests.exceptions.RequestException:
                print("Fetching COURSE_INFO Failed")

        print("Fetching COURSE_INFO Successful!!")

        final_list = []
        instructor_list = {}
        key_list = []
        total_course_info = len(course_info_list)
        print(f"Total courses: {total_course_info}")

        for course in course_info_list:
            body = {
                "group": "code:" + course["code"],
                "key": "crn:" + course["crn"],
                "srcdb": course["srcdb"],
            }
            try:
                resp = requests.get(FetchCoursesConstants.COURSE_DESCRIPTION_URL, timeout=30,
                                    data=json.dumps(body))
                if resp.status_code == 200:
                    course_obj = resp.json()
                    section_info = []
                    department_id = course["code"].split(" ")[0]

                    if course_obj["key"] in key_list:
                        continue

                    key_list.append(course_obj["key"])

                    for section in course_obj["allInGroup"]:
                        instructor_name = section["instr"]
                        instructor_info = {
                            "name": None,
                            "id": None
                        }
                        if len(instructor_name) > 0:
                            if instructor_name not in instructor_list:
                                instr = InstructorInfo.save(instructor_name, department_id)
                                instructor_list[instr.InstructorName] = instr.InstructorID
                                instructor_info["name"] = instr.InstructorName
                                instructor_info["id"] = instr.InstructorID
                            else:
                                instructor_info["name"] = instructor_name
                                instructor_info["id"] = instructor_list[instructor_name]

                        info = {
                            "number": section["no"],
                            "instructor_name": instructor_info["name"],
                            "instructor_id": instructor_info["id"],
                            "location": section["schd"],
                            "schedule": section["meets"],
                            "acad_career": section["acad_career"],
                        }
                        section_info.append(info)

                    course_info = {
                        "key": course_obj["key"],
                        "course_id": course["code"],
                        "course_name": course["title"],
                        "department_id": department_id,
                        "crn": course["crn"],
                        "books": bs(course_obj["books_html"], "lxml").text,
                        "notes": bs(course_obj["clssnotes"], "lxml").text,
                        "restricted_info": bs(course_obj["restrict_info"], "lxml").text,
                        "description": bs(course_obj["description"], "lxml").text,
                        "instruction_mode": course_obj["instmode_html"],
                        "sections": section_info
                    }
                    print(f"Fetched {course_info['course_name']} Course Description Success !!!")
                    total_course_info -= 1
                    print(f"{total_course_info} Just Course Info More!!")
                    final_list.append(course_info)
            except requests.exceptions.RequestException:
                print("Fetching COURSE_INFO Failed")

        print(f"Fetched Course Count: {len(final_list)}")
        CourseInfo.bulk_save(final_list)
        print("[FetchCourseService] Successfully Created Course Info!!!")
        end_time = datetime.now()
        print("*********************************************************")
        print('Course Fetch Duration: {}'.format(end_time - start_time))
        print("*********************************************************")

