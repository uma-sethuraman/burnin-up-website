from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
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
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
path = "./datasets"


# Country Model
class Country1(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    capital_city_id = db.Column(db.Integer)
    country_iso2code = db.Column(db.String())
    country_iso3code = db.Column(db.String())
    highest_emission = db.Column(db.Float)
    recent_emissions = db.Column(db.Float)
    country_population = db.Column(db.Integer)
    income_level = db.Column(db.String())
    country_region = db.Column(db.String())
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    cities = db.relationship('City1', backref = 'country1')

# City model
class City1(db.Model):
    city_id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String())
    country_id = db.Column(db.Integer, db.ForeignKey('country1.country_id'))
    population = db.Column(db.Integer)
    o3 = db.Column(db.Float)
    pm10 = db.Column(db.Float)
    pm25 = db.Column(db.Float)
    highest_temp = db.Column(db.Float)
    year_highest = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    def set_basic_data(self, city_name="NaN", population=0, latitude=0.0, longitude=0.0):
        self.city_name = city_name
        self.population = population
        self.latitude = latitude
        self.longitude = longitude

    def set_environ_data(self, o3=0.0, pm10=0.0, pm25=0.0):
        self.o3 = o3
        self.pm10 = pm10
        self.pm25 = pm25

    def set_temp_data(self, highest_temp = 0.0, year_highest = 0):
        self.highest_temp = highest_temp
        self.year_highest = year_highest

# Avg City Temp Per Year Model
class CityTempPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    city = db.Column(db.String())
    city_id = db.Column(db.Integer)
    country = db.Column(db.String())
    city_temp = db.Column(db.Float)
    lat = db.Column(db.Float)
    long = db.Column(db.Float)

# City Year Model
class CityYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String())
    year = db.Column(db.Integer)
    temp = db.Column(db.Float)

db.create_all()

### Table for Cities ###

# get list of cities with years data
city_temps_df = pd.read_csv(os.path.join(path, "AvgTempCity.csv"))
unique_cities_df = city_temps_df[["Country", "City"]].drop_duplicates()
cities_list = unique_cities_df["City"]
countries_list = unique_cities_df["Country"]
indices = cities_list.keys()

# use opendatasoft api to get basic info on city (name, country, lat, long, pop)
print("collecting basic city data")
add_cities = []
count = 0
for i in indices:
    if count == 10:
        break
    city = cities_list[i]
    country = countries_list[i]
    parent_country = db.session.query(Country1).filter(Country1.country_name == country).first()
    if parent_country:
        country_iso2 = parent_country.country_iso2code.lower()
        req = (
            "https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q="
            + city
            + "&sort=population&facet=country"
        )
        response = requests.request("GET", req)
        if response.status_code == 200:
            response = requests.request("GET", req).json()
            if len(response["records"]):
                for record in response["records"]:
                    fields = record["fields"]
                    if fields["country"] == country_iso2:
                        new_city = City1(country1 = parent_country)
                        new_city.set_basic_data(
                            city_name = fields["city"].capitalize(),
                            population = fields["population"],
                            latitude = fields["latitude"],
                            longitude = fields["longitude"],
                        )
                        add_cities += [new_city]
                        count += 1
                        break
print("num cities:", len(add_cities))

# use sketch viet api to get environment data per city
print("collecting city environment data")
add_cities_environ = []
for city in add_cities:
    req = (
        "https://api.waqi.info/feed/geo:"
        + str(city.latitude)
        + ";"
        + str(city.longitude)
        + "/?token=1cbf10be27bc7aa662b54f38d9c0d0a592eba24c"
    )
    response = requests.request("GET", req)
    if response.status_code == 200:
        cities_climate_data = response.json()
        if "data" in cities_climate_data:
            if "forecast" in cities_climate_data["data"]:
                if "daily" in cities_climate_data["data"]["forecast"]:
                    daily = cities_climate_data["data"]["forecast"]["daily"]
                    city.set_environ_data(o3=daily["o3"][0]["avg"], pm10=daily["pm10"][0]["avg"], pm25=daily["pm25"][0]["avg"])
                    add_cities_environ += [city]

print("num cities with environ data:", len(add_cities_environ))

# uses city_temp_per_year table to get highest temp and year of highest temp per city
# UNFINSHED!!!!!!
print("collecting city temp data")
final_cities = []
for city in add_cities_environ:
    country = city.country1.country_name
    ctpy = db.session.query(CityTempPerYear).filter(CityTempPerYear.city == city.city_name and CityTempPerYear.country == country).order_by(CityTempPerYear.city_temp).all()
    if ctpy:
        highest = ctpy[len(ctpy)-1]
        city.set_temp_data(highest.city_temp, highest.year_name)
        final_cities += [city]

# all of the cities with complete attributes should be in add_cities_environ list!!!
print("num cities to commit:", len(final_cities))
# db.session.add_all(add_cities_environ)
# db.session.commit()
