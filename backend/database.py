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

# Create flask app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# Creates initial database and APIManager
db.create_all()
manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

# Create cities, country, and years model
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


request_url = 'http://api.worldbank.org/v2/countries?format=json&&per_page=400'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
country_list = []
for item in data[1]:
    new_country = Country(country_name=item["name"], country_region=item["region"]["value"], country_income=item["incomeLevel"]["value"], capital_city=item['capitalCity'], iso2code=item['iso2Code'], iso3code=item["id"])
    country_list.append(new_country)
db.session.add_all(country_list)
db.session.commit()

# Create climate change api request
class Year(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    temp_anomaly = db.Column(db.Float)
    co2 = db.Column(db.Float)

    def __init__(self, year_name=0, temp_anomaly="NaN", co2="NaN"):
        self.year_name = year_name
        self.temp_anomaly = temp_anomaly
        self.co2 = co2

request_url = 'https://global-warming.org/api/temperature-api'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
# Stores a dictionary of years with the Year object
year_dict = dict()
for item in data["result"]:
    new_year = Year()
    new_year.year_name = int(float(item["time"]))
    new_year.temp_anomaly = float(item["station"])
    year_dict[int(float(item["time"]))] = new_year

request_url = 'https://global-warming.org/api/co2-api'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
for item in data["co2"]:
    year = item["year"]
    year_dict[int(item["year"])].co2 = float(item["cycle"])

db.session.add_all(year_dict.values())
db.session.commit()

# Creates top countries contributing to climate change per year api request
class CountryEmissionsPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    country = db.Column(db.String())
    code = db.Column(db.String())
    country_co2 = db.Column(db.Float)

    def __init__(self, year_name=0, country="NaN", code="NaN", country_co2="NaN"):
        self.year_name = year_name
        self.country = country
        self.code = code
        self.country_co2 = country_co2


# Get data from annual co2 emissions per country
path = "./backend/datasets"
co2_per_country = pd.read_csv(os.path.join(path, "AnnualCO2PerCountry.csv"))
sorted_by_year = co2_per_country.groupby("Year").apply(lambda x: x.nlargest(10, "Per capita CO2 emissions")).reset_index(drop=True)

# Stores a dictionary of years with the CountryEmissionsPerYear object
country_years_list = []
for index, row in sorted_by_year.iterrows():
    new_year = CountryEmissionsPerYear()
    new_year.year_name = row['Year']
    new_year.country = row['Entity']
    new_year.code = row['Code']
    new_year.country_co2 = row['Per capita CO2 emissions']

db.session.add_all(country_years_list)
db.session.commit()
