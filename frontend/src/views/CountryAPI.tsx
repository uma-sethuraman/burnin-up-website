import React, { useState, useEffect } from 'react';

function CountryAPI() {

  const [currentTest, setCurrentTest] = useState("hi");

  useEffect(() => {
      fetch('/api/country').then(res => res.json().then(data => {
        setCurrentTest(data.test)
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