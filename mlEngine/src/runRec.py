#################################################################
#   StudyBuff Module - Customized Recommendation Engine
#   @version    :   1.0
#   @date       :   04/01/2023
#   @author     :   Pranjal Pathak
#   @python     :   3.8.0
#################################################################

import os
import sys
import logging
import numpy as np
import pandas as pd
import re
import ftfy
from sentence_transformers import util
logger = logging.getLogger('ROOT')


class RECSYSTEM:

    def __init__(self, config, synonyms, assym_model, ssym_model, assym_corpus_embeddings, ssym_corpus_embeddings, df_allcoursesdata):
        self.config = config
        self.synonyms = synonyms
        self.synonyms_mapper = {v: k for k, v_list in synonyms.items() for v in v_list}
        self.assym_model = assym_model
        self.ssym_model = ssym_model
        self.assym_corpus_embeddings = assym_corpus_embeddings
        self.ssym_corpus_embeddings = ssym_corpus_embeddings
        self.do_preprocess = config.get("rec_do_preprocess_bool")
        self.max_assymeteric_len = config.get("max_assymeteric_len_num")
        self.return_k_similar = config.get("return_k_similar_num")
        self.type_of_query = []   # tells if user asked for online, pre-requisities, etc.

        # get saved All courses meta-data information for IR
        # ** plugin required **
        self.allcoursesdata = df_allcoursesdata

        logger.info("RECSYSTEM initialized")
        return

    def get_model(self, query):
        """
            Chooses a semantic search model based on query length
            :param:    query: str - user input query
            :return:   model: object - use loaded recommender model object
                       corpus_embeddings: tensor - use loaded vectorized embeddings of all courses in tensor fmt
        """
        if len(query) <= self.max_assymeteric_len:
            model = self.assym_model
            corpus_embeddings = self.assym_corpus_embeddings
        else:
            model = self.ssym_model
            corpus_embeddings = self.ssym_corpus_embeddings
        return model, corpus_embeddings

    def preprocess_query(self, query):
        """
            Uses sister pre-process module and executes pre-processing for a given str query
            :param:    query: str - user input query
            :return:   query: str - preprocessed query
        """
        query = str(query).strip()
        query = ftfy.fix_text(query)
        # Find if there are any "online" or "prerequisites" synonymous words to re-route queries to
        # platform specific responses (dialogue management)
        found_synonyms = []
        for finders in self.synonyms.keys():
            isFind = re.findall(r"(?=(" + '|'.join(self.synonyms[finders]) + r"))", query)
            if len(isFind) > 0:
                found_synonyms.append(self.synonyms_mapper[isFind[0]])
        query = re.sub(r"([\s\n\t\r]+)", " ", query).strip()
        query = re.sub(r"[\$|\#\@\*\%]+\d+[\$|\#\@\*\%]+", " ", query)
        query = re.sub(r"[\/,\@,\#,\\,\{,\},\(,\),\[,\],\$,\%,\^,\&,\*,\<,\>]", " ", query)
        query = re.sub(r"[\,,\;,\:,\-]", " ", query)
        query = re.sub(r"[\!,\?,\.]", " ", query)
        query = str(query).strip().lower()
        return query, sorted(set(found_synonyms))

    def get_top_k(self, query, display=False):
        """
            Loads desired model and all-course-embeddings and returns ranked recommendations (IR).
            :param:    query: str - user input query (preprocessed or not)
            :return:   ranked_df:
        """
        # optional pre-processing unit
        found_synonyms = []
        if self.do_preprocess and self.do_preprocess is True:
            query, found_synonyms = self.preprocess_query(query)
        else:
            query = str(query).strip().lower()

        # get loaded configurations
        data = self.allcoursesdata
        model, corpus_embeddings = self.get_model(query)

        # encode sentence to get sentence embeddings
        sentence_embedding = model.encode(query, convert_to_tensor=True)

        # 'top_k' similar results to return
        top_k = self.return_k_similar

        # compute cosine similarity scores
        cos_scores = util.pytorch_cos_sim(sentence_embedding, corpus_embeddings)[0]

        # Sort the results in decreasing order and get the first top_k
        top_results = np.argpartition(-cos_scores, range(top_k))[0:top_k].numpy()

        # IR
        # ConfidenceScore -- cosine similarity score in percentage
        ranked_df = data[data.index.isin(top_results)]
        ranked_df.loc[top_results, "ConfidenceScore"] = [cos_scores[idx]*100.0 for idx in top_results]  # % sim scores
        ranked_df = ranked_df.sort_values(by=['ConfidenceScore'], ascending=False)

        # Dialogue Management
        # if there are any "online" or "prerequisites" synonymous words in user query, re-route responses to match
        # specific answers only.
        self.type_of_query = []
        if len(found_synonyms) > 0:
            if "online_list" in found_synonyms:
                ranked_df = ranked_df[(ranked_df.Mode == "['person', 'online']") |
                                      (ranked_df.Mode == "['online']") |
                                      (ranked_df.Mode == "['independent', 'person', 'online']")]
                self.type_of_query.append("Online")
            if "prereq_list" in found_synonyms:
                ranked_df = ranked_df[ranked_df.Pre != "[]"]
                self.type_of_query.append("Prerequisites")
        else:
            self.type_of_query.append("Person")
        if display:
            for idx in top_results[0:top_k]:
                crn = ranked_df.loc[idx, "CourseName"]
                # print(crn, "\t(Score: %.4f)" % (cos_scores[idx]))
                logger.info("Recommended:\nCourse: {};\t\tScore: {}".format(crn, cos_scores[idx]))
        return ranked_df.reset_index(drop=True)

    def run(self, query, display=False):
        """
            Main Execute Recommender System using Information Retrieval (IR)
        """
        ###########
        # Q --> multiple list of str queries
        ###########
        if isinstance(query, list) or isinstance(query, tuple) or isinstance(query, pd.Series):
            n = int(self.return_k_similar)
            k = len(query)
            dists = np.arange(n+k-1, n-1, -1) // k   # distribute n number of required recommendations into k groups
            ranked_similar_courses_metadata = pd.DataFrame()
            for i, q in enumerate(query):
                ranked_similar_courses_metadata = ranked_similar_courses_metadata.append(self.get_top_k(q, display=False)[:dists[i]])
        ###########
        # Q --> single str query
        ###########
        elif isinstance(query, str):
            if query is None or len(query.strip()) < 3 or query == "":
                return []
            ranked_similar_courses_metadata = self.get_top_k(query, display=display)
        else:
            raise Exception("Invalid query type! Accepted str, list, series.")
        ###########
        # final
        output = {
            "top_similar_count": self.return_k_similar,
            "platform": self.type_of_query,
            "top_similar_courses": ranked_similar_courses_metadata.reset_index(drop=True).to_json(orient='records')
        }
        ###########
        return output

#EOF