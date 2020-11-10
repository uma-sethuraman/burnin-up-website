from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import Column, String, Integer, BigInteger
from flask import request
import urllib
import os
import json
from sqlalchemy import create_engine
import flask_restless
import pandas as pd
import numpy as np
import requests
from time import sleep
import matplotlib.pyplot as plt

basedir = os.path.abspath(os.path.dirname(__file__))

path = "./datasets"

### Table for Years ###
request_url = 'https://burninup.me/api/years'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
year = []
co2 = []
for item in data["years"]:
    year.append(item["year_id"])
    co2.append(item["co2"])

plt.scatter(year, co2)
plt.show()

years_viz_df = pd.DataFrame({'Year': year, 'Mean Carbon Dioxide Level (ppm)': co2})
years_viz_df.to_csv("Carbon Emissions 1880-2020.csv", index=False)

