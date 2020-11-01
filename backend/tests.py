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
        assert len(d["countries"]) == 217

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
            "recent_emissions_year": 2018,
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
            "recent_emissions_year": 2018,
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
            "city_temperatures": [
                {
                    "city": "Jibuti",
                    "city_id": 1568,
                    "city_temp": 29.9397,
                    "country": "Djibouti",
                    "parent_year_id": 1,
                    "year_id": 1,
                    "year_name": 1880
                },
                {
                    "city": "Palakkad",
                    "city_id": 2307,
                    "city_temp": 29.70272727,
                    "country": "India",
                    "parent_year_id": 1,
                    "year_id": 2,
                    "year_name": 1880
                },
                {
                    "city": "Jiddah",
                    "city_id": 1569,
                    "city_temp": 29.57081818,
                    "country": "Saudi Arabia",
                    "parent_year_id": 1,
                    "year_id": 3,
                    "year_name": 1880
                },
                {
                    "city": "Gudivada",
                    "city_id": 1300,
                    "city_temp": 29.53454545,
                    "country": "India",
                    "parent_year_id": 1,
                    "year_id": 4,
                    "year_name": 1880
                },
                {
                    "city": "Vijayawada",
                    "city_id": 3132,
                    "city_temp": 29.48509091,
                    "country": "India",
                    "parent_year_id": 1,
                    "year_id": 5,
                    "year_name": 1880
                },
                {
                    "city": "Khartoum",
                    "city_id": 1691,
                    "city_temp": 29.45272727,
                    "country": "Sudan",
                    "parent_year_id": 1,
                    "year_id": 6,
                    "year_name": 1880
                },
                {
                    "city": "Abakaliki",
                    "city_id": 3519,
                    "city_temp": 29.38236364,
                    "country": "Nigeria",
                    "parent_year_id": 1,
                    "year_id": 7,
                    "year_name": 1880
                },
                {
                    "city": "Ambon",
                    "city_id": 437,
                    "city_temp": 29.35572727,
                    "country": "Indonesia",
                    "parent_year_id": 1,
                    "year_id": 8,
                    "year_name": 1880
                },
                {
                    "city": "Nandyal",
                    "city_id": 2147,
                    "city_temp": 29.32045455,
                    "country": "India",
                    "parent_year_id": 1,
                    "year_id": 9,
                    "year_name": 1880
                },
                {
                    "city": "Tirunelveli",
                    "city_id": 3001,
                    "city_temp": 29.00336364,
                    "country": "India",
                    "parent_year_id": 1,
                    "year_id": 10,
                    "year_name": 1880
                }
            ],
            "co2": 290.8,
            "countries_emissions": [
                {
                    "code": "GBR",
                    "country": "United Kingdom",
                    "country_co2": 9.631286086761355,
                    "country_id": 62,
                    "parent_year_id": 1,
                    "year_id": 1,
                    "year_name": "1880"
                },
                {
                    "code": "BEL",
                    "country": "Belgium",
                    "country_co2": 5.457718090467675,
                    "country_id": 14,
                    "parent_year_id": 1,
                    "year_id": 2,
                    "year_name": "1880"
                },
                {
                    "code": "AUT",
                    "country": "Austria",
                    "country_co2": 4.780137715119231,
                    "country_id": 11,
                    "parent_year_id": 1,
                    "year_id": 3,
                    "year_name": "1880"
                },
                {
                    "code": "USA",
                    "country": "United States",
                    "country_co2": 3.865269740428362,
                    "country_id": 180,
                    "parent_year_id": 1,
                    "year_id": 4,
                    "year_name": "1880"
                },
                {
                    "code": "DEU",
                    "country": "Germany",
                    "country_co2": 2.853700809232275,
                    "country_id": 43,
                    "parent_year_id": 1,
                    "year_id": 5,
                    "year_name": "1880"
                },
                {
                    "code": "NLD",
                    "country": "Netherlands",
                    "country_co2": 1.979704025102668,
                    "country_id": 128,
                    "parent_year_id": 1,
                    "year_id": 6,
                    "year_name": "1880"
                },
                {
                    "code": "FRA",
                    "country": "France",
                    "country_co2": 1.9518329447041287,
                    "country_id": 60,
                    "parent_year_id": 1,
                    "year_id": 7,
                    "year_name": "1880"
                },
                {
                    "code": "POL",
                    "country": "Poland",
                    "country_co2": 1.3395208887954342,
                    "country_id": 140,
                    "parent_year_id": 1,
                    "year_id": 8,
                    "year_name": "1880"
                },
                {
                    "code": "NZL",
                    "country": "New Zealand",
                    "country_co2": 1.298557611396553,
                    "country_id": 132,
                    "parent_year_id": 1,
                    "year_id": 9,
                    "year_name": "1880"
                },
                {
                    "code": "CAN",
                    "country": "Canada",
                    "country_co2": 1.2000891776663158,
                    "country_id": 30,
                    "parent_year_id": 1,
                    "year_id": 10,
                    "year_name": "1880"
                }
            ],
            "methane": 826.5,
            "nitrous_oxide": 275.8,
            "polar_ice": 27254250.0625,
            "sea_level": 0.1523531336,
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
            "city_temperatures": [
                {
                    "city": "Niamey",
                    "city_id": 3487,
                    "city_temp": 30.06041667,
                    "country": "Niger",
                    "parent_year_id": 120,
                    "year_id": 1191,
                    "year_name": 1999
                },
                {
                    "city": "Umm Durman",
                    "city_id": 3088,
                    "city_temp": 30.05608333,
                    "country": "Sudan",
                    "parent_year_id": 120,
                    "year_id": 1192,
                    "year_name": 1999
                },
                {
                    "city": "Khartoum",
                    "city_id": 1691,
                    "city_temp": 30.03583333,
                    "country": "Sudan",
                    "parent_year_id": 120,
                    "year_id": 1193,
                    "year_name": 1999
                },
                {
                    "city": "Kassala",
                    "city_id": 1658,
                    "city_temp": 29.771,
                    "country": "Sudan",
                    "parent_year_id": 120,
                    "year_id": 1194,
                    "year_name": 1999
                },
                {
                    "city": "Jibuti",
                    "city_id": 1568,
                    "city_temp": 29.75316667,
                    "country": "Djibouti",
                    "parent_year_id": 120,
                    "year_id": 1195,
                    "year_name": 1999
                },
                {
                    "city": "Rabak",
                    "city_id": 2504,
                    "city_temp": 29.71891667,
                    "country": "Sudan",
                    "parent_year_id": 120,
                    "year_id": 1196,
                    "year_name": 1999
                },
                {
                    "city": "Sokoto",
                    "city_id": 3520,
                    "city_temp": 29.47766667,
                    "country": "Nigeria",
                    "parent_year_id": 120,
                    "year_id": 1197,
                    "year_name": 1999
                },
                {
                    "city": "Kusti",
                    "city_id": 1778,
                    "city_temp": 29.42166667,
                    "country": "Sudan",
                    "parent_year_id": 120,
                    "year_id": 1198,
                    "year_name": 1999
                },
                {
                    "city": "Madras",
                    "city_id": 1940,
                    "city_temp": 29.397,
                    "country": "India",
                    "parent_year_id": 120,
                    "year_id": 1199,
                    "year_name": 1999
                },
                {
                    "city": "Tiruvottiyur",
                    "city_id": 3005,
                    "city_temp": 29.397,
                    "country": "India",
                    "parent_year_id": 120,
                    "year_id": 1200,
                    "year_name": 1999
                }
            ],
            "co2": 368.38,
            "countries_emissions": [
                {
                    "code": "QAT",
                    "country": "Qatar",
                    "country_co2": 54.861557079056674,
                    "country_id": 144,
                    "parent_year_id": 120,
                    "year_id": 1191,
                    "year_name": "1999"
                },
                {
                    "code": "BHR",
                    "country": "Bahrain",
                    "country_co2": 28.23879640292875,
                    "country_id": 19,
                    "parent_year_id": 120,
                    "year_id": 1192,
                    "year_name": "1999"
                },
                {
                    "code": "KWT",
                    "country": "Kuwait",
                    "country_co2": 27.572847410000854,
                    "country_id": 91,
                    "parent_year_id": 120,
                    "year_id": 1193,
                    "year_name": "1999"
                },
                {
                    "code": "ARE",
                    "country": "United Arab Emirates",
                    "country_co2": 26.143839562464137,
                    "country_id": 6,
                    "parent_year_id": 120,
                    "year_id": 1194,
                    "year_name": "1999"
                },
                {
                    "code": "USA",
                    "country": "United States",
                    "country_co2": 20.928241994753535,
                    "country_id": 180,
                    "parent_year_id": 120,
                    "year_id": 1195,
                    "year_name": "1999"
                },
                {
                    "code": "LUX",
                    "country": "Luxembourg",
                    "country_co2": 18.887397782336585,
                    "country_id": 99,
                    "parent_year_id": 120,
                    "year_id": 1196,
                    "year_name": "1999"
                },
                {
                    "code": "AUS",
                    "country": "Australia",
                    "country_co2": 18.31293039211197,
                    "country_id": 10,
                    "parent_year_id": 120,
                    "year_id": 1197,
                    "year_name": "1999"
                },
                {
                    "code": "CAN",
                    "country": "Canada",
                    "country_co2": 18.11500531185932,
                    "country_id": 30,
                    "parent_year_id": 120,
                    "year_id": 1198,
                    "year_name": "1999"
                },
                {
                    "code": "TTO",
                    "country": "Trinidad and Tobago",
                    "country_co2": 17.78225714966443,
                    "country_id": 172,
                    "parent_year_id": 120,
                    "year_id": 1199,
                    "year_name": "1999"
                },
                {
                    "code": "FRO",
                    "country": "Faeroe Islands",
                    "country_co2": 13.70017391304348,
                    "country_id": 197,
                    "parent_year_id": 120,
                    "year_id": 1200,
                    "year_name": "1999"
                }
            ],
            "methane": 1698.7,
            "nitrous_oxide": 314.6,
            "polar_ice": 24487155.60916667,
            "sea_level": 6.92772163,
            "temp_anomaly": 0.49,
            "world_population": 6049205203,
            "year_id": 120,
            "year_name": "1999"
        }

    def test_years_id_instance(self):
        r = requests.get("https://burninup.me/api/years/id=512")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "city_temperatures": [
            {
                "city": "Niamey",
                "city_id": 3487,
                "city_temp": 29.01616667,
                "country": "Niger",
                "parent_year_id": 77,
                "year_id": 761,
                "year_name": 1956
            },
            {
                "city": "Khartoum",
                "city_id": 1691,
                "city_temp": 28.97258333,
                "country": "Sudan",
                "parent_year_id": 77,
                "year_id": 762,
                "year_name": 1956
            },
            {
                "city": "Kassala",
                "city_id": 1658,
                "city_temp": 28.84341667,
                "country": "Sudan",
                "parent_year_id": 77,
                "year_id": 763,
                "year_name": 1956
            },
            {
                "city": "Umm Durman",
                "city_id": 3088,
                "city_temp": 28.8065,
                "country": "Sudan",
                "parent_year_id": 77,
                "year_id": 764,
                "year_name": 1956
            },
            {
                "city": "Jibuti",
                "city_id": 1568,
                "city_temp": 28.78616667,
                "country": "Djibouti",
                "parent_year_id": 77,
                "year_id": 765,
                "year_name": 1956
            },
            {
                "city": "Mopti",
                "city_id": 2087,
                "city_temp": 28.68633333,
                "country": "Mali",
                "parent_year_id": 77,
                "year_id": 766,
                "year_name": 1956
            },
            {
                "city": "Rabak",
                "city_id": 2504,
                "city_temp": 28.46708333,
                "country": "Sudan",
                "parent_year_id": 77,
                "year_id": 767,
                "year_name": 1956
            },
            {
                "city": "Alandur",
                "city_id": 408,
                "city_temp": 28.42933333,
                "country": "India",
                "parent_year_id": 77,
                "year_id": 768,
                "year_name": 1956
            },
            {
                "city": "Ambattur",
                "city_id": 436,
                "city_temp": 28.42933333,
                "country": "India",
                "parent_year_id": 77,
                "year_id": 769,
                "year_name": 1956
            },
            {
                "city": "Pallavaram",
                "city_id": 2313,
                "city_temp": 28.42933333,
                "country": "India",
                "parent_year_id": 77,
                "year_id": 770,
                "year_name": 1956
            }
        ],
        "co2": 314.3,
        "countries_emissions": [
            {
                "code": "FLK",
                "country": "Falkland Islands",
                "country_co2": 155.72,
                "country_id": 201,
                "parent_year_id": 77,
                "year_id": 761,
                "year_name": "1956"
            },
            {
                "code": "LUX",
                "country": "Luxembourg",
                "country_co2": 33.775635179153106,
                "country_id": 99,
                "parent_year_id": 77,
                "year_id": 762,
                "year_name": "1956"
            },
            {
                "code": "NCL",
                "country": "New Caledonia",
                "country_co2": 16.88626086956522,
                "country_id": 124,
                "parent_year_id": 77,
                "year_id": 763,
                "year_name": "1956"
            },
            {
                "code": "USA",
                "country": "United States",
                "country_co2": 16.32983666545716,
                "country_id": 180,
                "parent_year_id": 77,
                "year_id": 764,
                "year_name": "1956"
            },
            {
                "code": "QAT",
                "country": "Qatar",
                "country_co2": 13.306105263157894,
                "country_id": 144,
                "parent_year_id": 77,
                "year_id": 765,
                "year_name": "1956"
            },
            {
                "code": "CAN",
                "country": "Canada",
                "country_co2": 11.779140428172507,
                "country_id": 30,
                "parent_year_id": 77,
                "year_id": 766,
                "year_name": "1956"
            },
            {
                "code": "GBR",
                "country": "United Kingdom",
                "country_co2": 11.196691140326925,
                "country_id": 62,
                "parent_year_id": 77,
                "year_id": 767,
                "year_name": "1956"
            },
            {
                "code": "BEL",
                "country": "Belgium",
                "country_co2": 10.825231044509056,
                "country_id": 14,
                "parent_year_id": 77,
                "year_id": 768,
                "year_name": "1956"
            },
            {
                "code": "DEU",
                "country": "Germany",
                "country_co2": 10.66487080207652,
                "country_id": 43,
                "parent_year_id": 77,
                "year_id": 769,
                "year_name": "1956"
            },
            {
                "code": "VEN",
                "country": "Venezuela",
                "country_co2": 9.271822019395321,
                "country_id": 205,
                "parent_year_id": 77,
                "year_id": 770,
                "year_name": "1956"
            }
        ],
        "methane": 1161.9,
        "nitrous_oxide": 290.6,
        "polar_ice": 27491864.7,
        "sea_level": 3.763779524,
        "temp_anomaly": -0.17,
        "world_population": 2807246148,
        "year_id": 77,
        "year_name": "1956"
        }

    def test_years_error_result(self):
        r = requests.get("https://burninup.me/api/years/name=-188")
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
        assert len(d["cities"]) == 3047

    def test_cities_list(self):
        r = requests.get("https://burninup.me/api/cities")
        assert r.status_code == 200
        d = r.json()
        assert len(d["cities"]) > 0
        assert d["cities"][0] == {
            "city_id": 361, 
            "city_name": "Arhus", 
            "country": {
                "country_id": 46, 
                "country_name": "Denmark"
            }, 
            "highest_temp": 9.673833333, 
            "o3": 26.0, 
            "pm10": 11.0, 
            "pm25": 22.0, 
            "population": 226716, 
            "year_highest": 1990
        }

    def test_cities_id_instance(self):
        r = requests.get("https://burninup.me/api/cities/id=512")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "city_id": 512, 
            "city_name": "Asuncion", 
            "country": {
                "country_id": 142, 
                "country_name": "Paraguay"
            }, 
            "highest_temp": 24.085, 
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


    ########## DELETE BY THE END OF PHASE 3 ##########

    # ------------------
    # City Temperatures
    # ------------------

    def test_city_temps_num_results(self):
        r = requests.get("https://burninup.me/api/city_temperatures")
        assert r.status_code == 200
        d = r.json()
        assert len(d["city_temperatures_years"]) == 2820

    def test_city_temps_list(self):
        r = requests.get("https://burninup.me/api/city_temperatures")
        assert r.status_code == 200
        d = r.json()
        assert len(d["city_temperatures_years"]) > 0
        assert d["city_temperatures_years"][0] == {
            "city": "Tirunelveli",
            "city_id": 7086,
            "city_temp": 29.00336363636364,
            "country": "India",
            "lat": 8.713912600000002,
            "long": 77.7566523,
            "year_id": 10,
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
            "year_name": "1800",
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
            "year_id": 1,
        }

    def test_city_year_name_instance(self):
        r = requests.get("https://burninup.me/api/city_year/name=Vienna")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "city": "Vienna",
            "temp": 52.93561643835609,
            "year": 2014,
            "year_id": 7,
        }

    def test_city_year_name_error_result(self):
        r = requests.get("https://burninup.me/api/city_year/name=Austin")
        assert r.status_code == 404
        d = r.json()
        assert d == {"error": "Austin not found"}

    # ----------------------
    # Carbon Emission Years
    # ----------------------

    def test_carbon_emission_years_results(self):
        r = requests.get("https://burninup.me/api/country_year")
        assert r.status_code == 200
        d = r.json()
        assert len(d["country_year"]) == 185

    def test_carbon_emission_years_list(self):
        r = requests.get("https://burninup.me/api/country_year")
        assert r.status_code == 200
        d = r.json()
        assert len(d["country_year"]) > 0
        assert d["country_year"][0] == {
            "co2": 27.933465346534657,
            "country": "Aruba",
            "year": 2007,
            "year_id": 1,
        }

    def test_carbon_emission_year_name_instance(self):
        r = requests.get("https://burninup.me/api/country_year/name=Albania")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "co2": 2.884633181126332,
            "country": "Albania",
            "year": 1979,
            "year_id": 4,
        }

    def test_carbon_emission_year_name_error_result(self):
        r = requests.get("https://burninup.me/api/country_year/name=nooo")
        assert r.status_code == 404
        d = r.json()
        assert d == {"error": "nooo not found"}

    # ---------------
    # Capital Cities
    # ---------------

    def test_capital_city_country_id_instance(self):
        r = requests.get("https://burninup.me/api/1/capital_city_id")
        assert r.status_code == 200
        d = r.json()
        assert d == {"capital_city_id": 2}

    def test_capital_city_country_id_error_result(self):
        r = requests.get("https://burninup.me/api/-1/capital_city_id")
        assert r.status_code == 404
        d = r.json()
        assert d == {"error": "country id -1 not found"}

    # ---------------
    # Country Code
    # ---------------

    def test_country_code_city_id_instance(self):
        r = requests.get("https://burninup.me/api/138/country_code")
        assert r.status_code == 200
        d = r.json()
        assert d["country_code"] == {"id": 3, "name": "Angola"}

    def test_country_code_city_id_error_result(self):
        r = requests.get("https://burninup.me/api/-1/country_code")
        assert r.status_code == 404
        d = r.json()
        assert d == {"error": "city id -1 not found"}


if __name__ == "__main__":  # pragma: no cover
    main()
