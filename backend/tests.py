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

sys.path.append(os.path.join(os.path.dirname(__file__), "../scraped_data"))
# from cities import *
# from countries import *
# from years import *


class Tests(TestCase):

    # ---------
    # Countries
    # ---------

    def test_countries_num_results(self):
        r = requests.get("https://burninup.me/api/countries")
        assert r.status_code == 200
        d = r.json()
        assert len(d["countries"]) == 185

    def test_countries_all(self):
        r = requests.get("https://burninup.me/api/countries")
        assert r.status_code == 200
        d = r.json()
        assert len(d["countries"]) > 0
        assert d["countries"][0] == {
            "capital_city_id": 3492,
            "country_capital_city": "Oranjestad", 
            "country_id": 1, 
            "country_iso2code": "AW", 
            "country_iso3code": "ABW", 
            "country_name": "Aruba", 
            "country_population": 107394, 
            "country_region": "Americas", 
            "high_year": 2007, 
            "highest_emission": 27.933465346534657,
            "income_level": "High income", 
            "lat": 13, 
            "long": -70, 
            "recent_emissions": 8.463651329197651
        }

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
            "recent_emissions": 1.1209737471599153
        }

    def test_countries_error_result(self):
        r = requests.get("https://burninup.me/api/countries/id=-1")
        assert r.status_code == 404
        d = r.json()
        assert d == {"error": "-1 not found"}

    # -------
    # Years
    # -------

    def test_years_num_results(self):
        r = requests.get("https://burninup.me/api/years")
        assert r.status_code == 200
        d = r.json()
        assert len(d["years"]) == 141

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
            "year_id": 1880
        }

    def test_years_id_instance(self):
        r = requests.get("https://burninup.me/api/years/id=2016")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "city_temperatures": [
            {
            "city": "Niamey", 
            "city_id": 3487, 
            "city_temp": 84.55, 
            "country": "Nigeria", 
            "latitude": 13.5166667, 
            "longitude": 2.1166667, 
            "parent_year_id": 2016, 
            "year_id": 1361, 
            "year_name": 2016
            }, 
            {
            "city": "Chennai", 
            "city_id": 3530, 
            "city_temp": 83.41803279, 
            "country": "India", 
            "latitude": 13.083333, 
            "longitude": 80.283333, 
            "parent_year_id": 2016, 
            "year_id": 1362, 
            "year_name": 2016
            }, 
            {
            "city": "Dubai", 
            "city_id": 1079, 
            "city_temp": 83.03442623, 
            "country": "United Arab Emirates", 
            "latitude": 25.258172, 
            "longitude": 55.304717, 
            "parent_year_id": 2016, 
            "year_id": 1363, 
            "year_name": 2016
            }, 
            {
            "city": "Doha", 
            "city_id": 1064, 
            "city_temp": 82.03060109, 
            "country": "Qatar", 
            "latitude": 25.286667, 
            "longitude": 51.533333, 
            "parent_year_id": 2016, 
            "year_id": 1364, 
            "year_name": 2016
            }, 
            {
            "city": "Abu Dhabi", 
            "city_id": 375, 
            "city_temp": 81.84016393, 
            "country": "United Arab Emirates", 
            "latitude": 24.466667, 
            "longitude": 54.366667, 
            "parent_year_id": 2016, 
            "year_id": 1365, 
            "year_name": 2016
            }, 
            {
            "city": "Bombay", 
            "city_id": 709, 
            "city_temp": 81.83934426, 
            "country": "India", 
            "latitude": 18.975, 
            "longitude": 72.825833, 
            "parent_year_id": 2016, 
            "year_id": 1366, 
            "year_name": 2016
            }, 
            {
            "city": "Manila", 
            "city_id": 1978, 
            "city_temp": 81.66202186, 
            "country": "Philippines", 
            "latitude": 14.6042, 
            "longitude": 120.9822, 
            "parent_year_id": 2016, 
            "year_id": 1367, 
            "year_name": 2016
            }, 
            {
            "city": "Kuala Lumpur", 
            "city_id": 3485, 
            "city_temp": 81.46775956, 
            "country": "Malaysia", 
            "latitude": 3.166667, 
            "longitude": 101.7, 
            "parent_year_id": 2016, 
            "year_id": 1368, 
            "year_name": 2016
            }, 
            {
            "city": "Singapore", 
            "city_id": 2800, 
            "city_temp": 81.30300546, 
            "country": "Singapore", 
            "latitude": 1.2930556, 
            "longitude": 103.8558333, 
            "parent_year_id": 2016, 
            "year_id": 1369, 
            "year_name": 2016
            }, 
            {
            "city": "Managua", 
            "city_id": 1968, 
            "city_temp": 81.20218579, 
            "country": "Nicaragua", 
            "latitude": 12.1508333, 
            "longitude": -86.2683333, 
            "parent_year_id": 2016, 
            "year_id": 1370, 
            "year_name": 2016
            }
        ], 
        "co2": 404.22, 
        "countries_emissions": [
            {
            "code": "QAT", 
            "country": "Qatar", 
            "country_co2": 38.51005261122005, 
            "country_id": 144, 
            "parent_year_id": 2016, 
            "year_id": 1361, 
            "year_name": "2016"
            }, 
            {
            "code": "CUW", 
            "country": "Curacao", 
            "country_co2": 33.45391304347826, 
            "country_id": 200, 
            "parent_year_id": 2016, 
            "year_id": 1362, 
            "year_name": "2016"
            }, 
            {
            "code": "TTO", 
            "country": "Trinidad and Tobago", 
            "country_co2": 31.750874794295548, 
            "country_id": 172, 
            "parent_year_id": 2016, 
            "year_id": 1363, 
            "year_name": "2016"
            }, 
            {
            "code": "KWT", 
            "country": "Kuwait", 
            "country_co2": 24.780630801139644, 
            "country_id": 91, 
            "parent_year_id": 2016, 
            "year_id": 1364, 
            "year_name": "2016"
            }, 
            {
            "code": "BHR", 
            "country": "Bahrain", 
            "country_co2": 22.061504237507247, 
            "country_id": 19, 
            "parent_year_id": 2016, 
            "year_id": 1365, 
            "year_name": "2016"
            }, 
            {
            "code": "ARE", 
            "country": "United Arab Emirates", 
            "country_co2": 21.7042830237086, 
            "country_id": 6, 
            "parent_year_id": 2016, 
            "year_id": 1366, 
            "year_name": "2016"
            }, 
            {
            "code": "SAU", 
            "country": "Saudi Arabia", 
            "country_co2": 19.466424391248893, 
            "country_id": 147, 
            "parent_year_id": 2016, 
            "year_id": 1367, 
            "year_name": "2016"
            }, 
            {
            "code": "NCL", 
            "country": "New Caledonia", 
            "country_co2": 19.386049521674952, 
            "country_id": 124, 
            "parent_year_id": 2016, 
            "year_id": 1368, 
            "year_name": "2016"
            }, 
            {
            "code": "SXM", 
            "country": "Sint Maarten (Dutch part)", 
            "country_co2": 18.58809756097561, 
            "country_id": 202, 
            "parent_year_id": 2016, 
            "year_id": 1369, 
            "year_name": "2016"
            }, 
            {
            "code": "BRN", 
            "country": "Brunei", 
            "country_co2": 17.962194351364293, 
            "country_id": 203, 
            "parent_year_id": 2016, 
            "year_id": 1370, 
            "year_name": "2016"
            }
        ], 
        "methane": 1843.13, 
        "nitrous_oxide": 328.9583333, 
        "polar_ice": 21314735.8825, 
        "sea_level": 9.033066323, 
        "temp_anomaly": 1.23, 
        "world_population": 7464022049, 
        "year_id": 2016
        }

    def test_years_error_result(self):
        r = requests.get("https://burninup.me/api/years/id=-188")
        assert r.status_code == 404
        d = r.json()
        assert d == {"error": "-188 not found"}

    # -------
    # Cities
    # -------

    def test_cities_num_results(self):
        r = requests.get("https://burninup.me/api/cities")
        assert r.status_code == 200
        d = r.json()
        assert len(d["cities"]) == 3055

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
            "year_highest": -1
        }

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
            "year_highest": 2003
        }

    def test_cities_id_error_result(self):
        r = requests.get("https://burninup.me/api/cities/id=-1")
        assert r.status_code == 404
        d = r.json()
        assert d == {"error": "-1 not found"}


if __name__ == "__main__":  # pragma: no cover
    main()
