#################################################################
#   StudyBuff Module - Loading all static resources
#   @version    :   1.0
#   @date       :   03/20/2023
#   @author     :   Pranjal Pathak
#   @python     :   3.8.0
#################################################################

import os
import pandas as pd
import sys
import pickle
import json
import spacy
from sentence_transformers import SentenceTransformer, util
import logging
logger = logging.getLogger('ROOT')

class loadResourcesConfig:

    def __init__(self, config):
        self.config = config

    def load_json(self, json_path):
        with open(json_path, "r") as f:
            return json.load(f)

    def load_csv(self, csv_path):
        return pd.read_csv(csv_path, index_col=False)

    def load_excel(self, excel_path):
        return pd.read_excel(excel_path)

    def load_nlp_res(self, nlp_res_fp):
        """
            Loads essential NLP resources.
        """
        nlp_resources_fp = nlp_res_fp
        return nlp_resources_fp

    def load_spacy(self,
                   spacy_model_fp,                      # fp: "en_core_web_lg-3.5.0"
                   spacy_trained_ner_model_fp           # fp: "trained_ner_model_v1.0"
                   ):
        """
            Loads NER models.
        """
        nlp = spacy.load(spacy_model_fp)
        course_nlp = spacy.load(spacy_trained_ner_model_fp)
        return nlp, course_nlp

    def load_sbert(self,
                   sbert_assym_model_fp,                # fp: "msmarco-distilbert-base-dot-prod-v3"
                   sbert_ssym_model_fp,                 # fp: "all-distilroberta-v1"
                   sbert_assym_corpus_embeddings_fp,    # fp: "simLookup_assym_corpus_embeddings.pkl"
                   sbert_ssym_corpus_embeddings_fp      # fp: "simLookup_ssym_corpus_embeddings.pkl"
                   ):
        """
            Loads sentence Transformer tuned models and trained course description embeddings
        """
        assym_model = SentenceTransformer(sbert_assym_model_fp)
        ssym_model = SentenceTransformer(sbert_ssym_model_fp)

        with open(sbert_assym_corpus_embeddings_fp, "rb") as fp:
            assym_corpus_embeddings = pickle.load(fp)

        with open(sbert_ssym_corpus_embeddings_fp, "rb") as fp:
            ssym_corpus_embeddings = pickle.load(fp)

        return assym_model, ssym_model, assym_corpus_embeddings, ssym_corpus_embeddings

    def load_into_memory(self):
        """
            For loading resources like files, models and objects into memory
        """
        # loadable objects
        nlp_res_fp = self.config.get("nlp_resources_fp")
        spacy_model_fp = self.config.get("spacy_fp")
        spacy_trained_ner_model_fp = self.config.get("ner_model_fp")
        sbert_assym_model_fp = self.config.get("assym_sbert_fp")
        sbert_ssym_model_fp = self.config.get("ssym_sbert_fp")
        sbert_assym_corpus_embeddings_fp = self.config.get("assym_embed_fp")
        sbert_ssym_corpus_embeddings_fp = self.config.get("ssym_embed_fp")
        allcoursesdata_fp = self.config.get("allcoursesdata_fp")
        synonyms_fp = self.config.get("synonyms_fp")

        ######
        # loading all resources in memory
        df_allcoursesdata = self.load_csv(allcoursesdata_fp)
        # df_allcoursesdata['Pre'] = list(map(ast.literal_eval, df_allcoursesdata['Pre']))        # custom!
        # df_allcoursesdata['Mode'] = list(map(ast.literal_eval, df_allcoursesdata['Mode']))      # custom!
        nlp_resources_fp = self.load_nlp_res(nlp_res_fp)
        synonyms = self.load_json(synonyms_fp)
        nlp, course_nlp = self.load_spacy(spacy_model_fp, spacy_trained_ner_model_fp)
        assym_model, ssym_model, assym_corpus_embeddings, ssym_corpus_embeddings = self.load_sbert(sbert_assym_model_fp, sbert_ssym_model_fp, sbert_assym_corpus_embeddings_fp, sbert_ssym_corpus_embeddings_fp)

        # create CourseID: CourseName and DeptID:DeptName mappers
        if {'CourseId', 'CourseName', 'DepartmentId', 'DepartmentName'}.issubset(df_allcoursesdata.columns):
            map_cid_cname = {k.lower(): v[0].lower() for k, v in df_allcoursesdata[['CourseId', 'CourseName']].set_index('CourseId').T.to_dict('list').items()}
            map_did_dname = {k.lower(): v[0].lower() for k, v in df_allcoursesdata[['DepartmentId', 'DepartmentName']].set_index('DepartmentId').T.to_dict('list').items()}
        else:
            raise Exception("Required field names are missing from the loaded course mapper file!")

        logger.info("all resources loaded.")
        return (
            nlp_resources_fp,
            nlp,
            course_nlp,
            assym_model,
            ssym_model,
            assym_corpus_embeddings,
            ssym_corpus_embeddings,
            df_allcoursesdata,
            map_cid_cname,
            map_did_dname,
            synonyms
        )

#EOF