import uuid


class InitiateSearch:
    """

    """

    @classmethod
    def start(cls, query_params):
        """
        TODO: publish kafka message
        """
        guid = str(uuid.uuid4())
        return guid
