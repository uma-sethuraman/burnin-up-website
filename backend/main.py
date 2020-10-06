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

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))


app.debug = True
print("before config")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres'

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

@app.route('/country', methods=['GET'])
def get_country():
    all_country = Country.query.all()
    result = countries_schema.dump(all_country)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
