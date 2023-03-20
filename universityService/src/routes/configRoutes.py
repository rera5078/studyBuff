from ..features.featchAndStoreCourseDetails.routes.fetchCoursesRoute import FetchCoursesRoute
from ..features.search.routes.searchRoute import SearchRoute
from ..features.writeCourseDetailsToES.routes.writeCourseDetailsToESRoute import WriteCourseDetailsToESRoute


def load_config_routes(app):
    app.add_url_rule("/api/v1/universityService/fetchCourses",
                     view_func=FetchCoursesRoute.as_view("fetch_courses_api"))
    app.add_url_rule("/api/v1/universityService/search",
                     view_func=SearchRoute.as_view("search_api"))
    app.add_url_rule("/api/v1/universityService/writeCourseDetailsToES",
                     view_func=WriteCourseDetailsToESRoute.as_view("WriteCourseDetailsToES_api"))
