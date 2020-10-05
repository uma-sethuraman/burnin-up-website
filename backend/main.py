from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from sqlalchemy import Column, String, Integer
from flask import request
import urllib
import os
import json

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Country(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    country_region = db.Column(db.String())

    def __init__(self, country_name, country_region):
        self.country_name = country_name
        self.country_region = country_region

db.create_all()


class CountrySchema(ma.Schema):
    class Meta:
        fields = ('country_id', 'country_name', 'country_region')


country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

request_url = 'http://api.worldbank.org/v2/country?format=json'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
country_list = []
for item in data[1]:
    new_country = Country(country_name=item["name"], country_region=item["region"]["value"])
    country_list.append(new_country)
db.session.add_all(country_list)
db.session.commit()

""""
        country_schema.jsonify(new_country)
@app.route('/country', methods=['POST'])
def append_country():
    country_name = request.json['country']
    air_quality = request.json['air_quality']
    income = request.json['income']
    population = request.json['population']

    new_country = Country(country_name,air_quality,income,population)
    db.session.add(new_country)
    db.session.commit()
    return country_schema.jsonify(new_country)
"""""''

@app.route('/country', methods=['GET'])
def get_country():
    all_country = Country.query.all()
    result = countries_schema.dump(all_country)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
