from universityService.src.Features.routes.fetchCoursesRoute import FetchCoursesRoute


def load_config_routes(app):
    app.add_url_rule("/api/v1/university/fetchCourses",
                     view_func=FetchCoursesRoute.as_view("fetch_courses_api"))
