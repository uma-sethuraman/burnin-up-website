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

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))


app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://supremeleader:steven04@burninup-db-1.cgloqeyb6wie.us-east-2.rds.amazonaws.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

"""
@app.route('/Countries', methods=['GET'])
def get_countries():
    all_country = Country.query.all()
    result = countries_schema.dump(all_country)
    return jsonify(result)

@app.route('/Country/<country_id>', methods=['GET'])
def get_country(country_id):
    country = Country.query.get(country_id)
    result = country_schema.dump(country)
    return jsonify(result)
"""


if __name__ == '__main__':
    app.run(debug=True)
