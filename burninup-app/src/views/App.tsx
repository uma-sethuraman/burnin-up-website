import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          "I'm burning up, burning up for you baby." - Jonas Brothers (2008)
        </h1>
        <Button variant="primary" href = "/about">About Us</Button>{' '}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
  );
}

export default App;
