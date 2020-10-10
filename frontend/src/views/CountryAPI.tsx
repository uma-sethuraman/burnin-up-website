import React, { useState, useEffect } from 'react';

function CountryAPI() {

  const [currentTest, setCurrentTest] = useState("help");

  useEffect(() => {
      fetch('/api/country').then(res => res.json().then(data => {
        setCurrentTest(data.country_id)
      })
    );
  }, []);

  return (
     <div className="App">
      <p> {currentTest} </p>
    </div>
  );

}
export default CountryAPI;