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
        r = requests.get("https://burninup.me/api/countries")
        assert r.status_code == 200
        d = r.json()
        assert len(d["countries"]) == 211


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
            "country_region": "Latin America & Caribbean ",
            "recent_emissions": 8.463651329197651,
            "recent_emissions_year": 2018
        }

    def test_countries_instance(self):
        r = requests.get("https://burninup.me/api/countries/id=3")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "country_capital_city": "Luanda",
            "country_id": 3,
            "country_income": "Lower middle income",
            "country_iso2code": "AO",
            "country_iso3code": "AGO",
            "country_lat": "-8.81155",
            "country_long": "13.242",
            "country_name": "Angola",
            "country_region": "Sub-Saharan Africa ",
            "recent_emissions": 1.1209737471599153,
            "recent_emissions_year": 2018
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
            "world_population": 1474528887,
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
            "world_population": 6049205203,
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
        assert len(d["cities"]) == 260

    def test_cities_list(self):
        r = requests.get("https://burninup.me/api/cities")
        assert r.status_code == 200
        d = r.json()
        assert len(d["cities"]) > 0
        assert d["cities"][0] == {
            "city_id": 138,
            "city_name": "Luanda",
            "co": 0.0,
            "country_iso2code": "AO",
            "elevation": 0,
            "lat": -8.83682,
            "long": 13.23432,
            "o3": -1.0,
            "pm10": -1.0,
            "pm25": -1.0,
            "population": 2776168,
            "time_zone": "NaN"
        }

    def test_cities_id_instance(self):
        r = requests.get("https://burninup.me/api/cities/id=2240")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "city_id": 2240,
            "city_name": "Victoria",
            "co": 0.1,
            "country_iso2code": "MT",
            "elevation": 0,
            "lat": 36.04444,
            "long": 14.23972,
            "o3": 36.0,
            "pm10": 9.0,
            "pm25": 16.0,
            "population": 6596,
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
        r = requests.get("https://burninup.me/api/cities/name=Kabul")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "city_id": 87,
            "city_name": "Kabul",
            "co": 0.0,
            "country_iso2code": "AF",
            "elevation": 0,
            "lat": 34.52813,
            "long": 69.17233,
            "o3": 18.0,
            "pm10": 1.0,
            "pm25": 14.0,
            "population": 3043532,
            "time_zone": "NaN"
        }

    def test_cities_name_error_result(self):
        r = requests.get("https://burninup.me/api/cities/name=nooo")
        assert r.status_code == 404
        d = r.json()
        assert d == {
            "error": "nooo not found"
        }

    def test_relevant_cities_num_results(self):
        r = requests.get("https://burninup.me/api/cities/city_names")
        assert r.status_code == 200
        d = r.json()
        assert len(d["city_names"]) == 258

    def test_relevant_cities_list(self):
        r = requests.get("https://burninup.me/api/cities/city_names")
        assert r.status_code == 200
        d = r.json()
        assert len(d["city_names"]) > 0
        assert d["city_names"][0] == {
            "Oranjestad"
        }
        pass

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
            "city": "Jibuti",
            "city_id": 7127,
            "city_temp": 29.9397,
            "country": "Djibouti",
            "lat": 0.0,
            "long": 0.0,
            "year_id": 1,
            "year_name": 1880
        }

    # ------------------
    # Country Emissions
    # ------------------

    def test_country_emissions_num_results(self):
        r = requests.get("https://burninup.me/api/country_emissions")
        assert r.status_code == 200
        d = r.json()
        assert len(d["country_emissions_years"]) == 2075

    def test_country_emissions_list(self):
        r = requests.get("https://burninup.me/api/country_emissions")
        assert r.status_code == 200
        d = r.json()
        assert len(d["country_emissions_years"]) > 0
        assert d["country_emissions_years"][0] == {
            "code": "GBR",
            "country": "United Kingdom",
            "country_co2": 2.160510197310624,
            "countryid": 67,
            "year_id": 1,
            "year_name": "1800"
        }

    # ------------
    # City Years
    # ------------

    def test_city_years_results(self):
        r = requests.get("https://burninup.me/api/city_year")
        assert r.status_code == 200
        d = r.json()
        assert len(d["city_years"]) == 147

    def test_city_years_list(self):
        r = requests.get("https://burninup.me/api/city_year")
        assert r.status_code == 200
        d = r.json()
        assert len(d["city_years"]) > 0
        assert d["city_years"][0] == {
            "city": "Kabul",
            "temp": 21.02927272727273,
            "year": 1880,
            "year_id": 1
        }

    def test_city_year_name_instance(self):
        r = requests.get("https://burninup.me/api/city_year/name=Vienna")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "city": "Vienna",
            "temp": 52.93561643835609,
            "year": 2014,
            "year_id": 7
        }

    def test_city_year_name_error_result(self):
        r = requests.get("https://burninup.me/api/city_year/name=Austin")
        assert r.status_code == 404
        d = r.json()
        assert d == {
            "error": "Austin not found"
        }

    # ----------------------
    # Carbon Emission Years
    # ----------------------

    def test_carbon_emission_years_results(self):
        r = requests.get("https://burninup.me/api/country_year")
        assert r.status_code == 200
        d = r.json()
        assert len(d["country_year"]) == 179

    def test_carbon_emission_years_list(self):
        r = requests.get("https://burninup.me/api/country_year")
        assert r.status_code == 200
        d = r.json()
        assert len(d["country_year"]) > 0
        assert d["country_year"][0] == {
            "co2": 27.933465346534657,
            "country": "Aruba",
            "year": 2007,
            "year_id": 1
        }

    def test_carbon_emission_year_name_instance(self):
        r = requests.get("https://burninup.me/api/country_year/name=Albania")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "co2": 2.884633181126332,
            "country": "Albania",
            "year": 1979,
            "year_id": 4
        }

    def test_carbon_emission_year_name_error_result(self):
        r = requests.get("https://burninup.me/api/country_year/name=nooo")
        assert r.status_code == 404
        d = r.json()
        assert d == {
            "error": "nooo not found"
        }

    # ---------------
    # Capital Cities
    # ---------------

    def test_capital_city_country_id_instance(self):
        r = requests.get("https://burninup.me/api/1/capital_city_id")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "capital_city_id": 2
        }

    def test_capital_city_country_id_error_result(self):
        r = requests.get("https://burninup.me/api/-1/capital_city_id")
        assert r.status_code == 404
        d = r.json()
        assert d == {
            "error": "country id -1 not found"
        }

    # ---------------
    # Country Code
    # ---------------

    def test_country_code_city_id_instance(self):
        r = requests.get("https://burninup.me/api/138/country_code")
        assert r.status_code == 404
        d = r.json()
        assert d["country_code"] == {
            "id": 3,
            "name": "Angola"
        }

    def test_country_code_city_id_error_result(self):
        r = requests.get("https://burninup.me/api/-1/country_code")
        assert r.status_code == 404
        d = r.json()
        assert d["country_code"] == {
            "error": "city id -1 not found"
        }

if __name__ == "__main__":  # pragma: no cover
    main()
