from bs4 import BeautifulSoup as bs
import urllib
import urllib.request
import requests
import dask.dataframe as dd
import pandas as pd
import numpy as np
import csv

from ..constants.fetchCoursesConstatnts import FetchCoursesConstants
from ..externalServices.database.tables import DepartmentInfo


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
        DepartmentInfo.delete_all_department_data()
        print("[FetchCourseService] Cleared existing Department Information!!!")

        index = 1

        for link in cls.get_soup(FetchCoursesConstants.URL).find_all('a'):
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
                print("current course count: ", current_course_counter)
                current_course_counter += 1
                cls.GET_COURSE_DETAILS_PD.loc[current_course_counter] = [course_name.find('p').text,
                                                                         cls.LINK_PD['full_links'][i]]

        print(f"Fetched {current_course_counter} Courses Success !!!")

        cls.COURSES_DESC_PD['courses_id'] = cls.GET_COURSE_DETAILS_PD['Courses']. \
            str.split(' ', n=1, expand=True)[0].replace(u'\xa0', u' ')
        cls.COURSES_DESC_PD['course_name'] = cls.GET_COURSE_DETAILS_PD["Courses"]. \
            str.split(")", n=1, expand=True)[1].replace(u'\xa0', u' ')
        cls.COURSES_DESC_PD['department_id'] = cls.GET_COURSE_DETAILS_PD["Courses"]. \
            str.split(" ", n=1, expand=True)[0].str.split("\xa0", expand=True)[0]

        cls.COURSES_DESC_PD.head()
        course_info_dictionary = cls.COURSES_DESC_PD.to_dict('records')

