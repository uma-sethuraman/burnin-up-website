from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
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

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.debug = True
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
path = "./datasets"

class Year1(db.Model):
    # year_id = db.Column(db.Integer)
    year_id = db.Column(db.Integer, primary_key=True)
    temp_anomaly = db.Column(db.Float)
    co2 = db.Column(db.Float)
    methane = db.Column(db.Float)
    nitrous_oxide = db.Column(db.Float)
    polar_ice = db.Column(db.Float)
    sea_level = db.Column(db.Float)
    world_population = db.Column(db.BigInteger)
    countries_emissions = db.relationship('CountryEmissionsPerYear', cascade='all,delete-orphan', single_parent=True, backref=db.backref('year1', lazy='joined'))
    city_temperatures = db.relationship('CityTempPerYear', cascade='all,delete-orphan', single_parent=True, backref=db.backref('year1', lazy='joined'))


# Creates top countries contributing to climate change per year api request
class CountryEmissionsPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    country = db.Column(db.String())
    country_id = db.Column(db.Integer)
    code = db.Column(db.String())
    country_co2 = db.Column(db.Float)
    parent_year_id = db.Column(db.Integer, db.ForeignKey('year1.year_id'))


class CityTempPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    city = db.Column(db.String())
    city_id = db.Column(db.Integer)
    country = db.Column(db.String())
    city_temp = db.Column(db.Float)
    parent_year_id = db.Column(db.Integer, db.ForeignKey('year1.year_id'))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)


class City1(db.Model):
    city_id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String())
    country_id = db.Column(db.Integer, db.ForeignKey('country1.country_id'))
    country = db.relationship('Country1', backref='city1')
    country_iso2 = db.Column(db.String())
    population = db.Column(db.Integer)
    o3 = db.Column(db.Float)
    pm10 = db.Column(db.Float)
    pm25 = db.Column(db.Float)
    highest_temp = db.Column(db.Float)
    year_highest = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

