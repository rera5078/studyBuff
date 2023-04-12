#################################################################
#   StudyBuff
#   @version    :   1.0
#   @date       :   03/20/2023
#   @author     :   Pranjal Pathak
#   @python     :   3.8.0
#################################################################

# Imports
import sys
import os
import configparser

# load user defined Classes
from loadReq import *
from loadResources import *
from runNer import *
from runRec import *

# Setting up a Logger
LOG_path = "logs/"
if not os.path.exists(LOG_path): os.mkdir(LOG_path)
logger_filename = LOG_path + "SB_AIBOT__{}.log".format(datetime.now().strftime("_%d-%m-%Y_%H.%M"))
logger = logging.getLogger('ROOT')
logger.setLevel(logging.INFO)
handler = logging.FileHandler(logger_filename)
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s: %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
flask_log = logging.getLogger("werkzeug")
flask_log.setLevel(logging.ERROR)

# load config
def load_config(config_fp, platform='dev'):
    """
        Loads configuration file
        :param:     config_fp: str - filepath
        :param:     platform: str - deployment env {dev, qa, qa1, prod}
        :return:    config: dict - loaded config file in dictionary format
    """

    config = configparser.ConfigParser()
    config.read(config_fp)
    config = dict(config[platform])

    ####### configure ######
    # filepath settings
    parent_dir = os.path.abspath(os.path.dirname(__file__))
    root_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../..")
    for config_key in config.keys():
        if config_key.endswith("fp"):
            config[config_key] = os.path.join(root_dir, config.get(config_key))

    # data type settings
    for config_key in config.keys():
        if config_key.endswith("bool") or config_key.endswith("num"):
            config[config_key] = ast.literal_eval(config.get(config_key))
    ####### configure ######

    logger.info("config loaded.")
    return config

# load static resources in memory
def load_resources(config):
    """
        Loads static resources into memory for pipeline execution
        :param:     config: dict - loaded config dict
        :return:    :msc: - loaded objects/files/models in memory
    """

    # init load resources module
    resources = loadResourcesConfig(config)

    # load resources into memory
    nlp_resources_fp,\
    nlp, \
    course_nlp, \
    assym_model, \
    ssym_model, \
    assym_corpus_embeddings, \
    ssym_corpus_embeddings, \
    df_allcoursesdata, \
    map_cid_cname, \
    map_did_dname, \
    synonyms = resources.load_into_memory()

    return nlp_resources_fp, nlp, course_nlp, assym_model, ssym_model, assym_corpus_embeddings, \
           ssym_corpus_embeddings, df_allcoursesdata, map_cid_cname, map_did_dname, synonyms


# server
app = Flask(__name__)

###################################################
# NER ENDPOINT
###################################################
@app.route('/studybuff/ner', methods=['POST'])
def get_ner():
    """
        Executes custom trained NER engine, and returns a 'list' of entities!
        Headers : { "Content-Type"    : "application/json" }
        Payload : { 
                    "query"           : << USER-TYPED_STRING_PROMPT>>
                }
    """
    logger.info("\n\n\n")
    logger.info(">> ner endpoint hit")
    try:
        # INPUT
        if request.method == "POST":
            input_json = request.json
            query = input_json.get("query")
            if query:
                logger.info("NER QUERY: {}".format(query))
                output = ner_model.run(query)
                logger.info("NER Results: {}".format(output))
            else:
                raise Exception("ERROR: User Input 'query' was not sent in the payload!")
        else:
            raise Exception("ERROR: Incorrect API method used - please use a 'post' request!")
    except Exception as e:
        error_code = "NER EXECUTION ERROR | Trace: \n{}".format(str(e))
        logger.error(error_code)
        output = []
    return jsonify({"entities": output})

