import React from 'react';
import './App.css';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 
import Table from "react-bootstrap/Table";

function China() {
    return (
        <div className="App">
            <Navbar />
            <header className="App-header">
                <h1>China</h1> 
                <br />
                <Table striped bordered hover size="sm" variant="dark">
                    <tbody>
                        <tr>
                        <td>Income Level</td>
                        <td>Upper Middle Income</td>
                        </tr>
                        <tr>
                        <td>Longtitude</td>
                        <td>116.286</td>
                        </tr>
                        <tr>
                        <td>Latitude</td>
                        <td>40.0495</td>
                        </tr>
                        <tr>
                        <td>Region</td>
                        <td>East Asia and Pacific</td>
                        </tr>
                        <tr>
                        <td>Capital City</td>
                        <td>Beijing</td>
                        </tr>
                        <tr>
                        <td>Averge Temperature</td>
                        <td>3.45</td>
                        </tr>
                        <tr>
                        <td>pm2.5</td>
                        <td>400</td>
                        </tr>
                    </tbody>
                    </Table>
                <Image src={require("../assets/China_flag.jpg")} fluid />
                <br />
                <Image src={require("../assets/China_gdp.jpg")} fluid />
            </header>
        </div>
    );
}

export default China;
