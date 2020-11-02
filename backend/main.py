from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields
import flask
import json
import flask_marshmallow as ma

# Create flask app
app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build",
)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.debug = True

db = SQLAlchemy(app)
ma = Marshmallow(app)


###### MODELS ######

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
    lat = db.Column(db.Integer)
    long = db.Column(db.Integer)
    cities = db.relationship('City1', backref='country1')
    high_year = db.Column(db.Integer)


# Year model
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
    countries_emissions = db.relationship('CountryEmissionsPerYear', cascade='all,delete-orphan', single_parent=True,
                                          backref=db.backref('year1', lazy='joined'))
    city_temperatures = db.relationship('CityTempPerYear', cascade='all,delete-orphan', single_parent=True,
                                        backref=db.backref('year1', lazy='joined'))


# City model
class City1(db.Model):
    city_id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String())
    country_id = db.Column(db.Integer, db.ForeignKey('country1.country_id'))
    country_name = db.Column(db.String())
    country = db.relationship('Country1', backref='city1')
    country_iso2 = db.Column(db.String())
    population = db.Column(db.Integer)
    o3 = db.Column(db.Float)
    pm10 = db.Column(db.Float)
    pm25 = db.Column(db.Float)
    highest_temp = db.Column(db.Float)
    year_highest = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)


# Creates top countries contributing to climate change per year api request
class CountryEmissionsPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    country = db.Column(db.String())
    country_id = db.Column(db.Integer)
    code = db.Column(db.String())
    country_co2 = db.Column(db.Float)
    parent_year_id = db.Column(db.Integer, db.ForeignKey('year1.year_id'))


# Avg City Temp Per Year Model
class CityTempPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    city = db.Column(db.String())
    city_id = db.Column(db.Integer)
    country = db.Column(db.String())
    city_temp = db.Column(db.Float)
    parent_year_id = db.Column(db.Integer, db.ForeignKey('year1.year_id'))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)


###### SCHEMAS ######

# Country Schema
class CountrySchema1(ma.Schema):
    country_id = fields.Int(required=True)
    country_name = fields.Str(required=False)
    country_region = fields.Str(required=False)
    income_level = fields.Str(required=False)
    country_iso2code = fields.Str(required=False)
    country_iso3code = fields.Str(required=False)
    country_population = fields.Int(required=False)
    lat = fields.Int(required=False)
    long = fields.Int(required=False)
    highest_emission = fields.Float(required=False)
    recent_emissions = fields.Float(required=False)
    capital_city_id = fields.Int(required=False)
    country_capital_city = fields.Str(required=False)
    high_year = fields.Int(required=False)


# City Schema
class CitySchema(ma.Schema):
    city_id = fields.Int(required=True)
    city_name = fields.Str(required=False)
    country_id = fields.Int(required=False)
    country_name = fields.Str(required=False)
    population = fields.Int(required=False)
    o3 = fields.Float(required=False)
    pm10 = fields.Float(required=False)
    pm25 = fields.Float(required=False)
    highest_temp = fields.Float(required=False)
    year_highest = fields.Int(required=False)
    latitude = fields.Float(required=False)
    longitude = fields.Float(required=False)


# Country C02 Emissions Per Year Schema
class CountryEmissionsPerYearSchema1(ma.Schema):
    year_id = fields.Int(required=True)
    year_name = fields.Str(required=False)
    country = fields.Str(required=False)
    country_id = fields.Int(required=False)
    code = fields.Str(required=False)
    country_co2 = fields.Float(required=False)
    parent_year_id = fields.Int(required=False)


# Avg City Temp Per Year Schema
class CityTempPerYearSchema1(ma.Schema):
    year_id = fields.Int(required=True)
    year_name = fields.Int(required=False)
    city = fields.Str(required=False)
    city_id = fields.Int(required=False)
    country = fields.Str(required=False)
    city_temp = fields.Float(required=False)
    parent_year_id = fields.Int(required=False)
    latitude = fields.Float(required=False)
    longitude = fields.Float(required=False)


# Year Schema
class YearSchema1(ma.Schema):
    year_id = fields.Int(required=True)
    year_name = fields.Str(required=False)
    temp_anomaly = fields.Float(required=False)
    co2 = fields.Float(required=False)
    methane = fields.Float(required=False)
    nitrous_oxide = fields.Float(required=False)
    polar_ice = fields.Float(required=False)
    sea_level = fields.Float(required=False)
    world_population = fields.Int(required=False)
    countries_emissions = fields.Nested(CountryEmissionsPerYearSchema1, many=True)
    city_temperatures = fields.Nested(CityTempPerYearSchema1, many=True)


###### INITIALIZE SCHEMA OBJECTS ######

country_schema = CountrySchema1()
countries_schema = CountrySchema1(many=True)

year_schema = YearSchema1()
years_schema = YearSchema1(many=True)

city_schema = CitySchema()
cities_schema = CitySchema(many=True)


###### ENDPOINTS ######
# Root routing
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def get_index(path):
    return render_template("index.html")


# -------------------
# Countries Endpoints
# -------------------

# Retrieve all countries
@app.route("/api/countries", methods=["GET"])
def get_countries():
    all_countries = Country1.query.all()
    result = countries_schema.dump(all_countries)
    return jsonify({"countries": result})


# Retrieve single country entry by id
@app.route("/api/countries/id=<id>", methods=["GET"])
def get_country_id(id):
    country = Country1.query.get(id)
    if country is None:
        response = flask.Response(
            json.dumps({"error": id + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return country_schema.jsonify(country)


# ----------------
# Years Endpoints
# ----------------

# Retrieve all years
@app.route("/api/years", methods=["GET"])
def get_years():
    all_years = Year1.query.order_by(Year1.year_id).all()
    result = years_schema.dump(all_years)
    return jsonify({"years": result})


# Retrieve single city entry by id
@app.route("/api/years/id=<id>", methods=["GET"])
def get_year_id(id):
    year = Year1.query.get(id)
    if year is None:
        response = flask.Response(
            json.dumps({"error": id + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return year_schema.jsonify(year)


# -----------------
# Cities Endpoints
# -----------------

# Retrieve all cities
@app.route("/api/cities", methods=["GET"])
def get_cities():
    all_cities = City1.query.all()
    result = cities_schema.dump(all_cities)
    return jsonify({"cities": result})


# Retrieve single city entry by id
@app.route("/api/cities/id=<id>", methods=["GET"])
def get_city_id(id):
    city = City1.query.get(id)
    if city is None:
        response = flask.Response(
            json.dumps({"error": id + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return city_schema.jsonify(city)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True, debug=True)