###################################################
# REC ENDPOINT
###################################################
@app.route('/studybuff/rec', methods=['POST'])
def get_rec():
    """
        Executes Information Retrieval engine for recommendation
        Headers : { "Content-Type"    : "application/json" }
        Payload : {
                    "query"           : << USER-TYPED_STRING_PROMPT>> OR <<LIST_OF_STRINGS>>
                }
    """
    logger.info("\n\n\n")
    logger.info(">> rec endpoint hit")
    try:
        # INPUT
        if request.method == "POST":
            input_json = request.json
            query = input_json.get("query")
            if query:
                logger.info("REC QUERY: {}".format(query))
                output = rec_system.run(query, display=True)
                logger.info("REC Results: {}".format(output))
            else:
                raise Exception("ERROR: User Input 'query' was not sent in the payload!")
        else:
            raise Exception("ERROR: Incorrect API method used - please use a 'post' request!")
    except Exception as e:
        error_code = "REC EXECUTION ERROR | Trace: \n{}".format(str(e))
        logger.error(error_code)
        output = jsonify([])
    return output

###################################################
# MAIN ENDPOINT
###################################################
@app.route('/studybuff/find', methods=['POST'])
def generate_results():
    """
        Executes the complete pipeline for recommendation
        Headers : { "Content-Type"    : "application/json" }
        Payload : {
                   "query"           : << USER-TYPED_STRING_PROMPT>> OR <<LIST_OF_STRINGS>>
                }
    """
    logger.info("\n\n\n")
    logger.info(">> main endpoint hit")
    try:
        # INPUT
        if request.method == "POST":
            input_json = request.json
            query = input_json.get("query")
            if query:
                logger.info("MAIN QUERY: {}".format(query))
                # executing NER engine
                entities = ner_model.run(query)
                logger.info("ner: {}".format(entities))
                # executing REC ENGINE
                lst_candidates = set()
                if len(entities) > 0:
                    for ent in entities:
                        entity = ent[0]
                        entity_typ = ent[3]
                        if entity_typ == 'COURSE_ID':
                            cname = map_cid_cname.get(entity)
                            if cname:
                                # valid course id
                                lst_candidates.add(cname)
                        elif entity_typ == 'COURSE_NAME':
                            lst_candidates.add(entity)
                        else:
                            if entity in valid_deptnames:
                                lst_candidates.add(entity)
                    lst_candidates = list(lst_candidates)
                    logger.info("candidates: {}".format(lst_candidates))
                    if len(lst_candidates) < 1:
                        recommendations = rec_system.run(query, display=False)
                    elif len(lst_candidates) == 1:
                        recommendations = rec_system.run(lst_candidates[0].strip(), display=False)
                    elif len(lst_candidates) > 1:
                        recommendations = rec_system.run(lst_candidates, display=False)
                    else:
                        pass
                else:
                    recommendations = rec_system.run(query, display=False).to_json(orient='records')
                final_output = {
                    "query": query,
                    "ner": entities,
                }
                final_output.update(recommendations)
                logger.info("final output : {}".format(final_output))
                logger.info("\n\n----\n\n")
            else:
                raise Exception("ERROR: User Input 'query' was not sent in the payload!")
        else:
            raise Exception("ERROR: Incorrect API method used - please use a 'post' request!")
    except Exception as e:
        error_code = "MAIN EXECUTION ERROR | Trace: \n{}".format(str(e))
        logger.error(error_code)
        final_output = jsonify([])
    return final_output


### START ENGINE ###
if __name__ == '__main__':
    logger.info("Starting app now...")

    # load configuration
    config_fp = "./studybuff_ml_engine_config.ini"
    config = load_config(config_fp)    # default: dev env

    # load static resources
    nlp_resources_fp, nlp, course_nlp, assym_model, ssym_model, assym_corpus_embeddings, \
    ssym_corpus_embeddings, df_allcoursesdata, map_cid_cname, map_did_dname, synonyms = load_resources(config)
    valid_cids = set(map_cid_cname.keys())
    valid_deptnames = set(map_did_dname.values())

    # start NER engine
    ner_model = NER(config, course_nlp)

    # start REC engine
    rec_system = RECSYSTEM(config, synonyms, assym_model, ssym_model, assym_corpus_embeddings, ssym_corpus_embeddings, df_allcoursesdata)

    print("*" * 50)
    host_name = "127.0.0.1"
    port_name = "5000"
    print("App running now\tHost: {}\tPort: {}".format(host_name, port_name))
    print("*" * 50, "\n")
    app.run(host=host_name, port=port_name, debug=False)

#EOF