class Country1(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    capital_city_id = db.Column(db.Integer)
    country_iso2code = db.Column(db.String())
    country_iso3code = db.Column(db.String())
    highest_emission = db.Column(db.Float)
    recent_emissions = db.Column(db.Float)
    country_population = db.Column(db.Integer)
    country_capital_city = db.Column(db.String())
    income_level = db.Column(db.String())
    country_region = db.Column(db.String())
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    cities = db.relationship('City1', backref = 'country1')

# db.create_all()

# ### Table for Years ###
# request_url = 'https://global-warming.org/api/temperature-api'
# r = urllib.request.urlopen(request_url)
# data = json.loads(r.read())
# year_dict = dict()
# for item in data["result"]:
#     new_year = Year1()
#     new_year.year_id = int(float(item["time"]))
#     new_year.temp_anomaly = float(item["station"])
#     year_dict[int(float(item["time"]))] = new_year

# co2_df = pd.read_csv(os.path.join(path, "GlobalCO2.csv"))
# for idx, row in co2_df.iterrows():
#     year_dict[row['Year']].co2 = row['Mean CO2 (ppm)']

# methane_df = pd.read_csv(os.path.join(path, "Methane.csv"))
# for idx, row in methane_df.iterrows():
#     year_dict[row['year']].methane = row['Methane']

# nitrous_oxide_df = pd.read_csv(os.path.join(path, "NitrousOxide.csv"))
# for idx, row in nitrous_oxide_df.iterrows():
#     year_dict[row['Year']].nitrous_oxide = row['Nitrous Oxide Levels (ppb)']

# polar_ice_df = pd.read_csv(os.path.join(path, "PolarIceCapsPerYear.csv"))
# for idx, row in polar_ice_df.iterrows():
#     year_dict[row['Year']].polar_ice = row['Ice Extent (km2)']

# sea_level_df = pd.read_csv(os.path.join(path, "SeaLevel.csv"))
# for idx, row in sea_level_df.iterrows():
#     year_dict[row['Year']].sea_level = row['Absolute Sea Level Change Since 1880 (inches)']

# world_population_df = pd.read_csv(os.path.join(path, "WorldPopulation.csv"))
# for idx, row in world_population_df.iterrows():
#     year_dict[row['Year']].world_population = row['World Population'].item()

# db.session.add_all(year_dict.values())
# db.session.commit()

### Table for Emissions Per Country ###
# co2_per_country = pd.read_csv(os.path.join(path, "AnnualCO2PerCountry.csv"))
# sorted_by_year = co2_per_country.groupby("Year").apply(lambda x: x.nlargest(10, "Per capita CO2 emissions")).reset_index(drop=True)

# # Stores a dictionary of years with the CountryEmissionsPerYear object
# country_years_list = []
# for index, row in sorted_by_year.iterrows():
#     parent_year = db.session.query(Year1).filter(Year1.year_id == row['Year']).first()
#     new_year = CountryEmissionsPerYear(year1=parent_year)
#     new_year.year_name = row['Year']
#     new_year.country = row['Entity']
#     if db.session.query(Country1).filter(Country1.country_name==row['Entity']).first():
#         new_year.country_id = db.session.query(Country1).filter(Country1.country_name==row['Entity']).first().country_id
#     new_year.code = row['Code']
#     new_year.country_co2 = row['Per capita CO2 emissions']

#     country_years_list.append(new_year)

# db.session.add_all(country_years_list)
# db.session.commit()

# # Table for Avg City Temps Per Year ###
# city_temp_per_year = pd.read_csv(os.path.join(path, "AvgTempCityFix.csv"))
# sorted_by_year = city_temp_per_year.groupby("Year").apply(lambda x: x.nlargest(10, 'AvgTemperature')).reset_index(drop=True)
# # Stores a dictionary of years with the CityTempPerYear object
# city_years_list = []
# for index, row in sorted_by_year.iterrows():
#     parent_year = db.session.query(Year1).filter(Year1.year_id == row['Year']).first()
#     new_year = CityTempPerYear(year1=parent_year)
#     new_year.year_name = row['Year']
#     new_year.city = row['City']
#     if db.session.query(City1).filter(City1.city_name==row['City']).first():
#         query_city = db.session.query(City1).filter(City1.city_name==row['City']).first()
#         new_year.city_id = query_city.city_id
#         new_year.latitude = query_city.latitude
#         new_year.longitude = query_city.longitude
#     new_year.country = row['Country']
#     new_year.city_temp = row['AvgTemperature']
#     city_years_list.append(new_year)

# db.session.add_all(city_years_list)
# db.session.commit()

# Leftovers for 2019-2020
country_emissions = [
    {
      "code": "QAT", 
      "country": "Qatar", 
      "country_co2": 39.7660351967, 
      "country_id": 144, 
      "parent_year_id": 2019, 
      "year_id": 1391, 
      "year_name": "2019"
    }, 
    {
      "code": "CUW", 
      "country": "Curacao", 
      "country_co2": 35.432223739, 
      "country_id": 200, 
      "parent_year_id": 2019, 
      "year_id": 1392, 
      "year_name": "2019"
    }, 
    {
      "code": "TTO", 
      "country": "Trinidad and Tobago", 
      "country_co2":33.0780208426, 
      "country_id": 172, 
      "parent_year_id": 2019, 
      "year_id": 1393, 
      "year_name": "2019"
    }, 
    {
      "code": "KWT", 
      "country": "Kuwait", 
      "country_co2":25.5031201184, 
      "country_id": 91, 
      "parent_year_id": 2019, 
      "year_id": 1394, 
      "year_name": "2019"
    }, 
    {
      "code": "ARE", 
      "country": "United Arab Emirates", 
      "country_co2": 23.147475128,
      "country_id": 6, 
      "parent_year_id": 2019, 
      "year_id": 1395, 
      "year_name": "2019"
    }, 
    {
      "code": "NCL", 
      "country": "New Caledonia", 
      "country_co2":22.3585823475, 
      "country_id": 124, 
      "parent_year_id": 2019, 
      "year_id": 1396, 
      "year_name": "2019"
    }, 
    {
      "code": "BHR", 
      "country": "Bahrain", 
      "country_co2":21.594881405, 
      "country_id": 19, 
      "parent_year_id": 2019, 
      "year_id": 1397, 
      "year_name": "2019"
    }, 
    {
      "code": "BRN", 
      "country": "Brunei", 
      "country_co2":20.2831995664, 
      "country_id": 203, 
      "parent_year_id": 2019, 
      "year_id": 1398, 
      "year_name": "2019"
    }, 
    {
      "code": "SXM", 
      "country": "Sint Maarten (Dutch part)", 
      "country_co2":20.2352446764, 
      "country_id": 202, 
      "parent_year_id": 2019, 
      "year_id": 1399, 
      "year_name": "2019"
    }, 
    {
      "code": "SAU", 
      "country": "Saudi Arabia", 
      "country_co2":20.2341245281, 
      "country_id": 147, 
      "parent_year_id": 2019, 
      "year_id": 1400, 
      "year_name": "2019"
    },
    {
      "code": "QAT", 
      "country": "Qatar", 
      "country_co2":41.5655374797, 
      "country_id": 144, 
      "parent_year_id": 2020, 
      "year_id": 1401, 
      "year_name": "2020"
    }, 
    {
      "code": "CUW", 
      "country": "Curacao", 
      "country_co2":37.231726022, 
      "country_id": 200, 
      "parent_year_id": 2020, 
      "year_id": 1402, 
      "year_name": "2020"
    }, 
    {
      "code": "TTO", 
      "country": "Trinidad and Tobago", 
      "country_co2":34.8775231256, 
      "country_id": 172, 
      "parent_year_id": 2020, 
      "year_id": 1403, 
      "year_name": "2020"
    }, 
    {
      "code": "KWT", 
      "country": "Kuwait", 
      "country_co2":27.3026224014, 
      "country_id": 91, 
      "parent_year_id": 2020, 
      "year_id": 1404, 
      "year_name": "2020"
    }, 
    {
      "code": "ARE", 
      "country": "United Arab Emirates", 
      "country_co2": 24.946977411,
      "country_id": 6, 
      "parent_year_id": 2020, 
      "year_id": 1405, 
      "year_name": "2020"
    }, 
    {
      "code": "NCL", 
      "country": "New Caledonia", 
      "country_co2":24.1580846305, 
      "country_id": 124, 
      "parent_year_id": 2020, 
      "year_id": 1406, 
      "year_name": "2020"
    }, 
    {
      "code": "BHR", 
      "country": "Bahrain", 
      "country_co2":23.394383688, 
      "country_id": 19, 
      "parent_year_id": 2020, 
      "year_id": 1407, 
      "year_name": "2020"
    }, 
    {
      "code": "BRN", 
      "country": "Brunei", 
      "country_co2":22.0827018494, 
      "country_id": 203, 
      "parent_year_id": 2020, 
      "year_id": 1408, 
      "year_name": "2020"
    }, 
    {
      "code": "SXM", 
      "country": "Sint Maarten (Dutch part)", 
      "country_co2":22.0347469595, 
      "country_id": 202, 
      "parent_year_id": 2020, 
      "year_id": 1409, 
      "year_name": "2020"
    }, 
    {
      "code": "SAU", 
      "country": "Saudi Arabia", 
      "country_co2":22.0336268111, 
      "country_id": 147, 
      "parent_year_id": 2020, 
      "year_id": 1410, 
      "year_name": "2020"
    }
  ]


country_years_list = []
for d in country_emissions:
    parent_year = db.session.query(Year1).filter(Year1.year_id == d["year_name"]).first()
    new_year = CountryEmissionsPerYear(year1=parent_year)
    new_year.year_name = d["year_name"]
    new_year.country = d["country"]
    if db.session.query(Country1).filter(Country1.country_name==d['country']).first():
        new_year.country_id = db.session.query(Country1).filter(Country1.country_name==d['country']).first().country_id
    new_year.code = d['code']
    new_year.country_co2 = d['country_co2']

    country_years_list.append(new_year)

db.session.add_all(country_years_list)
db.session.commit()

city_temps = [

]

city_years_list = []
for d in city_temps:
    parent_year = db.session.query(Year1).filter(Year1.year_id == d["year_name"]).first()
    new_year = CityTempPerYear(year1=parent_year)
    new_year.year_name = d["year_name"]
    new_year.city = d["city"]
    if db.session.query(City1).filter(City1.city_name==row['City']).first():
        query_city = db.session.query(City1).filter(City1.city_name==row['City']).first()
        new_year.city_id = query_city.city_id
        new_year.latitude = query_city.latitude
        new_year.longitude = query_city.longitude
    new_year.country = row['Country']
    new_year.city_temp = row['AvgTemperature']
    city_years_list.append(new_year)

db.session.add_all(city_years_list)
db.session.commit()
