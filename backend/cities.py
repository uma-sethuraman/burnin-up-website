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

# For removing the accents from city and country names
# import unidecode

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
    country_capital_city = db.Column(db.String())
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
    country_iso2 = db.Column(db.String())
    population = db.Column(db.Integer)
    o3 = db.Column(db.Float)
    pm10 = db.Column(db.Float)
    pm25 = db.Column(db.Float)
    highest_temp = db.Column(db.Float)
    year_highest = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    def set_basic_data(self, city_name="NaN", population=0, latitude=0.0, longitude=0.0, country_iso2="NaN"):
        self.city_name = city_name
        self.population = population
        self.latitude = latitude
        self.longitude = longitude
        self.country_iso2 = country_iso2

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

# db.create_all()

### Table for Cities ###
# get list of cities with years data
city_temps_df = pd.read_csv(os.path.join(path, "AvgTempCityFix.csv"))
unique_cities_df = city_temps_df[["Country", "City"]].drop_duplicates()
cities_list = unique_cities_df["City"]
countries_list = unique_cities_df["Country"]
indices = cities_list.keys()

cities = [
    "Malabo",
    "Saint George's",
    "Nuuk",
    "Phnom Penh",
    "Tarawa",
    "Kuwait City",
    "Vaduz",
    "Luxembourg",
    "Male",
    "Mexico City",
    "Majuro",
    "Valletta",
    "Naypyidaw",
    "Kuala Lumpur",
    "Noum'ea",
    "Niamey",
    "Kathmandu",
    "Yaren District",
    "Koror",
    "Papeete",
    "Oranjestad",
    "Buenos Aires",
    "Saint John's",
    "Porto-Novo",
    "Tirane",
    "Andorra la Vella",
    "Sao Tome",
    "Grand Turk",
    "N'Djamena",
    "Lome",
    "Ashgabat",
    "Nuku'alofa",
    "Port-of-Spain",
    "Funafuti",
    "Road Town",
    "Port-Vila",
    "Torshavn",
    "Saint John's",
    "Oranjestad",
    "Roseau",
    "Honiara"
]

# "Pago Pago",
# "Apia",

country_city = {}
for city in cities:
    countries = db.session.query(Country1).filter(Country1.country_capital_city == city).all()
    for country in countries:
        if country.country_name not in country_city:
            country_city[country.country_name] = city
            break

for i in country_city:
    city = db.session.query(City1).filter(City1.city_name == country_city[i].capitalize()).first()
    if not city:
        print("missing", country_city[i])

# print(country_city)
# print(len(country_city))
# print(len(cities))

# print("collecting missing city data")
# count = 0
# add_cities = []
# for i in country_city:
#     city = country_city[i]
#     print("evaluating", city)
#     country = i
#     parent_country = db.session.query(Country1).filter(Country1.country_name == country).first()
#     name = city.capitalize()
#     pop = -1
#     lat = -1.0
#     long = -1.0
#     temp = -1.0
#     year = -1.0
#     o3 = -1.0
#     pm10 = -1.0
#     pm25 = -1.0
#     if parent_country:

#         # use opendatasoft api to get basic info on city (name, country, lat, long, pop)
#         country_iso2 = parent_country.country_iso2code.lower()
#         req = (
#             "https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q="
#             + city
#             + "&sort=population&facet=country"
#         )
#         response = requests.request("GET", req)
#         if response.status_code == 200:
#             # print("response from opendatasoft")
#             response = requests.request("GET", req).json()
#             if len(response["records"]):
#                 # print("records present")
#                 for record in response["records"]:
#                     fields = record["fields"]
#                     # print(country_iso2, fields["country"])
#                     if fields["country"] == country_iso2:
#                         # print("found country")
#                         if "latitude" in fields:
#                             lat = fields["latitude"]
#                         if "longitude" in fields:
#                             long = fields["longitude"]
#                         if "population" in fields:
#                             pop = fields["population"]
                        
#         # get temperature data from csv
#         if city in cities_list and country in countries_list:
#             temp1 = float(city_temps_df.loc[(city_temps_df["City"] == city) & (city_temps_df["Country"] == country)]["AvgTemperature"].max())
#             max_temp_idx = city_temps_df.loc[(city_temps_df["City"] == city) & (city_temps_df["Country"] == country)]["AvgTemperature"].idxmax()
#             year1 = int(city_temps_df.iloc[max_temp_idx]["Year"])
#             temp = temp1
#             year = year1
#             # print("got basic and temp data")

