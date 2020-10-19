from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import fields
import flask
import json

# Create flask app
app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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
    country_lat = db.Column(db.String())
    country_long = db.Column(db.String())

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

# Country C02 Emissions Per Year Model
class CountryEmissionsPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    country = db.Column(db.String())
    code = db.Column(db.String())
    country_co2 = db.Column(db.Float)

# Avg City Temp Per Year Model
class CityTempPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    city = db.Column(db.String())
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

# Country C02 Emissions Per Year Schema
class CountryEmissionsPerYearSchema(ma.Schema):
    year_id = fields.Int(required=True)
    year_name = fields.Str(required=False)
    country = fields.Str(required=False)
    code = fields.Str(required=False)
    country_co2 = fields.Float(required=False)

# Avg City Temp Per Year Schema
class CityTempPerYearSchema(ma.Schema):
    year_id = fields.Int(required=True)
    year_name = fields.Int(required=False)
    city = fields.Str(required=False)
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
@app.route('/', defaults={'path': ""})
@app.route('/<path:path>')
def get_index(path):
    return render_template("index.html")

# Retrieve all countries
@app.route('/api/countries', methods=['GET'])
def get_countries():
    all_countries = Country.query.all()
    result = countries_schema.dump(all_countries)
    return jsonify({'countries': result})

# Retrieve single country entry by id
@app.route('/api/countries/id=<id>', methods=['GET'])
def get_country_id(id):
    country = Country.query.get(id)
    if country is None:
        print("here")
        response = flask.Response(json.dumps({"error": id + " not found"}), mimetype='application/json')
        response.status_code = 404
        return response
    return country_schema.jsonify(country)

# Retrieve all years
@app.route('/api/years', methods=['GET'])
def get_years():
    all_years = Year.query.all()
    result = years_schema.dump(all_years)
    return jsonify({'years': result})

# Retrieve single year entry by name
@app.route('/api/years/name=<name>', methods=['GET'])
def get_year_name(name):
    year = db.session.query(Year).filter(Year.year_name==name).first()
    if year is None:
        response = flask.Response(json.dumps({"error": name + " not found"}), mimetype='application/json')
        response.status_code = 404
        return response
    return year_schema.jsonify(year)

# Retrieve country carbon emissions per year
@app.route('/api/country_emissions')
def get_country_emissions():
    all_country_years = CountryEmissionsPerYear.query.order_by(CountryEmissionsPerYear.year_id).all()
    result = countries_emissions_schema.dump(all_country_years)
    return jsonify({'country_emissions_years': result})

# Retrieve avg city temps per year
@app.route('/api/city_temperatures')
def get_city_temperatures():
    all_cities_temps = CityTempPerYear.query.order_by(CityTempPerYear.year_name).all()
    result = cities_temp_schema.dump(all_cities_temps)
    return jsonify({'city_temperatures_years': result})

# # Retrieve all cities
@app.route('/api/cities', methods=['GET'])
def get_cities():
    all_cities = City.query.all()
    result = cities_schema.dump(all_cities)
    return jsonify({'cities': result})

# # Retrieve single city entry by id
@app.route('/api/cities/id=<id>', methods=['GET'])
def get_city_id(id):
    city = City.query.get(id)
    if city is None:
        response = flask.Response(json.dumps({"error": id + " not found"}), mimetype='application/json')
        response.status_code = 404
        return response
    return citys_schema.jsonify(city)

# # Retrieve single city  entry by name
@app.route('/api/cities/name=<name>', methods=['GET'])
def get_city_name(name):
    city = db.session.query(City).filter(City.city_name==name).first()
    if city is None:
        response = flask.Response(json.dumps({"error": name + " not found"}), mimetype='application/json')
        response.status_code = 404
        return response
    return citys_schema.jsonify(city)

@app.route('/api/cities/capital_city', methods=['GET'])
def get_capital():
    city_table = City.query.all()
    cp = db.session.query(Country.country_capital_city).all()
    cities_list = []
    for each in cp:
        if len(each[0]) != 0:
            cities_list += each
    topcities = CityTempPerYear.query.all()
    for item in topcities:
        cities_list += [item.city]
    return jsonify({"captial_city": cities_list})

# Retrieve city years
@app.route('/api/city_year', methods=['GET'])
def get_city_years():
    all_city_years = CityYear.query.all()
    result = city_years_schema.dump(all_city_years)
    return jsonify({'city_years': result})

# Retrieve single city year entry by name
@app.route('/api/city_year/name=<name>', methods=['GET'])
def get_city_years_name(name):
    city_year = db.session.query(CityYear).filter(CityYear.city==name).first()
    if city_year is None:
        response = flask.Response(json.dumps({"error": name + " not found"}), mimetype='application/json')
        response.status_code = 404
        return response
    return city_year_schema.jsonify(city_year)

# Retrieve country years
@app.route('/api/country_year', methods=['GET'])
def country_years():
    country_year = CountryYear.query.all()
    result = countriesYear_schema.dump(country_year)
    return jsonify({'country_year': result})

# Retrieve single country year entry by name
@app.route('/api/country_year/name=<name>', methods=['GET'])
def country_year(name):
    country_year = db.session.query(CountryYear).filter(CountryYear.country == name).first()
    if country_year is None:
        response = flask.Response(json.dumps({"error": name + " not found"}), mimetype='application/json')
        response.status_code = 404
        return response
    return countryYear_schema.jsonify(country_year)
#getting the capital city id by country id
@app.route('/api/<country_id>/capital_city_id', methods=['GET'])
def get_capital_city_id(country_id):
    country = Country.query.get(country_id)
    str2 = str(country.country_capital_city)
    city = db.session.query(City).filter(City.city_name == str2).first()
    if city is None:
        response = flask.Response(json.dumps({"error": country_id + " not found"}), mimetype='application/json')
        response.status_code = 404
        return response
    return jsonify({'capital_city_id': city.city_id})

#getting the country code and name by city id
@app.route('/api/<city_id>/country_code', methods=['GET'])
def get_country_id_by_city(city_id):
    city = City.query.get(city_id)
    city_country = city.country_iso2code
    country = db.session.query(Country).filter(Country.country_iso2code == city_country).first()
    if country is None:
        response = flask.Response(json.dumps({"error": city_id + " not found"}), mimetype='application/json')
        response.status_code = 404
        return response
    result = {country.country_id: country.country_name}
    return jsonify({'capital_city_id': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True, debug=True)
