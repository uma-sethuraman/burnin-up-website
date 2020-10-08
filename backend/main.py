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
