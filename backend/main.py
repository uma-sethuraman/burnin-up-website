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
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    cities = db.relationship('City1', backref = 'country1')

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
    countries_emissions = db.relationship('CountryEmissionsPerYear', cascade='all,delete-orphan', single_parent=True, backref=db.backref('year1', lazy='joined'))
    city_temperatures = db.relationship('CityTempPerYear', cascade='all,delete-orphan', single_parent=True, backref=db.backref('year1', lazy='joined'))


# City model
class City1(db.Model):
    city_id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String())
    country_id = db.Column(db.Integer, db.ForeignKey('country1.country_id'))
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


### TO BE REMOVED BY END OF PHASE 3 ###

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

# City Year Model
class CityYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String())
    year = db.Column(db.Integer)
    temp = db.Column(db.Float)


# Country Year Model
class CountryYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String())
    year = db.Column(db.Integer)
    co2 = db.Column(db.Float)


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
    lat = fields.Str(required=False)
    long = fields.Str(required=False)
    highest_emission = fields.Float(required=False)
    recent_emissions = fields.Float(required=False)
    capital_city_id = fields.Int(required=False)
    country_capital_city = fields.Str(required=False)

# City Schema
class CitySchema(ma.Schema):
    city_id = fields.Int(required=True)
    city_name = fields.Str(required=False)
    country = fields.Nested(CountrySchema1(only=('country_name', 'country_id')))
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

# City Year Schema
class CityYearSchema(ma.Schema):
    year_id = fields.Int(required=True)
    city = fields.Str(required=False)
    year = fields.Int(required=False)
    temp = fields.Float(required=False)


# Country Year Schema
class CountryYearSchema(ma.Schema):
    year_id = fields.Int(required=True)
    country = fields.Str(required=False)
    year = fields.Int(required=False)
    co2 = fields.Float(required=False)


###### INITIALIZE SCHEMA OBJECTS ######

country_schema = CountrySchema1()
countries_schema = CountrySchema1(many=True)

year_schema = YearSchema1()
years_schema = YearSchema1(many=True)

city_schema = CitySchema()
cities_schema = CitySchema(many=True)

countries_emissions_schema = CountryEmissionsPerYearSchema1(many=True)
cities_temp_schema = CityTempPerYearSchema1(many=True)

city_years_schema = CityYearSchema(many=True)
city_year_schema = CityYearSchema()

countriesYear_schema = CountryYearSchema(many=True)
countryYear_schema = CountryYearSchema()


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

@app.route("/api/countries/sort=<order>&column=<column>", methods=["GET"])
def get_sorted_countries(order, column):
    if order == "descending":
        sorted_countries = Country1.query.order_by(getattr(Country1, column).desc()).all()
    if order == "ascending":
        sorted_countries = Country1.query.order_by(getattr(Country1, column).asc()).all()
    result = countries_schema.dump(sorted_countries)
    return jsonify({"countries": result})


# Retrieve all countries filtered
@app.route("/api/countries/filter", methods=["GET"])
def get_filtered_countries():
    region = request.args.get("region")
    income = request.args.get("income")
    co2 = request.args.get("co2")
    lat = request.args.get("lat")
    long = request.args.get("long")
    pop = request.args.get("population")
    all_countries = db.session.query(Country1)

    if region != None:
        all_countries = all_countries.filter(Country1.country_region == region)

    if income != None:
        all_countries = all_countries.filter(Country1.income_level == income)

    if co2 != None:
        if co2 == "low":
            all_countries =all_countries.filter(Country1.recent_emission < 5)
        elif co2 == "medium":
            all_countries =all_countries.filter(Country1.recent_emissions >= 5).filter(Country1.recent_emissions <= 15)
        elif co2 == "high":
            all_countries =all_countries.filter(Country1.recent_emission > 15)

    if lat != None:
        if lat == "north":
            all_countries =all_countries.filter(Country1.lat <= 90 ).filter(Country1.lat >=0)
        elif lat == "south":
            all_countries =all_countries.filter(Country1.lat < 0 )

    if long != None:
        if long == "west":
            all_countries =all_countries.filter(Country1.long <= 90).filter(Country1.long >= 0)
        elif long == "east":
            all_countries =all_countries.filter(Country1.long <= 0)

    if pop!=None:
        if pop == "small":
            all_countries = all_countries.filter(Country1.country_population >=0 ).filter(Country1.country_population < 100000)
        if pop == "medium":
            all_countries = all_countries.filter(Country1.country_population >= 100000).filter(Country1.country_population < 5000000)
        if pop == "large":
            all_countries = all_countries.filter(Country1.country_population >= 5000000).filter(Country1.country_population < 200000000)
        if pop == "huge":
            all_countries = all_countries.filter(Country1.country_population >= 200000000)

    result = countries_schema.dump(all_countries)
    return jsonify({"countries": result})


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


