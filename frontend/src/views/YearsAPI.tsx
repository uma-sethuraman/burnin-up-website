import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GeneralYears from './GeneralYears';

function YearsAPI() {

  const [currentTest, setCurrentTest] = useState<Years>();

  useEffect(() => {
    axios
    .get("/api/years").then(r => {
      const years:Years = r.data as Years;
      setCurrentTest(years);
    })
  }, []);

  return (
     <div>
      <p> {JSON.stringify(currentTest)} </p>
    </div>
  );

}

export interface Years {
    years: Year[];
}

export interface Year {
    co2:          number;
    temp_anomaly: number;
    year_id:      number;
    year_name:    string;
}
