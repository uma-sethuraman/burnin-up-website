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
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    temp_anomaly = db.Column(db.Float)
    co2 = db.Column(db.Float)
    methane = db.Column(db.Float)
    nitrous_oxide = db.Column(db.Float)
    polar_ice = db.Column(db.Float)
    sea_level = db.Column(db.Float)
    world_population = db.Column(db.BigInteger)
    top_10_countries = db.relationship('CountryEmissionsPerYear', cascade='all,delete-orphan', single_parent=True, backref=db.backref('year1', lazy='joined'))


# Creates top countries contributing to climate change per year api request
class CountryEmissionsPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    country = db.Column(db.String())
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
    lat = db.Column(db.Float)
    long = db.Column(db.Float)

    def __init__(
        self,
        year_name=0,
        country="NaN",
        city="NaN",
        city_temp="NaN",
        lat=0.0,
        long=0.0,
        city_id=0,
    ):
        self.year_name = year_name
        self.city = city
        self.country = country
        self.city_temp = city_temp
        self.lat = lat
        self.long = long
        self.city_id = city_id

    def setLatLon(self, lat, lon):
        self.lat = lat
        self.long = lon


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


db.create_all()

### Table for Years ###
request_url = 'https://global-warming.org/api/temperature-api'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
year_dict = dict()
for item in data["result"]:
    new_year = Year1()
    new_year.year_name = int(float(item["time"]))
    new_year.temp_anomaly = float(item["station"])
    year_dict[int(float(item["time"]))] = new_year

co2_df = pd.read_csv(os.path.join(path, "GlobalCO2.csv"))
for idx, row in co2_df.iterrows():
    year_dict[row['Year']].co2 = row['Mean CO2 (ppm)']

methane_df = pd.read_csv(os.path.join(path, "Methane.csv"))
for idx, row in methane_df.iterrows():
    year_dict[row['year']].methane = row['Methane']

nitrous_oxide_df = pd.read_csv(os.path.join(path, "NitrousOxide.csv"))
for idx, row in nitrous_oxide_df.iterrows():
    year_dict[row['Year']].nitrous_oxide = row['Nitrous Oxide Levels (ppb)']

polar_ice_df = pd.read_csv(os.path.join(path, "PolarIceCapsPerYear.csv"))
for idx, row in polar_ice_df.iterrows():
    year_dict[row['Year']].polar_ice = row['Ice Extent (km2)']

sea_level_df = pd.read_csv(os.path.join(path, "SeaLevel.csv"))
for idx, row in sea_level_df.iterrows():
    year_dict[row['Year']].sea_level = row['Absolute Sea Level Change Since 1880 (inches)']

world_population_df = pd.read_csv(os.path.join(path, "WorldPopulation.csv"))
for idx, row in world_population_df.iterrows():
    year_dict[row['Year']].world_population = row['World Population'].item()

db.session.add_all(year_dict.values())
db.session.commit()

### Table for Emissions Per Country ###
co2_per_country = pd.read_csv(os.path.join(path, "AnnualCO2PerCountry.csv"))
sorted_by_year = co2_per_country.groupby("Year").apply(lambda x: x.nlargest(10, "Per capita CO2 emissions")).reset_index(drop=True)

# Stores a dictionary of years with the CountryEmissionsPerYear object
country_years_list = []
for index, row in sorted_by_year.iterrows():
    parent_year = db.session.query(Year1).filter(Year1.year_name == row['Year']).first()
    new_year = CountryEmissionsPerYear(year1=parent_year)
    new_year.year_name = row['Year']
    new_year.country = row['Entity']
    new_year.code = row['Code']
    new_year.country_co2 = row['Per capita CO2 emissions']
    country_years_list.append(new_year)

db.session.add_all(country_years_list)
db.session.commit()

