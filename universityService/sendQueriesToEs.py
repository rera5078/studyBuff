import json
from elasticsearch import Elasticsearch 

mapping = {
    "mappings":  {
        "properties": {
            "Query": {"type": "text"}
        }
    }
}
es = Elasticsearch(hosts="http://elastic:12312jkhfwdeldncxmfndsa67890wfndsvmdcs@localhost:9200/")
es.indices.create(index='queries_study_buff', ignore=400, body=mapping)

# Opening JSON file
f = open('../mlEngine/data/final_utterances.json')
# returns JSON object as a dictionary
data = json.load(f)

idx = 1  
#iterate over JSON file and load it into Elasticsearch
for i in data['utt_course_ids']:
    temp = {"Query":i}
    es.index(index="queries_study_buff", id=idx, document=temp)
    idx+=1

# Closing file
f.close()