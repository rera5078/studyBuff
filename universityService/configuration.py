from os import environ


class FlaskConfig(object):
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PORT = environ.get("PORT", "15000")
    HOST = "0.0.0.0"


class DevelopmentConfig(FlaskConfig):
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URL", "postgresql://postgres:postgres@localhost:32768/postgres")
    MESSAGE_QUEUE_URI = environ.get("MESSAGE_QUEUE_URI", "amqp://guest:guest@0.0.0.0:5672")
    SECRET_KEY = environ.get("SECRET_KEY", "secret!")
