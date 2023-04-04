#################################################################
#   StudyBuff Module - Central Imports
#   @version    :   1.0
#   @date       :   03/20/2023
#   @author     :   Pranjal Pathak
#   @python     :   3.8.0
#################################################################

# Imports
# Standard libs
import os
import sys
import warnings
import yaml
import re
import io
import inspect
import shutil
import random
import ast
import string
import time
import pickle
import glob
import traceback
import multiprocessing
from ast import literal_eval
import math
import pytz
from itertools import chain
from string import Template
from datetime import datetime, timedelta
from dateutil import parser
from collections import defaultdict, Counter, OrderedDict
from contextlib import contextmanager
import unicodedata
from functools import reduce
import itertools
import tempfile
from typing import Any, Dict, List, Callable, Optional, Tuple, NamedTuple, Union
from functools import wraps
import uuid
import re
from fileinput import filename
import ntpath
import logging

# web
import json
import requests
import base64
from io import StringIO, BytesIO
from flask import Flask, jsonify, request, abort, Response
import http.client, urllib.request, urllib.parse, urllib.error, base64

# Required pkgs
import numpy as np
from numpy import array, argmax
import pandas as pd
import ntpath
import tqdm

# General text correction - fit text for you (ftfy) and others
import ftfy
from fuzzywuzzy import fuzz
from spellchecker import SpellChecker

# scikit-learn
from sklearn.utils import shuffle
from sklearn import preprocessing
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

# scipy
from scipy import spatial, sparse

# NLTK
import nltk
from nltk import FreqDist, tokenize, sent_tokenize, word_tokenize, pos_tag
from nltk.corpus import stopwords, PlaintextCorpusReader
from nltk.tokenize import RegexpTokenizer
from nltk.stem import WordNetLemmatizer
from nltk.stem.lancaster import LancasterStemmer
from nltk.stem.porter import *
from nltk.translate.bleu_score import sentence_bleu

# # Spacy
# import spacy
# from spacy import displacy
# from spacy.matcher import PhraseMatcher, Matcher
# from spacy.util import minibatch, compounding
# from spacy.training.example import Example
# print("Spacy loaded.")
#
# # Pytorch
# import torch
# from torch import optim, nn
# import torch.nn.functional as Functional
# from torch.utils.data import Dataset, DataLoader
# import transformers
# from transformers import AutoTokenizer
# from transformers import AutoModelWithLMHead
# from transformers import pipeline
# from transformers import AutoModel
# print("PyTorch loaded.")

#EOF