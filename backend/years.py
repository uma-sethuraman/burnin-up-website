from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
#from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
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
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
path = "./datasets"

class Year(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    temp_anomaly = db.Column(db.Float)
    co2 = db.Column(db.Float)
    methane = db.Column(db.Float)
    nitrous_oxide = db.Column(db.Float)
    polar_ice = db.Column(db.Float)
    sea_level = db.Column(db.Float)
    world_population = db.Column(db.BigInteger)

    def __init__(self, year_name=0, temp_anomaly=-1, co2=-1, methane=-1, nitrous_oxide=-1, polar_ice=-1,
                 sea_level=-1, world_population=-1):
        self.year_name = year_name
        self.temp_anomaly = temp_anomaly
        self.co2 = co2
        self.methane = methane
        self.nitrous_oxide = nitrous_oxide
        self.polar_ice = polar_ice
        self.sea_level = sea_level
        self.world_population = world_population

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


class CityTempPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    city = db.Column(db.String())
    country = db.Column(db.String())
    city_temp = db.Column(db.Float)
    lat = db.Column(db.Float)
    long = db.Column(db.Float)

    def __init__(self, year_name=0, country="NaN", city="NaN", city_temp="NaN", lat=0.0, long=0.0):
        self.year_name = year_name
        self.city = city
        self.country = country
        self.city_temp = city_temp
        self.lat = lat
        self.long = long


class City(db.Model):
    city_id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String())
    population = db.Column(db.Integer)
    time_zone = db.Column(db.String())
    elevation = db.Column(db.Integer)
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    pm25 = db.Column(db.Float)
    co2 = db.Column(db.Float)
    so2 = db.Column(db.Float)
    country_iso2code = db.Column(db.String())

db.create_all()

# ### Table for Years ###
# request_url = 'https://global-warming.org/api/temperature-api'
# r = urllib.request.urlopen(request_url)
# data = json.loads(r.read())
# year_dict = dict()
# for item in data["result"]:
#     new_year = Year()
#     new_year.year_name = int(float(item["time"]))
#     new_year.temp_anomaly = float(item["station"])
#     year_dict[int(float(item["time"]))] = new_year
#
# co2_df = pd.read_csv(os.path.join(path, "GlobalCO2.csv"))
# for idx, row in co2_df.iterrows():
#     year_dict[row['Year']].co2 = row['Mean CO2 (ppm)']
#
# methane_df = pd.read_csv(os.path.join(path, "Methane.csv"))
# for idx, row in methane_df.iterrows():
#     year_dict[row['year']].methane = row['Methane']
#
# nitrous_oxide_df = pd.read_csv(os.path.join(path, "NitrousOxide.csv"))
# for idx, row in nitrous_oxide_df.iterrows():
#     year_dict[row['Year']].nitrous_oxide = row['Nitrous Oxide Levels (ppb)']
#
# polar_ice_df = pd.read_csv(os.path.join(path, "PolarIceCapsPerYear.csv"))
# for idx, row in polar_ice_df.iterrows():
#     year_dict[row['Year']].polar_ice = row['Ice Extent (km2)']
#
# sea_level_df = pd.read_csv(os.path.join(path, "SeaLevel.csv"))
# for idx, row in sea_level_df.iterrows():
#     year_dict[row['Year']].sea_level = row['Absolute Sea Level Change Since 1880 (inches)']
#
# world_population_df = pd.read_csv(os.path.join(path, "WorldPopulation.csv"))
# for idx, row in world_population_df.iterrows():
#     year_dict[row['Year']].world_population = row['World Population'].item()

# db.session.add_all(year_dict.values())
# db.session.commit()

# ### Table for Emissions Per Country ###
# co2_per_country = pd.read_csv(os.path.join(path, "AnnualCO2PerCountry.csv"))
# sorted_by_year = co2_per_country.groupby("Year").apply(lambda x: x.nlargest(10, "Per capita CO2 emissions")).reset_index(drop=True)

# # Stores a dictionary of years with the CountryEmissionsPerYear object
# country_years_list = []
# for index, row in sorted_by_year.iterrows():
#     new_year = CountryEmissionsPerYear()
#     new_year.year_name = row['Year']
#     new_year.country = row['Entity']
#     new_year.code = row['Code']
#     new_year.country_co2 = row['Per capita CO2 emissions']
#     country_years_list.append(new_year)

# db.session.add_all(country_years_list)
# db.session.commit()

### Table for Avg City Temps Per Year ###
city_temp_per_year = pd.read_csv(os.path.join(path, "AvgTempCity.csv"))
sorted_by_year = city_temp_per_year.groupby("Year").apply(lambda x: x.nlargest(10, 'AvgTemperature')).reset_index(drop=True)
# Stores a dictionary of years with the CityTempPerYear object
city_years_list = []
for index, row in sorted_by_year.iterrows():
    new_year = CityTempPerYear()
    new_year.year_name = row['Year']
    new_year.city = row['City']
    new_year.country = row['Country']
    new_year.city_temp = row['AvgTemperature']
    city_years_list.append(new_year)

db.session.add_all(city_years_list)
db.session.commit()

cities = db.session.query(CityTempPerYear.city).all()
for city in cities:
        obj = db.session.query(City).filter(City.city_name == city).first()
        fix_city = db.session.query(CityTempPerYear).filter(CityTempPerYear.city == city)
        # Able to find the city we need to fix in city
        if obj is not None:
            fix_city.lat = obj.lat
            fix_city.long = obj.long

db.session.commit()