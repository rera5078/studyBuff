from flask import Flask
from flask_cors import CORS

from .externalServices.database import tables
from .externalServices.database.services.database import Database
from . import routes
from . import services

# Kafka addition
from kafka import KafkaProducer, KafkaConsumer
from multiprocessing import JoinableQueue
import threading


# from . import Producer
# from . import Consumer

# Kafka producer thread
class ProducerThread(threading.Thread):
    def __init__(self, kafka_topic, kafka_server, message_queue):
        threading.Thread.__init__(self)
        self.kafka_topic = kafka_topic
        self.kafka_server = kafka_server
        self.message_queue = message_queue

    def run(self):
        producer = KafkaProducer(bootstrap_servers=self.kafka_server)
        while True:
            message = self.message_queue.get()
            producer.send(self.kafka_topic, message)
            self.message_queue.task_done()


# Kafka consumer thread
class ConsumerThread(threading.Thread):
    def __init__(self, kafka_topic, kafka_server):
        threading.Thread.__init__(self)
        self.kafka_topic = kafka_topic
        self.kafka_server = kafka_server

    def run(self):
        consumer = KafkaConsumer(self.kafka_topic, bootstrap_servers=self.kafka_server)
        for message in consumer:
            print(message.value)  # Replace with your own consumer code


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

    # Start Kafka producer and consumer threads
    kafka_topic = 'test_topic'
    kafka_server = 'localhost:9092'
    producer_thread = ProducerThread(kafka_topic, kafka_server, internal_publish_queue)
    consumer_thread = ConsumerThread(kafka_topic, kafka_server)
    producer_thread.start()
    consumer_thread.start()

    ready = threading.Event()
    app.config["SETUP_OK"] = ready

    return app
