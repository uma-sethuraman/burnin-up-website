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

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
path = "./datasets"

class CityYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String)
    year = db.Column(db.Integer)
    temp = db.Column(db.Float)

    def __init__(self, city=-1, year=-1, temp=-1):
        self.city = city
        self.year = year
        self.temp = temp

# Creates top countries contributing to climate change per year api request
class CountryYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String())
    year = db.Column(db.Integer)
    co2 = db.Column(db.Float)

    def __init__(self, country=-1, year=-1, co2=-1):
        self.country = country
        self.year = year
        self.co2 = co2

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


db.create_all()

## Table for CityYears ###
count = 0
total = 0
temp_df = pd.read_csv(os.path.join(path, "AvgTempCity.csv"))
city_year_list = []
for country_capital in db.session.query(Country.country_capital_city).all():
    if country_capital is not None:
        # Checks for empty country_capitals
        if len(country_capital[0]) != 0:
            new_city_year = CityYear()
            capital = country_capital[0]
            new_cilty_year.city = capital
            # Checks if we can find the capital city in the city temp table
            if len(temp_df.loc[temp_df['City'] == capital]) != 0:
                new_city_year.temp = float(temp_df.loc[temp_df['City'] == capital]['AvgTemperature'].max())
                # Get year associated with max temp
                max_temp_idx = temp_df.loc[temp_df['City'] == capital]['AvgTemperature'].idxmax()
                new_city_year.year = int(temp_df.iloc[max_temp_idx]['Year'])
                print("City: " + new_city_year.city + " Year: " + str(new_city_year.year) + " Temp: " + str(new_city_year.temp))
                total += 1
                city_year_list.append(new_city_year)
            else:
                print("Couldn't find data for: " + capital)
                count += 1
                total += 1
print("Couldn't find " + str(count) + " out of " + str(total))

db.session.add_all(city_year_list)
db.session.commit()


### Table for CountryYears ###
count = 0
total = 0
co2_df = pd.read_csv(os.path.join(path, "AnnualCO2PerCountry.csv"))
country_year_list = []
for country_name in db.session.query(Country.country_name).all():
    if country_name is not None:
            new_country_year = CountryYear()
            country = country_name[0]
            new_country_year.country = country
            # Checks if we can find the country in the country emissions table
            if len(co2_df.loc[co2_df['Entity'] == country]) != 0:
                new_country_year.co2 = float(co2_df.loc[co2_df['Entity'] == country]['Per capita CO2 emissions'].max())
                # Get year associated with max emissions
                max_emissions_idx = co2_df.loc[co2_df['Entity'] == country]['Per capita CO2 emissions'].idxmax()
                new_country_year.year = int(co2_df.iloc[max_emissions_idx]['Year'])
                print("Country: " + new_country_year.country + " Year: " + str(new_country_year.year) + " Emissions: " + str(new_country_year.co2))
                total += 1
                country_year_list.append(new_country_year)
            else:
                print("Couldn't find data for: " + country)
                count += 1
                total += 1
print("Couldn't find " + str(count) + " out of " + str(total))

db.session.add_all(country_year_list)
db.session.commit()



# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, threaded=True, debug=True)