from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask_marshmallow import Marshmallow
from marshmallow import fields
import flask
import json

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


# Year Model
class Year(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    temp_anomaly = db.Column(db.Float)
    co2 = db.Column(db.Float)
    methane = db.Column(db.Float)
    nitrous_oxide = db.Column(db.Float)
    polar_ice = db.Column(db.Float)
    sea_level = db.Column(db.Float)
    world_population = db.Column(db.BigInteger)


# Country C02 Emissions Per Year Model
class CountryEmissionsPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    country = db.Column(db.String())
    code = db.Column(db.String())
    country_co2 = db.Column(db.Float)
    countryid = db.Column(db.Integer)


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


# City Model
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
class CountrySchema(ma.Schema):
    country_id = fields.Int(required=True)
    country_name = fields.Str(required=False)
    country_region = fields.Str(required=False)
    country_income = fields.Str(required=False)
    country_capital_city = fields.Str(required=False)
    country_iso2code = fields.Str(required=False)
    country_iso3code = fields.Str(required=False)
    country_lat = fields.Str(required=False)
    country_long = fields.Str(required=False)
    recent_emissions_year = fields.Int(required=False)
    recent_emissions = fields.Float(required=False)


# Year Schema
class YearSchema(ma.Schema):
    year_id = fields.Int(required=True)
    year_name = fields.Str(required=False)
    temp_anomaly = fields.Float(required=False)
    co2 = fields.Float(required=False)
    methane = fields.Float(required=False)
    nitrous_oxide = fields.Float(required=False)
    polar_ice = fields.Float(required=False)
    sea_level = fields.Float(required=False)
    world_population = fields.Int(required=False)


# Country C02 Emissions Per Year Schema
class CountryEmissionsPerYearSchema(ma.Schema):
    year_id = fields.Int(required=True)
    year_name = fields.Str(required=False)
    country = fields.Str(required=False)
    code = fields.Str(required=False)
    country_co2 = fields.Float(required=False)
    countryid = fields.Int(required=False)


# Avg City Temp Per Year Schema
class CityTempPerYearSchema(ma.Schema):
    year_id = fields.Int(required=True)
    year_name = fields.Int(required=False)
    city = fields.Str(required=False)
    city_id = fields.Int(required=False)
    country = fields.Str(required=False)
    city_temp = fields.Float(required=False)
    lat = fields.Float(required=False)
    long = fields.Float(required=False)


# City Schema
class CitySchema(ma.Schema):
    city_id = fields.Int(required=True)
    city_name = fields.Str(required=False)
    population = fields.Int(required=False)
    time_zone = fields.Str(required=False)
    elevation = fields.Int(required=False)
    lat = fields.Float(required=False)
    long = fields.Float(required=False)
    pm25 = fields.Float(required=False)
    pm10 = fields.Float(required=False)
    o3 = fields.Float(required=False)
    country_iso2code = fields.Str(required=False)
    co = fields.Float(required=False)


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

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

year_schema = YearSchema()
years_schema = YearSchema(many=True)

citys_schema = CitySchema()
cities_schema = CitySchema(many=True)

countries_emissions_schema = CountryEmissionsPerYearSchema(many=True)
cities_temp_schema = CityTempPerYearSchema(many=True)

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
    all_countries = Country.query.all()
    result = countries_schema.dump(all_countries)
    return jsonify({"countries": result})


# Retrieve single country entry by id
@app.route("/api/countries/id=<id>", methods=["GET"])
def get_country_id(id):
    country = Country.query.get(id)
    if country is None:
        print("here")
        response = flask.Response(
            json.dumps({"error": id + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return country_schema.jsonify(country)

# Retrieve all countries filtered
@app.route("/api/countries/filter", methods=["GET"])
def get_filtered_countries():
    to_region = request.args.get("region", "") # http://localhost:5000/api/countriesfiltered?region=South%20Asia&incomelevel=Lower%20middle%20income
    to_income = request.args.get("incomelevel", "")

    all_countries = db.session.query(Country)

    if to_region:
        all_countries = all_countries.filter(Country.country_region == to_region)
    if to_income:
        all_countries = all_countries.filter(Country.country_income == to_income)

    result = countries_schema.dump(all_countries)
    return jsonify({"countries": result})

# ----------------
# Years Endpoints
# ----------------

# Retrieve all years
@app.route("/api/years", methods=["GET"])
def get_years():
    all_years = Year.query.all()
    result = years_schema.dump(all_years)
    return jsonify({"years": result})


# Retrieve single year entry by year name
@app.route("/api/years/name=<name>", methods=["GET"])
def get_year_name(name):
    year = db.session.query(Year).filter(Year.year_name == name).first()
    if year is None:
        response = flask.Response(
            json.dumps({"error": name + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return year_schema.jsonify(year)

# Retrieve sorted years model
@app.route("/api/years/sort=<order>&column=<column>", methods=["GET"])
def get_sorted_years(order, column):
    if order == "descending":
        sorted_years = Year.query.order_by(getattr(Year, column).desc()).all()
    if order == "ascending":
        sorted_years = Year.query.order_by(getattr(Year, column).asc()).all()
    result = years_schema.dump(sorted_years)
    return jsonify({"years": result})

# Retrieve all filtered cities
@app.route("/api/years/filter", methods=["GET"])
def get_filtered_years():
    year = request.args.get("year", "")
    methane = request.args.get("methane", "")
    ice_extent = request.args.get("ice_extent", "")
    sea_level = request.args.get("sea_level", "")
    co2 = request.args.get("co2", "")
    nitrous_oxide = request.args.get("nitrous_oxide", "")

    all_years = db.session.query(Year)

    if year:
        if year == "1880":
            all_years = all_years.filter(1880 <= Year.year_name).filter(Year.year_name <= 1900)
        if year == "1900":
            all_years = all_years.filter(1900 <= Year.year_name).filter(Year.year_name <= 1920)
        if year == "1920":
            all_years = all_years.filter(1920 <= Year.year_name).filter(Year.year_name <= 1940)
        if year == "1940":
            all_years = all_years.filter(1940 <= Year.year_name).filter(Year.year_name <= 1960)
        if year == "1960":
            all_years = all_years.filter(1960 <= Year.year_name).filter(Year.year_name <= 1980)
        if year == "1980":
            all_years = all_years.filter(1980 <= Year.year_name).filter(Year.year_name <= 2000)
        if year == "2000":
            all_years = all_years.filter(2000 <= Year.year_name).filter(Year.year_name <= 2018)
    if methane:
        if methane == "1000":
            all_years = all_years.filter(Year.methane <= 1000)
        if methane == "10001500":
            all_years = all_years.filter(Year.methane >= 1000).filter(Year.methane <= 1500)
        if methane == "1500":
            all_years = all_years.filter(Year.methane >= 1500)
    if ice_extent:
        if ice_extent == "23mil":
            all_years = all_years.filter(Year.ice_extent <= 23000000)
        if ice_extent == "2327mil":
            all_years = all_years.filter(Year.ice_extent >= 23000000).filter(Year.ice_extent <= 27000000)
        if ice_extent == "27mil":
            all_years = all_years.filter(Year.ice_extent >= 27000000)
    if sea_level:
        if sea_level == "2":
            all_years = all_years.filter(Year.sea_level <= 2)
        if sea_level == "26":
            all_years = all_years.filter(Year.sea_level >= 2).filter(Year.sea_level <= 6)
        if sea_level == "6":
            all_years = all_years.filter(Year.sea_level >= 6)
    if co2:
        if co2 == "300":
            all_years = all_years.filter(Year.co2 <= 300)
        if co2 == "300350":
            all_years = all_years.filter(Year.co2 >= 300).filter(Year.co2 <= 350)
        if co2 == "350":
            all_years = all_years.filter(Year.co2 >= 350)
    if nitrous_oxide:
        if nitrous_oxide == "290":
            all_years = all_years.filter(Year.nitrous_oxide <= 290)
        if nitrous_oxide == "290320":
            all_years = all_years.filter(Year.nitrous_oxide >= 290).filter(Year.nitrous_oxide <= 320)
        if nitrous_oxide == "320":
            all_years = all_years.filter(Year.nitrous_oxide >= 320)
 

    result = years_schema.dump(all_years)
    return jsonify({"years_filtered": result})

# -----------------
# Cities Endpoints
# -----------------

# Retrieve all cities
@app.route("/api/cities", methods=["GET"])
def get_cities():
    all_cities = City.query.all()
    result = cities_schema.dump(all_cities)
    return jsonify({"cities": result})


# Retrieve single city entry by id
@app.route("/api/cities/id=<id>", methods=["GET"])
def get_city_id(id):
    city = City.query.get(id)
    if city is None:
        response = flask.Response(
            json.dumps({"error": id + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return citys_schema.jsonify(city)


# Retrieve single city entry by city name
@app.route("/api/cities/name=<name>", methods=["GET"])
def get_city_name(name):
    city = db.session.query(City).filter(City.city_name == name).first()
    if city is None:
        response = flask.Response(
            json.dumps({"error": name + " not found"}), mimetype="application/json"
        )
        response.status_code = 404
        return response
    return citys_schema.jsonify(city)

# Retrieve all sorted cities 
@app.route("/api/cities/sort=<order>&column=<column>", methods=["GET"])
def get_sorted_cities(order, column):
    if order == "descending":
        sorted_cities = City.query.order_by(getattr(City, column).desc()).all()
    if order == "ascending":
        sorted_cities = City.query.order_by(getattr(City, column).asc()).all()
    result = cities_schema.dump(sorted_cities)
    return jsonify({"cities_sorted": result})

# Retrieve all filtered cities
@app.route("/api/cities/filter", methods=["GET"])
def get_filtered_cities():
    name = request.args.get("name", "")
    population = request.args.get("population", "")
    o3 = request.args.get("o3", "")
    pm10 = request.args.get("pm10", "")
    pm25 = request.args.get("pm25", "")

    all_cities = db.session.query(City)

    if name:
        if name == "ai":
            all_cities = all_cities.filter("a" <= City.city_name).filter(City.city_name <= "i")
        if name == "jr":
            all_cities = all_cities.filter("j" <= City.city_name).filter(City.city_name <= "r")
        if name == "sz":
            all_cities = all_cities.filter("s" <= City.city_name).filter(City.city_name <= "z")
    if population:
        if population == "500k":
            all_cities = all_cities.filter(City.population <= 500000)
        if population == "5mil":
            all_cities = all_cities.filter(City.population <= 5000000)
        if population == "20mil":
            all_cities = all_cities.filter(City.population <= 20000000)
    if o3:
        if o3 == "15":
            all_cities = all_cities.filter(City.o3 < 15.0)
        if o3 == "1530":
            all_cities = all_cities.filter(15.0 <= City.o3).filter(City.o3 <= 30.0)
        if o3 == "30":
            all_cities = all_cities.filter(City.o3 > 30.0)
    if pm10:
        if pm10 == "20":
            all_cities = all_cities.filter(City.pm10 < 20.0)
        if pm10 == "2060":
            all_cities = all_cities.filter(20.0 <= City.pm10).filter(City.pm10 <= 60.0)
        if pm10 == "60":
            all_cities = all_cities.filter(City.pm10 > 60.0)
    if pm25:
        if pm25 == "50":
            all_cities = all_cities.filter(City.pm25 < 50.0)
        if pm25 == "50100":
            all_cities = all_cities.filter(50.0 <= City.pm25).filter(City.pm25 <= 100.0)
        if pm25 == "100":
            all_cities = all_cities.filter(City.pm25 > 100.0)   

    result = cities_schema.dump(all_cities)
    return jsonify({"cities_filtered": result})

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
