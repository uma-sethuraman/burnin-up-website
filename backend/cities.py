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
# import pandas as pd
# import numpy as np
import requests
from time import sleep

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.debug = True
app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
path = "./datasets"


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
    co2 = db.Column(db.Float)
    so2 = db.Column(db.Float)
    country_iso2code = db.Column(db.String())

    def __init__(self, city_name="NaN", population=0, time_zone="NaN", elevation=0, lat=0.0, long=0.0, pm25=0.0,
                 co2=0.0, so2=0.0, country_iso2code="NaN"):
        self.city_name = city_name
        self.population = population
        self.time_zone = time_zone
        self.elevation = elevation
        self.lat = lat
        self.long = long
        self.pm25 = pm25
        self.co2 = co2
        self.so2 = so2
        self.country_iso2code = country_iso2code


db.create_all()

### Table for Cities ###
# get list of countries
url = "https://countries-cities.p.rapidapi.com/location/country/list"

querystring = {"format": "json"}

headers = {
    'x-rapidapi-host': "countries-cities.p.rapidapi.com",
    'x-rapidapi-key': "7340c68080msh75d1462395c3f6cp12f439jsnebb929c1f188"
}

response = requests.request("GET", url, headers=headers, params=querystring)
data = response.json()
countries_list = [item for item in data["countries"]]

# TODO: get city info from each country in countries_list


# request_url = "https://api.climacell.co/v3/weather/historical/climacell?lat=48.8566&lon=2.3522&unit_system=si&start_time=2020-10-13T14%3A09%3A50Z&end_time=now&fields=pollen_tree,pollen_grass,pollen_weed,fire_index,no2,o3,co,so2,epa_aqi,epa_health_concern,pm25"

# my_headers = {
#     'apikey': 'HZhAxtPoFuqDNCrrR1mE5Np7i9FAj92O'
# }
# response = requests.request("GET", request_url, headers=my_headers)
# data = response.json()
# cities_list = []
# for item in data:
#     new_city = City(lat=item['lat'], long=item['lon'], pm25=item['pm25']['value'],co2=item['co']['value'], so2=item['so2']['value'])
#     cities_list.append(new_city)
# db.session.add_all(cities_list)
# db.session.commit()


# city_headers = {
#     'x-rapidapi-key': '7340c68080msh75d1462395c3f6cp12f439jsnebb929c1f188'
# }

# count = 0
# city_list = []
# p = iter(country_list)
# while True:
#     x = next(p)
#     if(x.country_iso2code == 'PS'):
#         break
# next(p)

# for item in p:
#     if(count > 80):
#         break
#     str = item.country_iso2code
#     request_url = "https://countries-cities.p.rapidapi.com/location/country/" + str + "/city/list"
#     response = requests.request("GET", request_url, headers=city_headers)
#     print(response.json())
#     sleep(1)
#     if response.status_code == 200:
#         count += 1
#         cities_data = response.json()
#         for each_city in cities_data["cities"]:
#             new_city = City(lat = each_city['latitude'], long=each_city['longitude'], city_name=each_city['name'], population=each_city['population'], country_iso2code=str)
#             city_list += [new_city]


# db.session.add_all(city_list)
# db.session.commit()



city_table = City.query.all()
cp = db.session.query(Country.country_capital_city).all()
for each_country_capital in cp:
    if each_country_capital is not None:
        obj = db.session.query(City).filter(City.city_name == each_country_capital).first()
        if obj is not None:
            str_lat = str(obj.lat)
            str_long = str(obj.long)
            request_city_climate = "https://api.waqi.info/feed/geo:" + str_lat + ";" + str_long + "/?token=1cbf10be27bc7aa662b54f38d9c0d0a592eba24c"
            response = requests.request("GET", request_city_climate)
            if (response.status_code == 200):
                cities_climate_data = response.json()
                if len(cities_climate_data["data"]["forecast"]) == 0:
                    pass
                else:
                    obj.pm25 = cities_climate_data["data"]["forecast"]["daily"]["pm25"][0]["avg"]
                    obj.co2 = cities_climate_data["data"]["forecast"]["daily"]["pm10"][0]["avg"]
                    obj.so2 = cities_climate_data["data"]["forecast"]["daily"]["o3"][0]["avg"]

db.session.commit()