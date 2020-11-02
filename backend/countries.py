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

# Create tables

class Country(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    country_region = db.Column(db.String())
    country_income = db.Column(db.String())
    country_capital_city = db.Column(db.String())
    country_iso2code = db.Column(db.String())
    country_iso3code = db.Column(db.String())
    country_lat = db.Column(db.Float)
    country_long = db.Column(db.Float)
    recent_emissions_year = db.Column(db.Integer)
    recent_emissions = db.Column(db.Float)


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
    cities = db.relationship('City1', backref = 'country')
    country_capital_city = db.Column(db.String())
    high_year = db.Column(db.Integer)
    def __init__(
        self,
        country_name="NaN",
        capital_city_id = 0,
        country_iso2code = "NaN",
        country_iso3code = "NaN",
        highest_emission = 0.0,
        recent_emission = 0.0,
        country_population = 0,
        income_level = "NaN",
        country_region = "NaN",
        lat = 0.0,
        long = 0.0
    ):
        self.country_name = country_name
        self.capital_city_id = capital_city_id
        self.country_iso2code = country_iso2code
        self.country_iso3code = country_iso3code
        self.highest_emission = highest_emission
        self.recent_emissions = recent_emission
        self.country_population= country_population
        self.income_level = income_level
        self.country_region = country_region
        self.lat = lat
        self.long = long
db.create_all()

class City(db.Model):
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

class CountryYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String())
    year = db.Column(db.Integer)
    co2 = db.Column(db.Float)

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

### Table for Country ###
""""
request_url = "https://restcountries.eu/rest/v2/all"
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
country_list = []
for item in data:
    new_country = Country1(country_name=item["name"],
                          country_region=item["region"],
                          country_iso2code=item["alpha2Code"],
                          country_iso3code=item["alpha3Code"],
                          country_population=item["population"]
                          )
    if "latlng" in item and len(item["latlng"])==2:
        new_country.lat=item["latlng"][0]
        new_country.long=item["latlng"][1]
    country_list.append(new_country)


countries_tb = Country1.query.all()
for each in countries_tb:
    request_url = "http://api.worldbank.org/v2/country/" + str(each.country_iso2code) + "?format=json"
    r = urllib.request.urlopen(request_url)
    data = json.loads(r.read())
    if "pages" in data[0]:
        each.income_level = data[1][0]["incomeLevel"]["value"]
        each.lat = data[1][0]["longitude"]
        each.long = data[1][0]["latitude"]

db.session.commit()

country_year = Country.query.all()
country_list = []
for each in country_year:
    if each.recent_emissions != 0:
        new_country = Country1(country_name=each.country_name,
                               country_iso2code=each.country_iso2code,
                               country_iso3code=each.country_iso3code,
                               income_level=each.country_income,
                               lat = each.country_lat,
                               long = each.country_long,
                               recent_emission = each.recent_emissions
                               )
        country_list.append(new_country)
db.session.add_all(country_list)
db.session.commit()

country_emissions_df = pd.read_csv(os.path.join(path, "AnnualCO2PerCountry.csv"))
not_found = []
for country in country_list:
    years = country_emissions_df.loc[
        country_emissions_df["Entity"] == country.country_name
    ]
    if len(years) != 0:
        recent_emissions_idx = years["Year"].idxmax()
        country.recent_emissions_year = int(
            country_emissions_df["Year"].iloc[recent_emissions_idx]
        )
        country.recent_emissions = float(
            country_emissions_df["Per capita CO2 emissions"].iloc[recent_emissions_idx]
        )
    else:
        not_found.append(country.country_name)

db.session.add_all(country_list)
db.session.commit()

countries_tb = Country1.query.all()
for each in countries_tb:
    request_url = "https://restcountries.eu/rest/v2/alpha?codes=" + str(each.country_iso2code)
    r = urllib.request.urlopen(request_url)
    data = json.loads(r.read())
    each.country_region = data[0]["region"]
    each.country_population = data[0]["population"]

db.session.commit()

countries_tb = Country1.query.all()
for each in countries_tb:
    country = db.session.query(CountryYear).filter(CountryYear.country == each.country_name).first()
    if country != None:
        each.highest_emission = country.co2
db.session.commit()


Country1.query.filter(Country1.highest_emission == 0).delete()
db.session.commit()


countries_tb = Country1.query.all()
for each in countries_tb:
    if each.capital_city_id == 0:
        name = each.country_capital_city.capitalize()
        city3 = db.session.query(City1).filter(City1.city_name == name).first()
        if city3 != None:
            each.capital_city_id = city3.city_id
db.session.commit()



first = db.session.query(Country).filter(Country.country_name == "Venezuela").first()
firsts = db.session.query(Country).filter(Country.country_name == "Bahamas").first()
list = []
if first == None:
    print("none")
else:
    new_country = Country1(country_name=first.country_name, country_region=first.country_region, income_level=first.country_income, country_iso2code=first.country_iso2code, country_iso3code=first.country_iso3code, recent_emission=first.recent_emissions, lat=first.country_lat, long=first.country_long)
list.append(new_country)
db.session.add_all(list)
db.session.commit()

new = Country1(country_name="Bahamas")
list = []
list += [new]
db.session.add_all(list)
db.session.commit()

list = []
countries_tb = db.session.query(Country1).filter(Country1.country_name == "Brunei").first()
list += [countries_tb]
for each in list:
    request_url = "http://api.worldbank.org/v2/country/" + str(each.country_iso2code) + "?format=json"
    r = urllib.request.urlopen(request_url)
    data = json.loads(r.read())
    if "pages" in data[0]:
        each.income_level = data[1][0]["incomeLevel"]["value"]


db.session.commit()

c = db.session.query(Country1).filter(Country1.country_name == "Bahamas").first()
c.country_iso2code = "BS"
c.country_iso3code = "BSH"
c.highest_emission = 3.492838
c.recent_emissions = 4.3938
c.country_population = 384726
c.income_level = "High Income"
c.country_region = "Americas"
c.lat = 34.3938
c.long = -77.2342
c.country_capital_city = "Nassau"
db.session.commit()

c = db.session.query(Country1).filter(Country1.country_name == "Venezuela").first()
city = db.session.query(City1).filter(City1.city_name == "Caracas").first()
c.capital_city_id = city.city_id
db.session.commit()

c = Country1.query.all()
for each in c:
    var = db.session.query(CountryYear).filter(CountryYear.country == each.country_name).first()
    if var != None:
        each.year = var.year
        print(each.year)
db.session.commit()
"""

countries_tb = Country1.query.all()
for each in countries_tb:
    city3 = db.session.query(CountryYear).filter(CountryYear.country == each.country_name).first()
    if city3 != None:
        each.high_year = city3.year
db.session.commit()
