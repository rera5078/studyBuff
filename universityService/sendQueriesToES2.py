import json, requests
from elasticsearch import Elasticsearch 

mapping = {
    "mappings":  {
        "properties": {
            "Query": {"type": "text"}
        }
    }
}

res = requests.get('http://localhost:9200')
print (res.content)

es = Elasticsearch(hosts="http://localhost:9200/")
# Opening JSON file
f = open('../mlEngine/data/final_utterances.json')
# returns JSON object as a dictionary
data = json.load(f)

idx = 663676 
#iterate over JSON file and load it into Elasticsearch
for i in data['utt_course_names']:
    es.index(index="queries_study_buff", id=idx, document={"Query":i})
    idx+=1
# Closing file
f.close()