#         # get environ data from sketch api
#         if lat and long:
#             req = (
#                 "https://api.waqi.info/feed/geo:"
#                 + str(lat)
#                 + ";"
#                 + str(long)
#                 + "/?token=1cbf10be27bc7aa662b54f38d9c0d0a592eba24c"
#             )
#             response = requests.request("GET", req)
#             if response.status_code == 200:
#                 # print(lat, long)
#                 cities_climate_data = response.json()
#                 if "data" in cities_climate_data:
#                     if "forecast" in cities_climate_data["data"]:
#                         if "daily" in cities_climate_data["data"]["forecast"]:
#                             daily = cities_climate_data["data"]["forecast"]["daily"]
#                             # print("got environment data")
#                             o3=daily["o3"][0]["avg"]
#                             pm10=daily["pm10"][0]["avg"]
#                             pm25=daily["pm25"][0]["avg"]
#         new_city = City1(country1 = parent_country)
#         new_city.set_basic_data(
#             city_name = name,
#             population = pop,
#             latitude = lat,
#             longitude = long,
#             country_iso2=parent_country.country_iso2code
#         )
#         new_city.set_temp_data(highest_temp=temp, year_highest=year)
#         new_city.set_environ_data(o3=o3, pm10=pm10, pm25=pm25)
#         add_cities += [new_city]
#         print("added", new_city.city_name)

# leftover = {
#     "Pago Pago" : "Samoa",
#     "Apia" : "Samoa"
# }

# for i in leftover:
#     city = i
#     print("evaluating", city)
#     country = leftover[i]
#     parent_country = db.session.query(Country1).filter(Country1.country_name == country).filter(Country1.country_capital_city == city).first()
#     name = city.capitalize()
#     pop = -1
#     lat = -1.0
#     long = -1.0
#     temp = -1.0
#     year = -1.0
#     o3 = -1.0
#     pm10 = -1.0
#     pm25 = -1.0
#     if parent_country:

#         # use opendatasoft api to get basic info on city (name, country, lat, long, pop)
#         country_iso2 = parent_country.country_iso2code.lower()
#         req = (
#             "https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q="
#             + city
#             + "&sort=population&facet=country"
#         )
#         response = requests.request("GET", req)
#         if response.status_code == 200:
#             # print("response from opendatasoft")
#             response = requests.request("GET", req).json()
#             if len(response["records"]):
#                 # print("records present")
#                 for record in response["records"]:
#                     fields = record["fields"]
#                     # print(country_iso2, fields["country"])
#                     if fields["country"] == country_iso2:
#                         # print("found country")
#                         if "latitude" in fields:
#                             lat = fields["latitude"]
#                         if "longitude" in fields:
#                             long = fields["longitude"]
#                         if "population" in fields:
#                             pop = fields["population"]
                        
#         # get temperature data from csv
#         if city in cities_list and country in countries_list:
#             temp1 = float(city_temps_df.loc[(city_temps_df["City"] == city) & (city_temps_df["Country"] == country)]["AvgTemperature"].max())
#             max_temp_idx = city_temps_df.loc[(city_temps_df["City"] == city) & (city_temps_df["Country"] == country)]["AvgTemperature"].idxmax()
#             year1 = int(city_temps_df.iloc[max_temp_idx]["Year"])
#             temp = temp1
#             year = year1
#             # print("got basic and temp data")

#         # get environ data from sketch api
#         if lat and long:
#             req = (
#                 "https://api.waqi.info/feed/geo:"
#                 + str(lat)
#                 + ";"
#                 + str(long)
#                 + "/?token=1cbf10be27bc7aa662b54f38d9c0d0a592eba24c"
#             )
#             response = requests.request("GET", req)
#             if response.status_code == 200:
#                 # print(lat, long)
#                 cities_climate_data = response.json()
#                 if "data" in cities_climate_data:
#                     if "forecast" in cities_climate_data["data"]:
#                         if "daily" in cities_climate_data["data"]["forecast"]:
#                             daily = cities_climate_data["data"]["forecast"]["daily"]
#                             # print("got environment data")
#                             o3=daily["o3"][0]["avg"]
#                             pm10=daily["pm10"][0]["avg"]
#                             pm25=daily["pm25"][0]["avg"]
#         new_city = City1(country1 = parent_country)
#         new_city.set_basic_data(
#             city_name = name,
#             population = pop,
#             latitude = lat,
#             longitude = long,
#             country_iso2=parent_country.country_iso2code
#         )
#         new_city.set_temp_data(highest_temp=temp, year_highest=year)
#         new_city.set_environ_data(o3=o3, pm10=pm10, pm25=pm25)
#         add_cities += [new_city]
#         print("added", new_city.city_name)

# for city in add_cities:
#     print(city.city_name, city.country1, city.country_iso2, city.population, city.o3, city.pm10, city.pm25, city.highest_temp, city.year_highest, city.latitude, city.longitude)


