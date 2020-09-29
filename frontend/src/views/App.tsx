import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1> Burnin Up </h1>
        <p>As the Jonas Brothers would say, the world is "burning up, burning up for you baby." </p>
        <h2>(this meme is how some of y'all be acting, but the world is in fact NOT fine)</h2>
        <Image src={require("../assets/fire-meme.jpg")} fluid />
      </header>
    </div>
  );
}

export default App;
