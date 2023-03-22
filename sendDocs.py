import requests, json, os
from elasticsearch import Elasticsearch 

mapping = {
    "mappings":  {
        "properties": {
            "Key": {"type": "keyword"},
             "CourseID": {"type":"text"},
             "CourseName": {"type": "text"},
             "DepartmentID": {"type": "text"},
             "CrnID": {"type": "text"},
             "Books": {"type": "text"},
             "Notes": {"type": "text"},
             "RestrictedInfo": {"type": "text"},
             "Description": {"type": "text"},
             "InstructionMode": {"type": "text"},
             "SectionInfo": {
                "type": "nested",
                "properties": {
                    "number": {"type": "text"},
                     "instructor_name": {"type": "text"},
                     "location": {"type": "text"},
                     "schedule": {"type": "text"},
                     "acad_career":{"type": "text"}
                }
             }
        }
    }
}

#connect to elasticsearch
res = requests.get('http://localhost:9200')
print (res.content)

es = Elasticsearch([{'host': 'localhost', 'port': 9200, 'scheme': 'http'}])
response = es.indices.create(index='study_buff', ignore=400, body=mapping)
print('response ', response)

# Opening JSON file
f = open('response.json')
# returns JSON object as a dictionary
data = json.load(f)

idx = 1  
#iterate over JSON file and load it into Elasticsearch
print(data['course_list'][0])
es.index(index="study_buff", id=1, document=data['course_list'][0])

#for i in data['course_list']:
    #print(i)
    #es.index(index="study_buff", id=idx, document=i)
    #idx+=1

# Closing file
f.close()