from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import Column, String, Integer
from flask import request
import urllib
import os
import json
from sqlalchemy import create_engine
import flask_restless
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

# City model
class City(db.Model):
    city_id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String())
    population = db.Column(db.Integer)
    time_zone = db.Column(db.String())
    elevation = db.Column(db.Integer)
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    pm25 = db.Column(db.Float)
    pm10 = db.Column(db.Float)
    o3 = db.Column(db.Float)
    country_iso2code = db.Column(db.String())
    co = db.Column(db.Float)

    def __init__(
        self,
        city_name="NaN",
        population=0,
        time_zone="NaN",
        elevation=0,
        lat=0.0,
        long=0.0,
        pm25=-1.0,
        pm10=-1.0,
        o3=-1.0,
        country_iso2code="NaN",
        co=-1.0,
    ):
        self.city_name = city_name
        self.population = population
        self.time_zone = time_zone
        self.elevation = elevation
        self.lat = lat
        self.long = long
        self.pm25 = pm25
        self.pm10 = pm10
        self.o3 = o3
        self.country_iso2code = country_iso2code
        self.co = co

    def setpm25(self, v):
        self.pm25 = v

    def setpm10(self, v):
        self.pm10 = v

    def seto3(self, v):
        self.o3 = v

    def setco(self, v):
        self.co = v


# Avg City Temp Per Year Model
class CityTempPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    city = db.Column(db.String())
    country = db.Column(db.String())
    city_temp = db.Column(db.Float)
    lat = db.Column(db.Float)
    long = db.Column(db.Float)


# Country Model
class Country(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    country_region = db.Column(db.String())
    country_income = db.Column(db.String())
    country_capital_city = db.Column(db.String())
    country_iso2code = db.Column(db.String())
    country_iso3code = db.Column(db.String())
    country_lat = db.Column(db.String())
    country_long = db.Column(db.String())
    recent_emissions_year = db.Column(db.Integer)
    recent_emissions = db.Column(db.Float)


city_table = City.query.all()
city_temp_table = {item.city for item in CityTempPerYear.query.all()}
print("total city_temp_table: ", len(city_temp_table))
added_cities = []
for city in city_temp_table:
    exist_temp = db.session.query(
        db.session.query(City).filter_by(city_name=city).exists()
    ).scalar()
    if not exist_temp:
        combined = city.split()
        if len(combined) > 1:
            if combined[0] == "Bombay" or combined[0] == "Chennai":
                city = combined[0]
            else:
                city = combined[0] + "+" + combined[1]
        added_cities += [city]

print("added_cities after missing city_temp_table: ", len(added_cities))

country_capitals = {
    item for item in db.session.query(Country.country_capital_city).all()
}
for city in country_capitals:
    city = city[0]
    exist_temp = db.session.query(
        db.session.query(City).filter_by(city_name=city).exists()
    ).scalar()
    if not exist_temp:
        combined = city.split()
        if len(combined) > 1:
            if combined[0] == "Washington":
                city = combined[0] + "+" + "DC"
            else:
                city = combined[0] + "+" + combined[1]
        added_cities += [city]

print("added_cities after missing city_temp_table + capitals: ", len(added_cities))

new_add = []
for city in added_cities:
    req = (
        "https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q="
        + city
        + "&sort=population&facet=country"
    )
    response = requests.request("GET", req)
    if response.status_code == 200:
        response = requests.request("GET", req).json()
        if len(response["records"]):
            record = response["records"][0]["fields"]
            pop = 0
            if "population" in record:
                pop = record["population"]
            new_city = City(
                lat=record["latitude"],
                long=record["longitude"],
                city_name=record["city"].capitalize(),
                population=pop,
                country_iso2code=record["country"].upper(),
            )
            new_add += [new_city]

print("num new_add: ", len(new_add))

for city in new_add:
    req = (
        "https://api.waqi.info/feed/geo:"
        + str(city.lat)
        + ";"
        + str(city.long)
        + "/?token=1cbf10be27bc7aa662b54f38d9c0d0a592eba24c"
    )
    response = requests.request("GET", req)
    if response.status_code == 200:
        cities_climate_data = response.json()
        if "data" in cities_climate_data:
            if "forecast" in cities_climate_data["data"]:
                if "iaqi" in cities_climate_data["data"]:
                    if "co" in cities_climate_data["data"]["iaqi"]:
                        city.setco(cities_climate_data["data"]["iaqi"]["co"]["v"])
                if "daily" in cities_climate_data["data"]["forecast"]:
                    city.setpm25(
                        cities_climate_data["data"]["forecast"]["daily"]["pm25"][0][
                            "avg"
                        ]
                    )
                    city.setpm10(
                        cities_climate_data["data"]["forecast"]["daily"]["pm10"][0][
                            "avg"
                        ]
                    )
                    city.seto3(
                        cities_climate_data["data"]["forecast"]["daily"]["o3"][0]["avg"]
                    )

print("confirm num new_add: ", len(new_add))

db.session.add_all(new_add)
db.session.commit()
