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
                        <td>Population: </td>
                        <td>1.393 billion</td>
                        </tr>
                        <tr>
                        <td>Time Zone: </td>
                        <td>China Standard Time</td>
                        </tr>
                        <tr>
                        <td>Elevation: </td>
                        <td>29029ft</td>
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