from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
#from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from sqlalchemy import Column, String, Integer
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


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
path = "./datasets"

# Create tables
class Country(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    country_region = db.Column(db.String())
    country_income = db.Column(db.String())
    country_capital_city = db.Column(db.String())
    country_iso2code = db.Column(db.String())
    country_iso3code = db.Column(db.String())

    def __init__(self, country_name="NaN", country_region="NaN", country_income="NaN", capital_city="NaN", iso2code="NaN", iso3code = "NaN"):
        self.country_name = country_name
        self.country_region = country_region
        self.country_income = country_income
        self.country_capital_city = capital_city
        self.country_iso2code = iso2code
        self.country_iso3code = iso3code


db.create_all()

### Table for Country ###
request_url = 'http://api.worldbank.org/v2/countries?format=json&&per_page=400'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
country_list = []
for item in data[1]:
    new_country = Country(country_name=item["name"], country_region=item["region"]["value"], country_income=item["incomeLevel"]["value"], capital_city=item['capitalCity'], iso2code=item['iso2Code'], iso3code=item["id"])
    country_list.append(new_country)
db.session.add_all(country_list)
db.session.commit()


