from flask import Flask
from flask_cors import CORS

from .externalServices.database import tables
from .externalServices.database.services.database import Database
from . import routes
from . import services

# from . import Producer
# from . import Consumer

def create_app(config):

    app = Flask(__name__)
    app.config.from_object(config)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    print("CREATED APP INSTANCE!!\n\n")
    Database.init_app(app)
    print("DATABASE INITIALISED")
    tables.init_app()
    print("TABLES CREATED")
    services.init_app()
    print("VIEW INITIALIZED")
    routes.init_app(app)
    print("ROUTES INITIALISED")

    # Adding producer and consumer initialization code
    # Producer.init_app(app)
    # print("Producer INITIALISED")
    # Consumer.init_app(app)
    # print("Consumer INITIALISED")

    return app
