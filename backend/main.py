from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import fields

# Create flask app
app = Flask(__name__)
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

# Year Model
class Year(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    temp_anomaly = db.Column(db.Float)
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

class YearSchema(ma.Schema):
    year_id = fields.Int(required=True)
    year_name = fields.Str(required=False)
    temp_anomaly = fields.Float(required=False)
    co2 = fields.Float(required=False)


###### INITIALIZE SCHEMA OBJECTS ######

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

year_schema = YearSchema()
years_schema = YearSchema(many=True)

###### ENDPOINTS ######

# Retrieve all countries
@app.route('/api/Countries', methods=['GET'])
def get_countries():
    all_countries = Country.query.all()
    result = countries_schema.dump(all_countries)
    return jsonify({'countries': result})

# Retrieve single country entry by id
@app.route('/api/Countries/id=<id>', methods=['GET'])
def get_country_id(id):
    country = Country.query.get(id)
    return country_schema.jsonify(country)

# Retrieve single country entry by name
@app.route('/api/Countries/name=<name>', methods=['GET'])
def get_country_name(name):
    country = db.session.query(Country).filter(Country.country_name==name).first()
    return country_schema.jsonify(country)

# Retrieve all years
@app.route('/api/Years', methods=['GET'])
def get_years():
    all_years = Year.query.all()
    result = years_schema.dump(all_years)
    return jsonify({'years': result})

# Retrieve single year entry by id
@app.route('/api/Years/id=<id>', methods=['GET'])
def get_year_id(id):
    year = Year.query.get(id)
    return year_schema.jsonify(year)

# Retrieve single year entry by name
@app.route('/api/Years/name=<name>', methods=['GET'])
def get_year_name(name):
    year = db.session.query(Year).filter(Year.year_name==name).first()
    return year_schema.jsonify(year)

if __name__ == '__main__':
    app.run(debug=True)
