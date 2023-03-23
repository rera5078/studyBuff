from flask import Flask
from flask_cors import CORS

from .externalServices.database import tables
from .externalServices.database.services.database import Database
from . import routes
from . import services

# Kafka addition
from multiprocessing import JoinableQueue
import threading
from confluent_kafka import Producer, Consumer
import json


# Kafka producer thread
def produce(topic, message):
    producer = Producer({'bootstrap.servers': 'localhost:9091'})

    def delivery_report(err, msg):
        if err is not None:
            print('Message delivery failed: {}'.format(err))
        else:
            print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))

    producer.produce(topic, message, callback=delivery_report)

    # Wait for any outstanding messages to be delivered and delivery reports to be received
    producer.flush()


def consume(topic):
    consumer = Consumer({
        'bootstrap.servers': 'localhost:9091',
        'group.id': 'my-group',
        'auto.offset.reset': 'earliest'
    })

    consumer.subscribe([topic])

    while True:
        msg = consumer.poll(1.0)

        if msg is None:
            continue
        if msg.error():
            print("Consumer error: {}".format(msg.error()))
            continue

        print('Received message: {}'.format(json.loads(msg.value())))

    consumer.close()


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

    # Create a JoinableQueue instance
    internal_publish_queue = JoinableQueue()
    print("internal_publish_queue created.")

    ready = threading.Event()
    app.config["SETUP_OK"] = ready

    message = {'name': 'John Doe', 'age': 30}

    # Convert message to JSON
    json_message = json.dumps(message)
    # Create and start the producer thread
    producer_thread = threading.Thread(target=produce, args=('my-topic_1', json_message)) #b'my-message'))
    producer_thread.start()

    # Create and start the consumer thread
    consumer_thread = threading.Thread(target=consume, args=('my-topic_1',))
    consumer_thread.start()

    return app
