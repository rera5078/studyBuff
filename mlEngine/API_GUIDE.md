# API 1:
- Accepts any STRING or list of STRING which is typically a short query.
- Runs the NER Engine.
- Returns list of extracted entities in JSON.

```yaml
endpoint: /studybuff/ner
methods = POST
payload-type: JSON
payload: 
    {
        "query": "<<__TEXT__OR__LIST_OF_TEXTS__>>"
    }
response:
    {
        "entities": [<<__LIST_OF_ENTITIES__>>]
    }
            
    :: Response ::
    {
        "entities": [
            [
                EXTRACTED_COURSE_ID,
                EXTRACTED_COURSE_ID_START_TEXT,
                EXTRACTED_COURSE_ID_END_TEXT,
                "COURSE_ID"
            ],
            [
                EXTRACTED_DEPARTMENT,
                EXTRACTED_DEPARTMENT_START_TEXT,
                EXTRACTED_DEPARTMENT_END_TEXT,
                "COURSE_DEPT"
            ]
            [
                EXTRACTED_COURSE_NAME,
                EXTRACTED_COURSE_NAME_START_TEXT,
                EXTRACTED_COURSE_NAME_END_TEXT,
                "COURSE_NAME"
            ]
        ]
    }
```
  

***
Example:
***

##### URL
```yaml
http://127.0.0.1:5000/studybuff/ner
```
   
##### PAYLOAD
```yaml
{
    "query": "Should i consider courses similar to CSCI 5210 or courses from Department of Accounting ?"
}
```

##### RESPONSE
```yaml
{
    "entities": [
        [
            "csci 5210",
            37,
            46,
            "COURSE_ID"
        ],
        [
            "department of accounting",
            63,
            87,
            "COURSE_DEPT"
        ]
    ]
}
```


# API 2:
- Accepts a STRING or list of STRINGS which is basically a Course ID, Name or a Department.
- Runs the Recommender Engine
- Returns list of similar courses along with metadata in JSON.


```yaml
endpoint: /studybuff/rec
methods = POST
payload-type: JSON
payload: 
    {
        "query": "<<__TEXT__OR__LIST_OF_TEXTS__>>"
    }
response:
    {
        "platform": <<__LIST_OF_QUERY_INFERRED_MODE__>>,
        "top_similar_count": <<__COUNT_OF_RECOMMENDATIONS__>>,
        "top_similar_courses": <<__JSONIFY_DATAFRAME__>>
    }
  
    :: Response ::
    {
        "platform": [
            TYPE_OF_PLATFORM ("Online" -OR- "Prerequisites" -OR- "Person")
        ],
        "top_similar_count": COUNT_OF_RETURNED_SIMILAR_COURSES
        "top_similar_courses": "
        [
            {
                'CourseId'                  :   COURSE-ID,
                'CourseName'                :   COURSE-NAME,
                'DepartmentId'              :   DEPT-ID,
                'DepartmentName'            :   DEPT-NAME,
                'Desc'                      :   ORIGINAL RAW COURSE DESCRIPTION,
                'Pre'                       :   LIST OF PRE-REQ COURSE IDS,
                'Mode'                      :   INFERED FROM USER QUERY ONE OR MORE FROM (Person, Online, Prerequisite),
                'CourseKeywords'            :   EXTRACTED IMPORTANT KEYWORDS,
                'CourseKeyPhrases'          :   EXTRACTED IMPORTANT 2-3 WORD PHRASES,
                'CourseSummary'             :   EXTRACTIVE SUMMARY OF COURSE DESC,
                'CourseDifficulty'          :   LEVEL OF DIFFICULTY TO COMPLETE COURSE (between 0.0 - 1.0)
                'CourseDifficultyBand'      :   LEVEL OF DIFFICULTY TO COMPLETE COURSE ONE FROM (Very Easy, Easy, Medium, Difficult, Very Difficult),
                'ConfidenceScore'           :   COSINE SIMILARITY SCORE IN PERCENTAGE
            },
            {
                ...
            },
            {...}
        ]
    }
```

