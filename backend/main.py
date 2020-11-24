from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields
import flask
import json
import flask_marshmallow as ma
from models import *

# Create flask app
app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build",
)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql+psycopg2://supremeleader:steven04@burninup-db-1."
    "cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.debug = True

ma = Marshmallow(app)

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
    temp_anomaly = fields.Float(required=False)
    co2 = fields.Float(required=False)
    methane = fields.Float(required=False)
    nitrous_oxide = fields.Float(required=False)
    polar_ice = fields.Float(required=False)
    sea_level = fields.Float(required=False)
    world_population = fields.Int(required=False)


# Year Instance Schema
class YearInstanceSchema1(ma.Schema):
    year_id = fields.Int(required=True)
    temp_anomaly = fields.Float(required=False)
    co2 = fields.Float(required=False)
    methane = fields.Float(required=False)
    nitrous_oxide = fields.Float(required=False)
    polar_ice = fields.Float(required=False)
    sea_level = fields.Float(required=False)
    world_population = fields.Int(required=False)
    countries_emissions = fields.Nested(CountryEmissionsPerYearSchema1, 
                            many=True)
    city_temperatures = fields.Nested(CityTempPerYearSchema1, many=True)


###### INITIALIZE SCHEMA OBJECTS ######

country_schema = CountrySchema1()
countries_schema = CountrySchema1(many=True)

year_instance_schema = YearInstanceSchema1()
years_schema = YearSchema1(many=True)

city_schema = CitySchema()
cities_schema = CitySchema(many=True)


###### ENDPOINTS ######

# Root routing
# Serves the frontend
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
            json.dumps({"error": id + " not found"}), 
            mimetype="application/json"
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
            json.dumps({"error": id + " not found"}), 
            mimetype="application/json"
        )
        response.status_code = 404
        return response
    return year_instance_schema.jsonify(year)


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
            json.dumps({"error": id + " not found"}), 
            mimetype="application/json"
        )
        response.status_code = 404
        return response
    return city_schema.jsonify(city)


if __name__ == "__main__":
    db.init_app(app)
    app.run(host="0.0.0.0", port=5000, threaded=True, debug=True)
