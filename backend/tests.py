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
from cities import *
from countries import *
from years import *


class Tests(TestCase):

    # ---------
    # Countries
    # ---------

    def test_countries_num_results(self):
        r = requests.get("https://api.parkprotection.me/api/plants")
        assert r.status_code == 200
        d = r.json()
        assert len(d["countries"]) == 304


    def test_countries_all(self):
        r = requests.get("https://burninup.me/api/countries")
        assert r.status_code == 200
        d = r.json()
        assert len(d["countries"]) > 0
        assert d["countries"][0] == {
            "country_capital_city": "Oranjestad",
            "country_id": 1,
            "country_income": "High income",
            "country_iso2code": "AW",
            "country_iso3code": "ABW",
            "country_lat": "12.5167",
            "country_long": "-70.0167",
            "country_name": "Aruba",
            "country_region": "Latin America & Caribbean "
        }

    def test_countries_instance(self):
        r = requests.get("https://burninup.me/api/countries/id=3")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "country_capital_city": "",
            "country_id": 3,
            "country_income": "Aggregates",
            "country_iso2code": "A9",
            "country_iso3code": "AFR",
            "country_lat": "",
            "country_long": "",
            "country_name": "Africa",
            "country_region": "Aggregates"
        }

    def test_countries_error_result(self):
        r = requests.get("https://burninup.me/api/countries/id=-1")
        assert r.status_code == 404
        d = r.json()
        assert d == {
            "error": "-1 not found"
        }

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
            "year_id": 1,
            "year_name": "1880"
        }

    def test_years_instance(self):
        r = requests.get("https://burninup.me/api/years/name=1999")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "co2": 368.38,
            "methane": 1698.7,
            "nitrous_oxide": 314.6,
            "polar_ice": 24487155.60916667,
            "sea_level": 6.92772163,
            "temp_anomaly": 0.49,
            "year_id": 120,
            "year_name": "1999"
        }
    
    def test_years_error_result(self):
        r = requests.get("https://burninup.me/api/years/name=-188")
        assert r.status_code == 404
        d = r.json()
        assert d == {
            "error": "-188 not found"
        }

    # -------
    # Cities
    # -------

    def test_cities_num_results(self):
        r = requests.get("https://burninup.me/api/cities")
        assert r.status_code == 200
        d = r.json()
        assert len(d["cities"]) == 7079

    def test_cities_list(self):
        r = requests.get("https://burninup.me/api/cities")
        assert r.status_code == 200
        d = r.json()
        assert len(d["cities"]) > 0
        assert d["cities"][0] == {
            "city_id": 1,
            "city_name": "Noord",
            "co": null,
            "country_iso2code": "AW",
            "elevation": 0,
            "lat": 12.56596,
            "long": -70.03198,
            "o3": 0.0,
            "pm10": 0.0,
            "pm25": 0.0,
            "population": 0,
            "time_zone": "NaN"
        }

    def test_cities_id_instance(self):
        r = requests.get("https://burninup.me/api/cities/id=3")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "city_id": 3,
            "city_name": "Paradera",
            "co": null,
            "country_iso2code": "AW",
            "elevation": 0,
            "lat": 12.5351,
            "long": -70.00688,
            "o3": 0.0,
            "pm10": 0.0,
            "pm25": 0.0,
            "population": 12000,
            "time_zone": "NaN"
        }

    def test_cities_id_error_result(self):
        r = requests.get("https://burninup.me/api/cities/id=-1")
        assert r.status_code == 404
        d = r.json()
        assert d == {
            "error": "-1 not found"
        }

    def test_cities_name_instance(self):
        r = requests.get("https://burninup.me/api/cities/name=Noord")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "city_id": 1,
            "city_name": "Noord",
            "co": null,
            "country_iso2code": "AW",
            "elevation": 0,
            "lat": 12.56596,
            "long": -70.03198,
            "o3": 0.0,
            "pm10": 0.0,
            "pm25": 0.0,
            "population": 0,
            "time_zone": "NaN"
        }

    def test_cities_name_error_result(self):
        r = requests.get("https://burninup.me/api/cities/name=nooo")
        assert r.status_code == 404
        d = r.json()
        assert d == {
            "error": "nooo not found"
        }

    # ------------------
    # City Temperatures
    # ------------------

    def test_city_temps_num_results(self):
        r = requests.get("https://burninup.me/api/city_temperatures")
        assert r.status_code == 200
        d = r.json()
        assert len(d["city_temperatures_years"]) == 1410

    def test_city_temps_list(self):
        r = requests.get("https://burninup.me/api/city_temperatures")
        assert r.status_code == 200
        d = r.json()
        assert len(d["city_temperatures_years"]) > 0
        assert d["city_temperatures_years"][0] == {
            "city": "Nandyal",
            "city_temp": 29.32045454545455,
            "country": "India",
            "lat": 15.4776876,
            "long": 78.487285,
            "year_id": 9,
            "year_name": 1880
        }

    # ------------------
    # Country Emissions
    # ------------------

    def test_country_emissions_num_results(self):
        r = requests.get("https://burninup.me/api/country_emissions")
        assert r.status_code == 200
        d = r.json()
        assert len(d["country_emissions_years"]) == 2077

    def test_country_emissions_list(self):
        r = requests.get("https://burninup.me/api/country_emissions")
        assert r.status_code == 200
        d = r.json()
        assert len(d["country_emissions_years"]) > 0
        assert d["country_emissions_years"][0] == {
            "code": "GBR",
            "country": "United Kingdom",
            "country_co2": 2.160510197310624,
            "year_id": 1,
            "year_name": "1800"
        }

if __name__ == "__main__":  # pragma: no cover
    main()