***
Example:
***

##### URL
```yaml
http://127.0.0.1:5000/studybuff/rec
```
   
##### PAYLOAD
```yaml
{
    "query": ["Big Data", "machine learning"]
}
```

##### RESPONSE
```yaml
{
    "platform": [
        "Person"
    ],
    "top_similar_count": 8,
    "top_similar_courses": "
    [
        {
              'CourseId': 'ATLS 5214',
              'CourseName': 'Big Data Architecture',
              'DepartmentId': 'ATLS',
              'DepartmentName': 'Department of Atlas Institute',
              'Desc': 'Provides students with a comprehensive survey of technologies used today in the collection, storage, processing, analytics and display of big data. Focuses on cultivating real world skills with students working on semester long projects to execute on a group project. Same as ATLS 4214.',
              'Pre': '[]',
              'Mode': "['person']",
              'CourseKeywords': "['atls', 'technologies', 'projects', 'students', 'analytics', 'data']",
              'CourseKeyPhrases': "['project atls', 'project atls 4214', 'group project atls', 'big data', 'atls', 'provides students comprehensive', 'students comprehensive', 'students comprehensive survey']",
              'CourseSummary': 'Provides students with a comprehensive survey of technologies used today in the collection, storage, processing, analytics and display of big data. Focuses on cultivating real world skills with students working on semester long projects to execute on a group project. Same as ATLS 4214.',
              'CourseDifficulty': 0.554850408,
              'CourseDifficultyBand': 'Medium',
              'ConfidenceScore': 57.3757781982
        },
        {
              'CourseId': 'CSCI 6502',
              'CourseName': 'Big Data Analytics: Systems, Algorithms, and Applications',
              'DepartmentId': 'CSCI',
              'DepartmentName': 'Department of Computer Science',
              'Desc': 'This course studies state-of-the-art practice and research on efficient and effective systems and algorithms design for managing and exploring massive amounts of digital data in various application domains. The course takes an integrated approach that studies all three aspects of big data analytics: systems, algorithms, and applications. Specifically, this course covers big data systems for MapReduce, NoSQL, stream processing, deep learning, mobile/wearable/IoT sensing, as well as practical use of indexing, sketching, recommendation, graph, and deep learning algorithms. Domain-specific data management and analysis, such as those in online social networks, scientific discovery, business intelligence, health informatics, urban computing, are also covered.',
              'Pre': '[]',
              'Mode': "['person', 'online']",
              'CourseKeywords': "['mapreduce', 'nosql', 'analytics', 'iot', 'computing', 'informatics']",
              'CourseKeyPhrases': "['big data', 'big data analytics', 'big data systems', 'covers big data', 'mapreduce', 'data systems mapreduce', 'systems mapreduce', 'mapreduce nosql']",
              'CourseSummary': 'Specifically, this course covers big data systems for MapReduce, NoSQL, stream processing, deep learning, mobile/wearable/IoT sensing, as well as practical use of indexing, sketching, recommendation, graph, and deep learning algorithms. The course takes an integrated approach that studies all three aspects of big data analytics: systems, algorithms, and applications. This course studies state-of-the-art practice and research on efficient and effective systems and algorithms design for managing and exploring massive amounts of digital data in various application domains.',
              'CourseDifficulty': 0.7309610154,
              'CourseDifficultyBand': 'Difficult',
              'ConfidenceScore': 56.6758880615
        },
        {
              'CourseId': 'ATLS 4214',
              'CourseName': 'Big Data Architecture',
              'DepartmentId': 'ATLS',
              'DepartmentName': 'Department of Atlas Institute',
              'Desc': 'Provides students with a comprehensive survey of technologies used today in the collection, storage, processing, analytics and display of big data. Focuses on cultivating real world skills with students working on semester long projects to execute on a group project. Same as ATLS 5214.',
              'Pre': "['CSCI 2270', 'CSCI 2275']",
              'Mode': "['person']",
              'CourseKeywords': "['atls', 'technologies', 'projects', 'students', 'analytics', 'comprehensive']",
              'CourseKeyPhrases': "['project atls', 'project atls 5214', 'group project atls', 'big data', 'provides students comprehensive', 'students comprehensive survey', 'students comprehensive', 'semester long projects']",
              'CourseSummary': 'Provides students with a comprehensive survey of technologies used today in the collection, storage, processing, analytics and display of big data. Focuses on cultivating real world skills with students working on semester long projects to execute on a group project. Same as ATLS 5214.',
              'CourseDifficulty': 0.554850408,
              'CourseDifficultyBand': 'Medium',
              'ConfidenceScore': 56.6202163696
        },
        {
              'CourseId': 'GEOG 3023',
              'CourseName': 'Statistics and Geographic Data',
              'DepartmentId': 'GEOG',
              'DepartmentName': 'Department of Geography',
              'Desc': 'Introduces computational and statistical tools to solve problems in the geographic domain.  Provides an understanding of introductory statistical concepts and applies them to real world problems through lab exercises. Emphasizes spatial data, which requires specialized descriptive and predictive analysis techniques. Demonstrates how to manipulate and visualize data, and make inference using state-of-the art statistics software, applied to various social and earth science problems. Same as GEOL 3023.',
              'Pre': '[]',
              'Mode': "['person', 'online']",
              'CourseKeywords': "['geographic', 'statistical', 'statistics', 'spatial', 'geol', 'computational']",
              'CourseKeyPhrases': "['spatial data', 'spatial data requires', 'solve problems geographic', 'science problems geol', 'problems geographic', 'state art statistics', 'geographic', 'introductory statistical concepts']",
              'CourseSummary': 'Introduces computational and statistical tools to solve problems in the geographic domain. Demonstrates how to manipulate and visualize data, and make inference using state-of-the art statistics software, applied to various social and earth science problems. Emphasizes spatial data, which requires specialized descriptive and predictive analysis techniques.',
              'CourseDifficulty': 0.6077364763,
              'CourseDifficultyBand': 'Medium',
              'ConfidenceScore': 46.8527641296
        },
        {
              'CourseId': 'CSCI 5622',
              'CourseName': 'Machine Learning',
              'DepartmentId': 'CSCI',
              'DepartmentName': 'Department of Computer Science',
              'Desc': 'Trains students to build computer systems that learn from experience. Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Covers connections to data mining and statistical modeling. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.',
              'Pre': "['MATH 2130', 'APPM 3570', 'APPM 3310', 'MATH 3510', 'MCEN 3047', 'STAT 3100', 'ECON 3818', 'ECEN 3810', 'CSCI 2820', 'CVEN 3227', 'CHEN 3010', 'CSCI 3022']",
              'Mode': "['person', 'online']",
              'CourseKeywords': "['learning', 'algorithms', 'supervised', 'modeling', 'networks', 'machines']",
              'CourseKeyPhrases': "['computer systems learn', 'decision trees', 'data mining', 'machines learning', 'decision trees support', 'unsupervised learning', 'used algorithms neural', 'learning']",
              'CourseSummary': 'Emphasizes practical and theoretical understanding of the most widely used algorithms (neural networks, decision trees, support vector machines, Q-learning). Includes the three main subfields: supervised learning, reinforcement learning and unsupervised learning. A strong foundation in probability, statistics, multivariate calculus, and linear algebra is highly recommended.',
              'CourseDifficulty': 0.64381233,
              'CourseDifficultyBand': 'Medium',
              'ConfidenceScore': 69.7053222656
        },
        {
              'CourseId': 'CSCI 4622',
              'CourseName': 'Machine Learning',
              'DepartmentId': 'CSCI',
              'DepartmentName': 'Department of Computer Science',
              'Desc': 'Introduces students to tools, methods, and theory to construct predictive and inferential models that learn from data. Focuses on supervised machine learning technique including practical and theoretical understanding of the most widely used algorithms (decision trees, support vector machines, ensemble methods, and neural networks). Emphasizes both efficient implementation of algorithms and understanding of mathematical foundations. Same as CSPB 4622.',
              'Pre': "['MATH 3510', 'MCEN 3047', 'STAT 3100', 'ECON 3818', 'ECEN 3810', 'CVEN 3227', 'CSCI 3022']",
              'Mode': "['person']",
              'CourseKeywords': "['supervised', 'models', 'algorithms', 'learning', 'predictive', 'ensemble']",
              'CourseKeyPhrases': "['machine learning technique', 'machine learning', 'supervised machine learning', 'supervised machine', 'decision trees', 'algorithms decision trees', 'decision trees support', 'inferential models learn']",
              'CourseSummary': 'Focuses on supervised machine learning technique including practical and theoretical understanding of the most widely used algorithms (decision trees, support vector machines, ensemble methods, and neural networks). Emphasizes both efficient implementation of algorithms and understanding of mathematical foundations. Introduces students to tools, methods, and theory to construct predictive and inferential models that learn from data.',
              'CourseDifficulty': 0.6400347537,
              'CourseDifficultyBand': 'Medium',
              'ConfidenceScore': 67.9096069336
        },
        {
              'CourseId': 'INFO 5604',
              'CourseName': 'Applied Machine Learning',
              'DepartmentId': 'INFO',
              'DepartmentName': 'Information Science Department',
              'Desc': 'Introduces algorithms and tools for building intelligent computational systems. Methods will be surveyed for classification, regression and clustering in the context of applications such as document filtering and image recognition. Students will learn the theoretical underpinnings of common algorithms (drawing from mathematical disciplines including statistics and optimization) as well as the skills to apply machine learning in practice. Same as INFO 4604.',
              'Pre': '[]',
              'Mode': "['person']",
              'CourseKeywords': "['algorithms', 'classification', 'clustering', 'recognition', 'computational', 'learning']",
              'CourseKeyPhrases': "['building intelligent computational', 'intelligent computational', 'intelligent computational systems', 'algorithms', 'machine learning', 'apply machine learning', 'classification', 'common algorithms']",
              'CourseSummary': 'Students will learn the theoretical underpinnings of common algorithms (drawing from mathematical disciplines including statistics and optimization) as well as the skills to apply machine learning in practice. Methods will be surveyed for classification, regression and clustering in the context of applications such as document filtering and image recognition. Introduces algorithms and tools for building intelligent computational systems.',
              'CourseDifficulty': 0.6384859474,
              'CourseDifficultyBand': 'Medium',
              'ConfidenceScore': 67.6616821289
        },
        {
              'CourseId': 'CSPB 4622',
              'CourseName': 'Machine Learning',
              'DepartmentId': 'CSPB',
              'DepartmentName': 'Department of Cognitive Science and Psychology of Behavior',
              'Desc': 'Introduces students to tools, methods, and theory to construct predictive and inferential models that learn from data. Focuses on supervised machine learning technique including practical and theoretical understanding of the most widely used algorithms (decision trees, support vector machines, ensemble methods, and neural networks). Emphasizes both efficient implementation of algorithms and understanding of mathematical foundations. Same as CSCI 4622.',
              'Pre': '[]',
              'Mode': "['online']",
              'CourseKeywords': "['supervised', 'algorithms', 'models', 'learning', 'predictive', 'methods']",
              'CourseKeyPhrases': "['machine learning technique', 'machine learning', 'supervised machine learning', 'supervised machine', 'algorithms decision trees', 'decision trees', 'learning technique', 'inferential models learn']",
              'CourseSummary': 'Focuses on supervised machine learning technique including practical and theoretical understanding of the most widely used algorithms (decision trees, support vector machines, ensemble methods, and neural networks). Emphasizes both efficient implementation of algorithms and understanding of mathematical foundations. Introduces students to tools, methods, and theory to construct predictive and inferential models that learn from data.',
              'CourseDifficulty': 0.6400347537,
              'CourseDifficultyBand': 'Medium',
              'ConfidenceScore': 67.446723938
        }
    ]
}
```

