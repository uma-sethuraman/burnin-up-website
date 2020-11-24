from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

###### MODELS ######

# Country Model
class Country1(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    capital_city_id = db.Column(db.Integer)
    country_iso2code = db.Column(db.String())
    country_iso3code = db.Column(db.String())
    highest_emission = db.Column(db.Float)
    recent_emissions = db.Column(db.Float)
    country_population = db.Column(db.Integer)
    country_capital_city = db.Column(db.String())
    income_level = db.Column(db.String())
    country_region = db.Column(db.String())
    lat = db.Column(db.Integer)
    long = db.Column(db.Integer)
    cities = db.relationship("City1", backref="country1")
    high_year = db.Column(db.Integer)


# Year model
class Year1(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    temp_anomaly = db.Column(db.Float)
    co2 = db.Column(db.Float)
    methane = db.Column(db.Float)
    nitrous_oxide = db.Column(db.Float)
    polar_ice = db.Column(db.Float)
    sea_level = db.Column(db.Float)
    world_population = db.Column(db.BigInteger)
    countries_emissions = db.relationship(
        "CountryEmissionsPerYear",
        cascade="all,delete-orphan",
        single_parent=True,
        backref=db.backref("year1", lazy="joined"),
    )
    city_temperatures = db.relationship(
        "CityTempPerYear",
        cascade="all,delete-orphan",
        single_parent=True,
        backref=db.backref("year1", lazy="joined"),
    )


# City model
class City1(db.Model):
    city_id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String())
    country_id = db.Column(db.Integer, db.ForeignKey("country1.country_id"))
    country_name = db.Column(db.String())
    country = db.relationship("Country1", backref="city1")
    country_iso2 = db.Column(db.String())
    population = db.Column(db.Integer)
    o3 = db.Column(db.Float)
    pm10 = db.Column(db.Float)
    pm25 = db.Column(db.Float)
    highest_temp = db.Column(db.Float)
    year_highest = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)


# Country Emissions Per Year Model
# Creates top countries contributing to climate change per year api request
class CountryEmissionsPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    country = db.Column(db.String())
    country_id = db.Column(db.Integer)
    code = db.Column(db.String())
    country_co2 = db.Column(db.Float)
    parent_year_id = db.Column(db.Integer, db.ForeignKey("year1.year_id"))


# Avg City Temp Per Year Model
# Creates top cities contributing to climate change per year api request
class CityTempPerYear(db.Model):
    year_id = db.Column(db.Integer, primary_key=True)
    year_name = db.Column(db.Integer)
    city = db.Column(db.String())
    city_id = db.Column(db.Integer)
    country = db.Column(db.String())
    city_temp = db.Column(db.Float)
    parent_year_id = db.Column(db.Integer, db.ForeignKey("year1.year_id"))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
