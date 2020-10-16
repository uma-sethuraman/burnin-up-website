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

class Year(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    temp_anomaly = db.Column(db.Float)
    co2 = db.Column(db.Float)
    methane = db.Column(db.Float)
    nitrous_oxide = db.Column(db.Float)
    polar_ice = db.Column(db.Float)
    sea_level = db.Column(db.Float)
    # world_population = db.Column(db.BigInteger)

    def __init__(self, year_name=0, temp_anomaly="NaN", co2="NaN", methane="NaN", nitrous_oxide="NaN", polar_ice="NaN",
                 sea_level="NaN"):
        self.year_name = year_name
        self.temp_anomaly = temp_anomaly
        self.co2 = co2
        self.methane = methane
        self.nitrous_oxide = nitrous_oxide
        self.polar_ice = polar_ice
        self.sea_level = sea_level
        # self.world_population = world_population

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

    def __init__(self, city_name="NaN", population=0, time_zone="NaN", elevation=0, lat=0.0, long=0.0, pm25=0.0, co2=0.0, so2 = 0.0, country_iso2code = "NaN"):
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

# Fill in tables
### Table for Country ###
request_url = 'http://api.worldbank.org/v2/countries?format=json&&per_page=400'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
country_list = []
for item in data[1]:
    new_country = Country(country_name=item["name"], country_region=item["region"]["value"], country_income=item["incomeLevel"]["value"], capital_city=item['capitalCity'], iso2code=item['iso2Code'], iso3code=item["id"])
    country_list.append(new_country)
"""
db.session.add_all(country_list)
db.session.commit()

### Table for Years ###
request_url = 'https://global-warming.org/api/temperature-api'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
year_dict = dict()
for item in data["result"]:
    new_year = Year()
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

# world_population_df = pd.read_csv(os.path.join(path, "WorldPopulation.csv"))
# for idx, row in world_population_df.iterrows():
#     year_dict[row['Year']].world_population = row['World Population'].item()

db.session.add_all(year_dict.values())
db.session.commit()

### Table for Emissions Per Country ###
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
    country_years_list.append(new_year)

db.session.add_all(country_years_list)
db.session.commit()

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
countries_list = []
for item in data["countries"]:
    countries_list.append(item)

# TODO: get city info from each country in countries_list


request_url = "https://api.climacell.co/v3/weather/historical/climacell?lat=48.8566&lon=2.3522&unit_system=si&start_time=2020-10-13T14%3A09%3A50Z&end_time=now&fields=pollen_tree,pollen_grass,pollen_weed,fire_index,no2,o3,co,so2,epa_aqi,epa_health_concern,pm25"

my_headers = {
    'apikey': 'HZhAxtPoFuqDNCrrR1mE5Np7i9FAj92O'
}
response = requests.request("GET", request_url, headers=my_headers)
data = response.json()
cities_list = []
for item in data:
    new_city = City(lat=item['lat'], long=item['lon'], pm25=item['pm25']['value'],co2=item['co']['value'], so2=item['so2']['value'])
    cities_list.append(new_city)
db.session.add_all(cities_list)
db.session.commit()



city_headers = {
    'x-rapidapi-key': '7340c68080msh75d1462395c3f6cp12f439jsnebb929c1f188'
}

count = 0
city_list = []
p = iter(country_list)
while True:
    x = next(p)
    if(x.country_iso2code == 'PS'):
        break
next(p)

for item in p:
    if(count > 80):
        break
    str = item.country_iso2code
    request_url = "https://countries-cities.p.rapidapi.com/location/country/" + str + "/city/list"
    response = requests.request("GET", request_url, headers=city_headers)
    print(response.json())
    sleep(1)
    if response.status_code == 200:
        count += 1
        cities_data = response.json()
        for each_city in cities_data["cities"]:
            new_city = City(lat = each_city['latitude'], long=each_city['longitude'], city_name=each_city['name'], population=each_city['population'], country_iso2code=str)
            city_list += [new_city]


db.session.add_all(city_list)
db.session.commit()
"""
city_headers = {
    'token': 'HZhAxtPoFuqDNCrrR1mE5Np7i9FAj92O'
}


how = 0
times = 0
city_table = City.query.all()
for item in city_table:
    if times > 1000:
        break
    times += 1
    str_lat = str(item.lat)
    str_long = str(item.long)
    request_city_climate = "https://api.climacell.co/v3/weather/historical/climacell?lat=" + str_lat + "&lon=" + str_long + "&unit_system=si&start_time=2020-10-16T14%3A09%3A50Z&end_time=2020-10-16T20%3A09%3A50Z&fields=pollen_tree,pollen_grass,pollen_weed,fire_index,no2,o3,co,so2,epa_aqi,epa_health_concern,pm25"
    print(request_city_climate)
    response = requests.request("GET", request_city_climate,headers=city_headers)
    print(response.json())
    if(response.status_code == 200):
        how += 1
print(how)


