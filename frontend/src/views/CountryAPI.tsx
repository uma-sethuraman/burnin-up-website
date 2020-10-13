import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Countries';


export function getCountries():Countries{
  //countries container
  let countriesContainer:Countries = {countries:[]};

  axios.get("/api/countries").then(r => {
    
    countriesContainer = r.data as Countries;
    
  });

  return countriesContainer;
}

//find a better name!!NOT AN API


export interface Countries {
  countries: Country[];
}

export interface Country {
  country_capital_city: string;
  country_id:           number;
  country_income:       CountryIncome;
  country_iso2code:     string;
  country_iso3code:     string;
  country_name:         string;
  country_region:       CountryRegion;
}

export enum CountryIncome {
  Aggregates = "Aggregates",
  HighIncome = "High income",
  LowIncome = "Low income",
  LowerMiddleIncome = "Lower middle income",
  UpperMiddleIncome = "Upper middle income",
}

export enum CountryRegion {
  Aggregates = "Aggregates",
  EastAsiaPacific = "East Asia & Pacific",
  EuropeCentralAsia = "Europe & Central Asia",
  LatinAmericaCaribbean = "Latin America & Caribbean ",
  MiddleEastNorthAfrica = "Middle East & North Africa",
  NorthAmerica = "North America",
  SouthAsia = "South Asia",
  SubSaharanAfrica = "Sub-Saharan Africa ",
}