# Retrieve single year entry by year name
@app.route("/api/years/name=<name>", methods=["GET"])
def get_year_name(name):
    year = db.session.query(Year1).filter(Year1.year_name == name).first()
    if year is None:
        response = flask.Response(
            json.dumps({"error": name + " not found"}), mimetype="application/json"
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


# -------------------------
# Endpoints to Remove Later
# -------------------------

# Retrieve country carbon emissions per year
@app.route("/api/country_emissions")
def get_country_emissions():
    all_country_years = CountryEmissionsPerYear.query.order_by(
        CountryEmissionsPerYear.year_id
    ).all()
    result = countries_emissions_schema.dump(all_country_years)
    return jsonify({"country_emissions_years": result})


# Retrieve avg city temps per year
@app.route("/api/city_temperatures")
def get_city_temperatures():
    all_cities_temps = CityTempPerYear.query.order_by(CityTempPerYear.year_name).all()
    result = cities_temp_schema.dump(all_cities_temps)
    return jsonify({"city_temperatures_years": result})


# Retrieve list of relevant city names (capitals and top temp per year cities)
@app.route("/api/cities/city_names", methods=["GET"])
def get_capital():
    city_table = City.query.all()
    cp = db.session.query(Country.country_capital_city).all()
    cities_list = []
    for each in cp:
        if each[0] not in cities_list:
            cities_list += each
    topcities = CityTempPerYear.query.all()
    for item in topcities:
        if item.city not in cities_list:
            cities_list += [item.city]
    return jsonify({"city_names": cities_list})


# Retrieve city years (hottest year for each city)
@app.route("/api/city_year", methods=["GET"])
def get_city_years():
    all_city_years = CityYear.query.all()
    result = city_years_schema.dump(all_city_years)
    return jsonify({"city_years": result})


# Retrieve single city year entry by city name (hottest year for each city)
@app.route("/api/city_year/name=<name>", methods=["GET"])
def get_city_years_name(name):
    city_year = db.session.query(CityYear).filter(CityYear.city == name).first()
    if city_year is None:
        response = flask.Response(
            json.dumps({"error": name + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return city_year_schema.jsonify(city_year)


# Retrieve country years (highest carbon emissions for each country)
@app.route("/api/country_year", methods=["GET"])
def country_years():
    country_year = CountryYear.query.all()
    result = countriesYear_schema.dump(country_year)
    return jsonify({"country_year": result})


# Retrieve single country year entry by country name (highest carbon emissions for each country)
@app.route("/api/country_year/name=<name>", methods=["GET"])
def country_year(name):
    country_year = (
        db.session.query(CountryYear).filter(CountryYear.country == name).first()
    )
    if country_year is None:
        response = flask.Response(
            json.dumps({"error": name + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return countryYear_schema.jsonify(country_year)


# Getting the capital city id by country id
@app.route("/api/<country_id>/capital_city_id", methods=["GET"])
def get_capital_city_id(country_id):
    country = Country.query.get(country_id)
    if country is None:
        response = flask.Response(
            json.dumps({"error": "country id " + country_id + " not found"}),
            mimetype="application/json",
        )
        response.status_code = 404
        return response
    str2 = str(country.country_capital_city)
    city = db.session.query(City).filter(City.city_name == str2).first()
    if city is None:
        response = flask.Response(
            json.dumps({"error": country_id + " not found"}),
            mimetype="application/json",
        )
        response.status_code = 404
        return response
    return jsonify({"capital_city_id": city.city_id})


# Getting the country code and name by city id
@app.route("/api/<city_id>/country_code", methods=["GET"])
def get_country_id_by_city(city_id):
    city = City.query.get(city_id)
    if city is None:
        response = flask.Response(
            json.dumps({"error": "city id " + city_id + " not found"}),
            mimetype="application/json",
        )
        response.status_code = 404
        return response
    city_country = city.country_iso2code
    country = (
        db.session.query(Country)
            .filter(Country.country_iso2code == city_country)
            .first()
    )
    if country is None:
        response = flask.Response(
            json.dumps({"error": city_id + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    result = {"id": country.country_id, "name": country.country_name}
    return jsonify({"country_code": result})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True, debug=True)
