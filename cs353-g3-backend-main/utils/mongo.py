# -*- coding: utf-8 -*-
import os

from pymongo import MongoClient

client = MongoClient(f"mongodb://{os.environ.get('MONGO_USER')}:{os.environ.get('MONGO_PASSWORD')}@{os.environ.get('MONGO_HOST')}:{os.environ.get('MONGO_PORT')}")
database = client['test']
