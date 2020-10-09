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

# Create flask app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

"""
# Create cities, country, and years model
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

class CountrySchema(ma.Schema):
    class Meta:
        fields = ('country_id', 'country_name', 'country_region', 'country_income', 'capital_city', 'iso2code')

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

@app.route('/api/country', methods=['GET'])
def get_countries():
    all_country = Country.query.all()
    result = countries_schema.dump(all_country)
    return jsonify(result)

@app.route('/api/country/<country_id>', methods=['GET'])
def get_country(country_id):
    country = Country.query.get(country_id)
    result = country_schema.dump(country)
    return jsonify(result)


# Create climate change api request
class Year(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    temp_anomaly = db.Column(db.Float)
    co2 = db.Column(db.Float)

    def __init__(self, year_name=0, temp_anomaly="NaN", co2="NaN"):
        self.year_name = year_name
        self.temp_anomaly = temp_anomaly
        self.co2 = co2

class YearSchema(ma.Schema):
    class Meta:
        fields = ('year_id', 'year_name', 'temperature_anomaly', 'carbon_dioxide_level')

year_schema = YearSchema()
years_schema = YearSchema(many=True)

@app.route('/api/years', methods=['GET'])
def get_countries():
    all_years = Year.query.all()
    result = years_schema.dump(all_years)
    return jsonify(result)

"""

# just to test connectivity with front end
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'test' : 'does it work now??'})



if __name__ == '__main__':
    app.run(debug=True)
