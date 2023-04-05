#################################################################
#   StudyBuff Module - Customized Named Entity Recognition
#   @version    :   1.0
#   @date       :   03/20/2023
#   @author     :   Pranjal Pathak
#   @python     :   3.8.0
#################################################################

import ftfy
import re
import logging
logger = logging.getLogger('ROOT')


def preprocess(sent):
    """
        Generic pre-processing module for a given str query
        :param:     sent: str - user input query
        :return:    sent: str - minimal preprocessed query
    """
    sent = str(sent).strip()
    sent = ftfy.fix_text(sent)
    sent = re.sub(r"([\s\n\t\r]+)", " ", sent).strip()
    sent = re.sub(r"[\$|\#\@\*\%]+\d+[\$|\#\@\*\%]+", " ", sent)
    sent = re.sub(r"[\/,\@,\#,\\,\{,\},\(,\),\[,\],\$,\%,\^,\&,\*,\<,\>]", " ", sent)
    sent = re.sub(r"[\,,\;,\:,\-]", " ", sent)
    sent = re.sub(r"[\!,\?,\.]", " ", sent)
    sent = str(sent).strip().lower()
    return sent


class NER:

    def __init__(self, config, course_nlp):
        self.do_preprocess = config.get("ner_do_preprocess_bool")
        self.course_nlp = course_nlp
        logger.info("NER initialized")
        return

    def extract_ents(self, query):
        """
            Extract NER entities using loaded ner model for a given str query
            :param:     query: str - user query (preprocessed or not)
            :return:    extracted_entities: list - extracted str entities e.g. [('big data architec', 48, 65, 'COURSE_NAME')]
        """
        doc = self.course_nlp(query)
        extracted_entities = []
        for ent in doc.ents:
            extracted_entities.append((ent.text, ent.start_char, ent.end_char, ent.label_))
        return extracted_entities

    def run(self, query):
        """
            Main Execute NER
        """
        if query is None or len(query.strip()) < 3 or query == "":
            return []

        if self.do_preprocess and self.do_preprocess is True:
            query = preprocess(query)

        entities = self.extract_ents(query)
        return entities

#EOF