# API 3:
- Accepts any STRING or list of STRINGS which is typically a short query.
- Runs the NER Engine first, extract entities such as Course ID, Name or Department as specified in the user query.
- Runs the Recommender engine using the extracted entities.
- Returns list of similar courses along with metadata in JSON.

```yaml
endpoint: /studybuff/find
methods = POST
payload-type: JSON
payload: 
    {
        "query": "<<__TEXT__OR__LIST_OF_TEXTS__>>"
    }
response:
    {
        "query": <<__ORIGINAL_QUERY_GIVEN_BY_USER__>>,
        "ner": <<__LIST_OF_ENTITIES_EXTRACTED__>>,
        "platform": <<__LIST_OF_QUERY_INFERRED_MODE__>>,
        "top_similar_count": <<__COUNT_OF_RECOMMENDATIONS__>>,
        "top_similar_courses": <<__JSONIFY_DATAFRAME__>>
    }

    :: Response ::
    {
        "query": STRING OR LIST OF STRING
        "ner": 
          [
            [
                EXTRACTED_COURSE_ID,
                EXTRACTED_COURSE_ID_START_TEXT,
                EXTRACTED_COURSE_ID_END_TEXT,
                "COURSE_ID"
            ],
            [
                EXTRACTED_DEPARTMENT,
                EXTRACTED_DEPARTMENT_START_TEXT,
                EXTRACTED_DEPARTMENT_END_TEXT,
                "COURSE_DEPT"
            ]
            [
                EXTRACTED_COURSE_NAME,
                EXTRACTED_COURSE_NAME_START_TEXT,
                EXTRACTED_COURSE_NAME_END_TEXT,
                "COURSE_NAME"
            ]
        ],
        "platform": [
            TYPE_OF_PLATFORM ("Online" -OR- "Prerequisites" -OR- "Person")
        ],
        "top_similar_count": COUNT_OF_RETURNED_SIMILAR_COURSES
        "top_similar_courses": "
        [
            {
                'CourseId'                  :   COURSE-ID,
                'CourseName'                :   COURSE-NAME,
                'DepartmentId'              :   DEPT-ID,
                'DepartmentName'            :   DEPT-NAME,
                'Desc'                      :   ORIGINAL RAW COURSE DESCRIPTION,
                'Pre'                       :   LIST OF PRE-REQ COURSE IDS,
                'Mode'                      :   INFERED FROM USER QUERY ONE OR MORE FROM (Person, Online, Prerequisite),
                'CourseKeywords'            :   EXTRACTED IMPORTANT KEYWORDS,
                'CourseKeyPhrases'          :   EXTRACTED IMPORTANT 2-3 WORD PHRASES,
                'CourseSummary'             :   EXTRACTIVE SUMMARY OF COURSE DESC,
                'CourseDifficulty'          :   LEVEL OF DIFFICULTY TO COMPLETE COURSE (between 0.0 - 1.0)
                'CourseDifficultyBand'      :   LEVEL OF DIFFICULTY TO COMPLETE COURSE ONE FROM (Very Easy, Easy, Medium, Difficult, Very Difficult),
                'ConfidenceScore'           :   COSINE SIMILARITY SCORE IN PERCENTAGE
            },
            {
                ...
            },
            {...}
        ]
    }
```

