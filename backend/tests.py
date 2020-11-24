#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# -------
# imports
# -------

from io import StringIO
from unittest import main, TestCase
import sys, os
import requests


class Tests(TestCase):

    # ---------
    # Countries
    # ---------

    # asserts expected number of all countries in response
    def test_countries_num_results(self):
        r = requests.get("https://burninup.me/api/countries")
        assert r.status_code == 200
        d = r.json()
        assert len(d["countries"]) == 185

    # asserts expected first object in all countries response
    def test_countries_all(self):
        r = requests.get("https://burninup.me/api/countries")
        assert r.status_code == 200
        d = r.json()
        assert len(d["countries"]) > 0
        assert d["countries"][0] == {
            "capital_city_id": 3537,
            "country_capital_city": "Bandar Seri Begawan",
            "country_id": 203,
            "country_iso2code": "BN",
            "country_iso3code": "BRN",
            "country_name": "Brunei",
            "country_population": 229384,
            "country_region": "East Asia & Pacific",
            "high_year": 1988,
            "highest_emission": 19.398742,
            "income_level": "High income",
            "lat": 5,
            "long": 115,
            "recent_emissions": 18.48369728,
        }

    # asserts expected country response given id
    def test_countries_instance(self):
        r = requests.get("https://burninup.me/api/countries/id=3")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "capital_city_id": 3401,
            "country_capital_city": "Luanda",
            "country_id": 3,
            "country_iso2code": "AO",
            "country_iso3code": "AGO",
            "country_name": "Angola",
            "country_population": 25868000,
            "country_region": "Africa",
            "high_year": 2014,
            "highest_emission": 1.6423749152828735,
            "income_level": "Lower middle income",
            "lat": -9,
            "long": 13,
            "recent_emissions": 1.1209737471599153,
        }

    # asserts expected error response given invalid id
    def test_countries_error_result(self):
        r = requests.get("https://burninup.me/api/countries/id=-1")
        assert r.status_code == 404
        d = r.json()
        assert d == {"error": "-1 not found"}

    # -------
    # Years
    # -------

    # asserts expected number of all years in response
    def test_years_num_results(self):
        r = requests.get("https://burninup.me/api/years")
        assert r.status_code == 200
        d = r.json()
        assert len(d["years"]) == 141

    # asserts expected first object in all years response
    def test_years_list(self):
        r = requests.get("https://burninup.me/api/years")
        assert r.status_code == 200
        d = r.json()
        assert len(d["years"]) > 0
        assert d["years"][0] == {
            "co2": 290.8,
            "methane": 826.5,
            "nitrous_oxide": 275.8,
            "polar_ice": 27254250.0625,
            "sea_level": 0.0,
            "temp_anomaly": -0.23,
            "world_population": 1474528887,
            "year_id": 1880,
        }

    # asserts expected year response given id
    def test_years_id_instance(self):
        r = requests.get("https://burninup.me/api/years/id=2016")
        assert r.status_code == 200
        d = r.json()
        assert len(d["city_temperatures"]) == 10
        assert len(d["countries_emissions"]) == 10
        assert d["co2"] == 404.22
        assert d["methane"] == 1843.13
        assert d["nitrous_oxide"] == 328.9583333
        assert d["polar_ice"] == 21314735.8825
        assert d["sea_level"] == 9.033066323
        assert d["temp_anomaly"] == 1.23
        assert d["world_population"] == 7464022049
        assert d["year_id"] == 2016

    # asserts expected error response given invalid id
    def test_years_error_result(self):
        r = requests.get("https://burninup.me/api/years/id=-188")
        assert r.status_code == 404
        d = r.json()
        assert d == {"error": "-188 not found"}

    # -------
    # Cities
    # -------

    # asserts expected number of all cities in response
    def test_cities_num_results(self):
        r = requests.get("https://burninup.me/api/cities")
        assert r.status_code == 200
        d = r.json()
        assert len(d["cities"]) == 3057

    # asserts expected first object in all cities response
    def test_cities_list(self):
        r = requests.get("https://burninup.me/api/cities")
        assert r.status_code == 200
        d = r.json()
        assert len(d["cities"]) > 0
        assert d["cities"][0] == {
            "city_id": 3537,
            "city_name": "Bandar seri begawan",
            "country_id": 203,
            "country_name": "Brunei",
            "highest_temp": -1.0,
            "latitude": 4.8833333,
            "longitude": 114.9333333,
            "o3": 10.0,
            "pm10": 9.0,
            "pm25": 27.0,
            "population": -1,
            "year_highest": -1,
        }

    # asserts expected city response given id
    def test_cities_id_instance(self):
        r = requests.get("https://burninup.me/api/cities/id=512")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "city_id": 512,
            "city_name": "Asuncion",
            "country_id": 142,
            "country_name": "Paraguay",
            "highest_temp": 24.085,
            "latitude": -25.266667,
            "longitude": -57.666667,
            "o3": 14.0,
            "pm10": 8.0,
            "pm25": 31.0,
            "population": 508797,
            "year_highest": 2003,
        }

    # asserts expected error response given invalid id
    def test_cities_id_error_result(self):
        r = requests.get("https://burninup.me/api/cities/id=-1")
        assert r.status_code == 404
        d = r.json()
        assert d == {"error": "-1 not found"}


if __name__ == "__main__":  # pragma: no cover
    main()