######## original script!!! ########
# for i in indices:
# for i in missing:
#     city = i
#     print("evaluating", city)
#     country = missing[i]
#     if country == "Cote D'Ivoire":
#         parent_country = db.session.query(Country1).filter(Country1.country_name == "Cote d'Ivoire").first()
#     else:
#         parent_country = db.session.query(Country1).filter(Country1.country_name == country).first()
#     name = ""
#     pop = 0
#     lat = 0.0
#     long = 0.0
#     temp = 0.0
#     year = 0
#     o3 = 0.0
#     pm10 = 0.0
#     pm25 = 0.0
#     if parent_country:
#         # print(parent_country.country_name)
#         country_iso2 = parent_country.country_iso2code.lower()
#         if city == "Washington D.C.":
#             req = (
#                 "https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q=Washington+DC&sort=population&facet=country"
#             )
#         else:
#             req = (
#                 "https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q="
#                 + city
#                 + "&sort=population&facet=country"
#             )
#         response = requests.request("GET", req)
#         if response.status_code == 200:
#             # print("response from opendatasoft")
#             response = requests.request("GET", req).json()
#             if len(response["records"]):
#                 # print("records present")
#                 for record in response["records"]:
#                     fields = record["fields"]
#                     # print(country_iso2, fields["country"])
#                     if fields["country"] == country_iso2:
#                         # print("found country")
#                         if "city" not in fields or "latitude" not in fields or "longitude" not in fields:
#                             # print("missing field")
#                             break
#                         name = city.capitalize()
#                         if "population" in fields:
#                             pop = fields["population"]
#                         else:
#                             pop = populations[city]
#                         lat = fields["latitude"]
#                         long = fields["longitude"]

#                         if city == "Djibouti":
#                             temp1 = float(city_temps_df.loc[(city_temps_df["City"] == 'Jibuti') & (city_temps_df["Country"] == country)]["AvgTemperature"].max())
#                             max_temp_idx = city_temps_df.loc[(city_temps_df["City"] == 'Jibuti') & (city_temps_df["Country"] == country)]["AvgTemperature"].idxmax()
#                         elif country == "Bosnia and Herzegovina":
#                             temp1 = float(city_temps_df.loc[(city_temps_df["City"] == city) & (city_temps_df["Country"] == "Bosnia And Herzegovina")]["AvgTemperature"].max())
#                             max_temp_idx = city_temps_df.loc[(city_temps_df["City"] == city) & (city_temps_df["Country"] == "Bosnia And Herzegovina")]["AvgTemperature"].idxmax()
#                         elif city == "Washington D.C.":
#                             temp1 = float(city_temps_df.loc[(city_temps_df["City"] == 'Washington') & (city_temps_df["Country"] == country)]["AvgTemperature"].max())
#                             max_temp_idx = city_temps_df.loc[(city_temps_df["City"] == 'Washington') & (city_temps_df["Country"] == country)]["AvgTemperature"].idxmax()
#                         else:
#                             temp1 = float(city_temps_df.loc[(city_temps_df["City"] == city) & (city_temps_df["Country"] == country)]["AvgTemperature"].max())
#                             max_temp_idx = city_temps_df.loc[(city_temps_df["City"] == city) & (city_temps_df["Country"] == country)]["AvgTemperature"].idxmax()
#                         year1 = int(city_temps_df.iloc[max_temp_idx]["Year"])
#                         temp = temp1
#                         year = year1
#                         # print("got basic and temp data")

#                         req = (
#                             "https://api.waqi.info/feed/geo:"
#                             + str(lat)
#                             + ";"
#                             + str(long)
#                             + "/?token=1cbf10be27bc7aa662b54f38d9c0d0a592eba24c"
#                         )
#                         response = requests.request("GET", req)
#                         if response.status_code == 200:
#                             # print(lat, long)
#                             cities_climate_data = response.json()
#                             if "data" in cities_climate_data:
#                                 if "forecast" in cities_climate_data["data"]:
#                                     if "daily" in cities_climate_data["data"]["forecast"]:
#                                         daily = cities_climate_data["data"]["forecast"]["daily"]
#                                         # print("got environment data")
#                                         new_city = City1(country1 = parent_country)
#                                         new_city.set_basic_data(
#                                             city_name = name,
#                                             population = pop,
#                                             latitude = lat,
#                                             longitude = long,
#                                             country_iso2=parent_country.country_iso2code
#                                         )
#                                         new_city.set_temp_data(highest_temp=temp, year_highest=year)
#                                         new_city.set_environ_data(o3=daily["o3"][0]["avg"], pm10=daily["pm10"][0]["avg"], pm25=daily["pm25"][0]["avg"])
#                                         add_cities += [new_city]
#                                         print("added", new_city.city_name)
#                                         break

# print(add_cities)
# print("num cities with all data:", len(add_cities))



# db.session.add_all(add_cities)
# db.session.commit()