***
Example:
***

##### URL
``` yaml
http://127.0.0.1:5000/studybuff/find
```
   
##### PAYLOAD
```yaml
{
    "query": "Should I consider CSCI 4593 or consider courses like OLD ENGLISH???"
}
```

##### RESPONSE
```yaml
{
    "query": "Should I consider CSCI 4593 or consider courses like OLD ENGLISH???",
    "ner": [
                [
                    "csci 4593",
                    18,
                    27,
                    "COURSE_ID"
                ],
                [
                    "old english",
                    53,
                    64,
                    "COURSE_NAME"
                ]
            ],
    "platform": [
        "Person"
    ],
    "top_similar_count": 8,
    "top_similar_courses": "
    [
        {
            'CourseId': 'ENGL 4003',
            'CourseName': 'Old English 1: Introduction to Old English',
            'DepartmentId': 'ENGL',
            'DepartmentName': 'Department of English',
            'Desc': 'Introduces students to Old English, the ancient ancestor of Modern English (as Latin is the ancestor of Spanish and Italian, distinct from both). Course will focus on reading knowledge through grammar study and translation, and to a lesser extent on pronunciation. Provides basic parsing and translation skills and an introduction to the history, culture, and literature of early medieval Britain. Provides an introduction to grammar and to the history of the English language. Same as ENGL 5003.',
            'Pre': '[]',
            'Mode': "['person']",
            'CourseKeywords': "['english', 'engl', 'language', 'latin', 'medieval', 'reading']",
            'CourseKeyPhrases': "['students old english', 'english language engl', 'history english language', 'modern english', 'history english', 'ancestor modern english', 'modern english latin', 'language engl']",
            'CourseSummary': 'Provides an introduction to grammar and to the history of the English language. Provides basic parsing and translation skills and an introduction to the history, culture, and literature of early medieval Britain. Introduces students to Old English, the ancient ancestor of Modern English (as Latin is the ancestor of Spanish and Italian, distinct from both).',
            'CourseDifficulty': 0.5801223935,
            'CourseDifficultyBand': 'Medium',
            'ConfidenceScore': 58.5100784302
        },
        {
            'CourseId': 'LING 1010',
            'CourseName': 'The Study of Words',
            'DepartmentId': 'LING',
            'DepartmentName': 'Linguistics Department',
            'Desc': 'Study of English words of Latin and Greek origin, focusing on etymological meaning by analysis of component parts (prefixes, bases, suffixes) and on the ways in which words have changed and developed semantically. Same as CLAS 1010.',
            'Pre': '[]',
            'Mode': "['online']",
            'CourseKeywords': "['etymological', 'latin', 'suffixes', 'greek', 'prefixes', 'semantically']",
            'CourseKeyPhrases': "['english words latin', 'words latin greek', 'etymological meaning analysis', 'words latin', 'latin greek origin', 'ways words changed', 'latin greek', 'suffixes ways words']",
            'CourseSummary': 'Same as CLAS 1010. Study of English words of Latin and Greek origin, focusing on etymological meaning by analysis of component parts (prefixes, bases, suffixes) and on the ways in which words have changed and developed semantically.',
            'CourseDifficulty': 0.5504306437,
            'CourseDifficultyBand': 'Medium',
            'ConfidenceScore': 43.4054336548
        },
        {
            'CourseId': 'SPAN 1010',
            'CourseName': 'Beginning Spanish 1',
            'DepartmentId': 'SPAN',
            'DepartmentName': 'Spanish and Portuguese Department',
            'Desc': 'A beginning course that assumes no prior knowledge or experience with Spanish. A variety of language-teaching approaches are used to help students develop all four basic language skills: listening, speaking, reading and writing. Degree credit not granted for this course and SPAN 1150.',
            'Pre': '[]',
            'Mode': "['person', 'online']",
            'CourseKeywords': "['spanish', 'teaching', 'language', 'basic', 'skills', 'students']",
            'CourseKeyPhrases': "['basic language skills', 'language teaching', 'language teaching approaches', 'develop basic language', 'experience spanish', 'language skills', 'knowledge experience spanish', 'spanish variety language']",
            'CourseSummary': 'A beginning course that assumes no prior knowledge or experience with Spanish. A variety of language-teaching approaches are used to help students develop all four basic language skills: listening, speaking, reading and writing. Degree credit not granted for this course and SPAN 1150.',
            'CourseDifficulty': 0.5147703234,
            'CourseDifficultyBand': 'Medium',
            'ConfidenceScore': 41.5093383789
        },
        {
            'CourseId': 'HIST 4103',
            'CourseName': 'England from the Viking Age to the Tudors',
            'DepartmentId': 'HIST',
            'DepartmentName': 'History Department',
            'Desc': 'During the Middle Ages Germanic values of honor and retribution became deeply ingrained in the warrior culture of the English aristocracy. This course begins with an examination of the Scandinavian and Germanic roots of this warrior culture before exploring the residue of that culture in the centuries leading up to the Tudor period. Recommended prerequisite: HIST 1011 or HIST 1113.',
            'Pre': '[]',
            'Mode': "['person']",
            'CourseKeywords': "['germanic', 'honor', 'tudor', 'warrior', 'aristocracy', 'retribution']",
            'CourseKeyPhrases': "['germanic values honor', 'middle ages germanic', 'warrior culture english', 'ages germanic values', 'germanic roots warrior', 'ingrained warrior culture', 'germanic values', 'warrior culture']",
            'CourseSummary': 'This course begins with an examination of the Scandinavian and Germanic roots of this warrior culture before exploring the residue of that culture in the centuries leading up to the Tudor period. During the Middle Ages Germanic values of honor and retribution became deeply ingrained in the warrior culture of the English aristocracy. Recommended prerequisite: HIST 1011 or HIST 1113.',
            'CourseDifficulty': 0.605394379,
            'CourseDifficultyBand': 'Medium',
            'ConfidenceScore': 40.5170516968
        },
        {
            'CourseId': 'CSCI 4593',
            'CourseName': 'Computer Organization',
            'DepartmentId': 'CSCI',
            'DepartmentName': 'Department of Computer Science',
            'Desc': 'Studies computer design at the gate level. Discusses instruction set architecture design, arithmetic and logic unit design, control logic, memory design and caches, simple pipelining,  I/O and peripheral devices. Briefly covers aspects of modern computer architecture, such as multicore processors and cache coherence for these. Degree credit not granted for this course and ECEN 3593.',
            'Pre': "['CSCI 2400', 'ECEN 3350']",
            'Mode': "['person', 'online']",
            'CourseKeywords': "['processors', 'architecture', 'caches', 'cache', 'multicore', 'design']",
            'CourseKeyPhrases': "['modern computer architecture', 'computer architecture', 'studies computer design', 'computer design', 'instruction set architecture', 'computer design gate', 'processors cache coherence', 'memory design caches']",
            'CourseSummary': 'Discusses instruction set architecture design, arithmetic and logic unit design, control logic, memory design and caches, simple pipelining,  I/O and peripheral devices. Studies computer design at the gate level. Briefly covers aspects of modern computer architecture, such as multicore processors and cache coherence for these.',
            'CourseDifficulty': 0.5627833182,
            'CourseDifficultyBand': 'Medium',
            'ConfidenceScore': 59.6626358032
        },
        {
            'CourseId': 'ECEN 3593',
            'CourseName': 'Computer Organization',
            'DepartmentId': 'ECEN',
            'DepartmentName': 'Department of Electrical, Computer, and Energy Engineering',
            'Desc': 'Studies computer design at the gate level. Discusses instruction set architecture design, arithmetic and logic unit design, control logic, memory design and caches, simple pipelining,  I/O and peripheral devices. Briefly covers aspects of modern computer architecture, such as multicore processors and cache coherence for these. Degree Credit not granted for this course and CSCI 4593. Formerly ECEN 4593.',
            'Pre': "['CSCI 2400', 'ECEN 3350']",
            'Mode': "['person']",
            'CourseKeywords': "['processors', 'architecture', 'caches', 'cache', 'multicore', 'design']",
            'CourseKeyPhrases': "['modern computer architecture', 'studies computer design', 'computer architecture', 'computer design', 'instruction set architecture', 'computer design gate', 'processors cache coherence', 'memory design caches']",
            'CourseSummary': 'Discusses instruction set architecture design, arithmetic and logic unit design, control logic, memory design and caches, simple pipelining,  I/O and peripheral devices. Studies computer design at the gate level. Briefly covers aspects of modern computer architecture, such as multicore processors and cache coherence for these.',
            'CourseDifficulty': 0.525347537,
            'CourseDifficultyBand': 'Medium',
            'ConfidenceScore': 55.6724205017
        },
        {
            'CourseId': 'INFO 1101',
            'CourseName': 'Computation in Society',
            'DepartmentId': 'INFO',
            'DepartmentName': 'Information Science Department',
            'Desc': 'Introduces students to modern information and communication technology, the basic principles of software and programming, the fundamental role of algorithms in modern society, computational reasoning, the major organizations in the information sector and fundamental interactions between humans and information technology. Appropriate for students with limited prior experience with computing. Fulfills the CMCI computing requirement.',
            'Pre': '[]',
            'Mode': "['online']",
            'CourseKeywords': "['computing', 'programming', 'cmci', 'computational', 'students', 'algorithms']",
            'CourseKeyPhrases': "['fulfills cmci computing', 'cmci computing', 'cmci computing requirement', 'computing fulfills cmci', 'computing', 'technology appropriate students', 'modern society computational', 'students modern information']",
            'CourseSummary': 'Appropriate for students with limited prior experience with computing. Introduces students to modern information and communication technology, the basic principles of software and programming, the fundamental role of algorithms in modern society, computational reasoning, the major organizations in the information sector and fundamental interactions between humans and information technology. Fulfills the CMCI computing requirement.',
            'CourseDifficulty': 0.7067089755,
            'CourseDifficultyBand': 'Difficult',
            'ConfidenceScore': 54.8743438721
        },
        {
            'CourseId': 'CSCI 5180',
            'CourseName': 'Network Management and Automation',
            'DepartmentId': 'CSCI',
            'DepartmentName': 'Department of Computer Science',
            'Desc': 'Teaching both technical and soft skills, this course incorporates best practices and the key theories behind them such as understanding common services needed for network functionality, maintenance, and troubleshooting. The goal of this course is to equip students with the valuable skills and tools they need to hit the ground running in most network management, operation, automation, and DevOps roles within a company. By the end of the course, students will be competent in the technologies, services, and tools used to manage and automate complex networks. Recommended prerequisite: background in Linux system administration, Python programming and computer network engineering/data communications.',
            'Pre': '[]',
            'Mode': "['person']",
            'CourseKeywords': "['programming', 'devops', 'prerequisite', 'automate', 'automation', 'network']",
            'CourseKeyPhrases': "['skills course', 'computer network engineering', 'network management', 'networks recommended prerequisite', 'soft skills course', 'technical soft skills', 'skills course incorporates', 'teaching technical']",
            'CourseSummary': 'The goal of this course is to equip students with the valuable skills and tools they need to hit the ground running in most network management, operation, automation, and DevOps roles within a company. Teaching both technical and soft skills, this course incorporates best practices and the key theories behind them such as understanding common services needed for network functionality, maintenance, and troubleshooting. By the end of the course, students will be competent in the technologies, services, and tools used to manage and automate complex networks.',
            'CourseDifficulty': 0.6949607132,
            'CourseDifficultyBand': 'Medium',
            'ConfidenceScore': 50.8468856812
        }
    ]"
}
```

****
****