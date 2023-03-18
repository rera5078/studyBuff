import uuid


class InitiateSearch:
    """

    """

    def start(self, query_params):
        """
        TODO: publish kafka message
        """
        guid = str(uuid.uuid4())
        return guid
