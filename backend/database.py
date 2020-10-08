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

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))


app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Country(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    country_region = db.Column(db.String())
    country_income = db.Column(db.String())

    def __init__(self, country_name, country_region, country_income):
        self.country_name = country_name
        self.country_region = country_region
        self.country_income = country_income


class Year(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    temp_anomaly = db.Column(db.Float)
    co2 = db.Column(db.Float)

    def __init__(self, year_name=0, temp_anomaly="NaN", co2="NaN"):
        self.year_name = year_name
        self.temp_anomaly = temp_anomaly
        self.co2 = co2

db.create_all()

manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)


# Create country api request
manager.create_api(Country, methods=['GET'])

class CountrySchema(ma.Schema):
    class Meta:
        fields = ('country_id', 'country_name', 'country_region', 'country_income')

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

request_url = 'http://api.worldbank.org/v2/country?format=json'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
country_list = []
for item in data[1]:
    new_country = Country(country_name=item["name"], country_region=item["region"]["value"], country_income=item["incomeLevel"]["value"])
    country_list.append(new_country)
db.session.add_all(country_list)
db.session.commit()


# Create climate change api request
manager.create_api(Year, methods=['GET'], results_per_page=0)

class YearSchema(ma.Schema):
    class Meta:
        fields = ('year_id', 'year_name', 'temperature_anomaly', 'carbon_dioxide_level')

year_schema = YearSchema()
years_schema = YearSchema(many=True)

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