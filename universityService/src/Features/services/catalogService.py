from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
import urllib
import urllib.request
import unicodedata

from universityService.src.constants.fetchCoursesConstatnts import FetchCoursesConstants
from universityService.src.externalServices.database.tables.universityServiceDepartmentInfo import DepartmentInfo


class CatalogService:
    """
    Retrieves Course ID and Department ID from the CUB catalog, filters the necessary data,
    and returns a list of distinct Course IDs.
    """
    LINK_PD = pd.DataFrame(columns=FetchCoursesConstants.LINK_PD_COLUMNS)
    DEPARTMENT_PD = pd.DataFrame(columns=FetchCoursesConstants.DEPARTMENT_PD_COLUMNS)
    GET_COURSE_DETAILS_PD = pd.DataFrame(columns=FetchCoursesConstants.GET_COURSE_DETAILS_PD_COLUMNS)
    COURSES_DESC_PD = pd.DataFrame(columns=FetchCoursesConstants.COURSES_DESC_PD_COLUMNS)

    @classmethod
    def fetch(cls) -> set:
        cls.get_courses_cub_catalog()
        cls.format_department_info()
        cls.save_department_info()
        print("[FetchCourseService] Successfully Stored Department Info!!!")

        cls.retrevie_course_ids()
        course_info_dictionary = cls.format_course_ids()
        return cls.get_unique_course_ids(course_info_dictionary)

    @classmethod
    def get_courses_cub_catalog(cls) -> None:
        index = 1
        for link in cls.get_soup(FetchCoursesConstants.COURSE_CATALOG_URL).find_all('a'):
            file_link = link.get('href')
            if link.string in FetchCoursesConstants.COURSE_CATALOG:
                cls.LINK_PD.loc[index] = [link.string, file_link, 'https://catalog.colorado.edu' + file_link]
                index += 1

    @classmethod
    def get_soup(cls, url) -> bs:
        return bs(requests.get(url).text, 'html.parser')

    @classmethod
    def format_department_info(cls) -> None:
        cls.DEPARTMENT_PD['department_name'] = cls.LINK_PD["Courses"].str.split("(", n=1, expand=True)[0]
        cls.DEPARTMENT_PD['department_id'] = cls.LINK_PD["Courses"].str.split("(", n=1, expand=True)[1]. \
            str.split(")", n=1, expand=True)[0]

    @classmethod
    def save_department_info(cls) -> None:
        department_info_dict = cls.DEPARTMENT_PD.to_dict('records')
        DepartmentInfo.bulk_save(department_info_dict)

    @classmethod
    def retrevie_course_ids(cls) -> None:
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

    @classmethod
    def format_course_ids(cls) -> list:
        cls.COURSES_DESC_PD['courses_id'] = cls.GET_COURSE_DETAILS_PD['Courses']. \
            str.split(' ', n=1, expand=True)[0].replace(u'\xa0', u' ')
        cls.COURSES_DESC_PD['course_name'] = cls.GET_COURSE_DETAILS_PD["Courses"]. \
            str.split(")", n=1, expand=True)[1].replace(u'\xa0', u' ')
        cls.COURSES_DESC_PD['department_id'] = cls.GET_COURSE_DETAILS_PD["Courses"]. \
            str.split(" ", n=1, expand=True)[0].str.split("\xa0", expand=True)[0]

        cls.COURSES_DESC_PD.head()
        return cls.COURSES_DESC_PD.to_dict('records')

    @classmethod
    def get_unique_course_ids(cls, course_info_dictionary) -> set:
        unique_course = set()

        for course_info in course_info_dictionary:
            value = unicodedata.normalize("NFKD", course_info['courses_id'])
            unique_course.add(value)

        print(f"Total courses at CUB: {len(unique_course)}")
        return unique_course