## Table for Avg City Temps Per Year ###
# city_temp_per_year = pd.read_csv("./datasets/AvgTempCity.csv")
# sorted_by_year = city_temp_per_year.groupby("Year").apply(lambda x: x.nlargest(10, 'AvgTemperature')).reset_index(drop=True)
# # Stores a dictionary of years with the CityTempPerYear object
# city_years_list = []
# for index, row in sorted_by_year.iterrows():
#     new_year = CityTempPerYear()
#     new_year.year_name = row['Year']
#     new_year.city = row['City']
#     if db.session.query(City).filter(City.city_name==row['City']).first():
#         new_year.city_id = db.session.query(City).filter(City.city_name==row['City']).first().city_id
#     new_year.country = row['Country']
#     new_year.city_temp = row['AvgTemperature']
#     city_years_list.append(new_year)

# db.session.add_all(city_years_list)
# db.session.commit()

# # Adds latitude and longitude of each city in city temps
# cities = CityTempPerYear.query.all()
# for city in cities:
#     # Fill in empty ones
#     if (city.lat == 0) & (city.long == 0) & (" " in city.city):
#         # print("City: " + city.city + " Lat: " + str(city.lat) + " Long: " + str(city.long))
#         words = city.city.split()
#         if "(" in words[1] or ")" in words[1]:
#             print("Has parentheses: " + city.city + " Fix: " + words[0])
#             request_city_location = (
#                 "https://maps.googleapis.com/maps/api/geocode/json?&address="
#                 + words[0]
#                 + "&key=AIzaSyCFxkZtgINP4Jibsl1cNF0mjwExHHZcmSM"
#             )
#             response = requests.request("GET", request_city_location)
#             city_location_data = response.json()
#             city.lat = city_location_data["results"][0]["geometry"]["location"]["lat"]
#             city.long = city_location_data["results"][0]["geometry"]["location"]["lng"]
#         else:
#             print("Has two words: " + words[0] + " " + words[1])
#             request_city_location = (
#                 "https://maps.googleapis.com/maps/api/geocode/json?&address="
#                 + words[0]
#                 + "%20"
#                 + words[1]
#                 + "&key=AIzaSyCFxkZtgINP4Jibsl1cNF0mjwExHHZcmSM"
#             )
#             response = requests.request("GET", request_city_location)
#             city_location_data = response.json()
#             city.lat = city_location_data["results"][0]["geometry"]["location"]["lat"]
#             city.long = city_location_data["results"][0]["geometry"]["location"]["lng"]
#     else:
#         print("Has one word: " + city.city)
#         request_city_location = (
#             "https://maps.googleapis.com/maps/api/geocode/json?&address="
#             + city.city
#             + "&key=AIzaSyCFxkZtgINP4Jibsl1cNF0mjwExHHZcmSM"
#         )
#         response = requests.request("GET", request_city_location)
#         city_location_data = response.json()
#         city.lat = city_location_data["results"][0]["geometry"]["location"]["lat"]
#         city.long = city_location_data["results"][0]["geometry"]["location"]["lng"]

# db.session.commit()


# # Finds the cities we need info on in the Cities Table
# cities_we_need = []
# cities = CityTempPerYear.query.all()
# count = 0
# for city in cities:
#     exist_temp = db.session.query(db.session.query(City).filter_by(city_name=city.city).exists()).scalar()
#     if exist_temp:
#         print("HAVE: " + city.city)
#         count += 1
#     else:
#         print("DONT HAVE: " + city.city)
#         cities_we_need.append(city.city)
# print("We have :" + str(count / len(cities)))
# # Save it to a csv
# print("#########################")
#
# count = 0
# total = 0
# country_capitals = db.session.query(Country.country_capital_city).all()
# for country_capital in country_capitals:
#     if country_capital is not None:
#         # Checks for empty country_capitals
#         if len(country_capital[0]) != 0:
#             capital = country_capital[0]
#             exist_capital = db.session.query(db.session.query(City).filter_by(city_name=capital).exists()).scalar()
#             if exist_capital:
#                 print("HAVE: " + capital)
#                 count += 1
#                 total += 1
#             else:
#                 print("DONT HAVE: " + capital)
#                 total += 1
#                 cities_we_need.append(capital)
#
# print("We have :" + str(count / total))
#
# # Export the cities we need to a csv
# need_df = pd.DataFrame(cities_we_need, columns=["Cities"])
# need_df.to_csv("Cities We Need.csv", index=False)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, threaded=True, debug=True)
