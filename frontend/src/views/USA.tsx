import React from 'react';
import './App.css';
import Navbar from './components/OurNavbar';
import Image from "react-bootstrap/Image"; 
import Table from "react-bootstrap/Table";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
function USA() {
    return (
        <div className="App">
            <Navbar />
            <header className="App-header">
            <Container>
              <Jumbotron>
                <h1>welcome!</h1>
                <p> our page is about....</p>
              </Jumbotron>
            </Container>
                <h1>United States of America</h1> 
                <br />
                <Table striped bordered hover size="sm" variant="dark">
                    <tbody>
                        <tr>
                        <td>Population: </td>
                        <td>328.2 million</td>
                        </tr>
                        <tr>
                        <td>Time Zone: </td>
                        <td>Eastern Daylight Time</td>
                        </tr>
                        <tr>
                        <td>Elevation: </td>
                        <td>20310ft</td>
                        </tr>
                    </tbody>
                    </Table>
                <Image src={require("../assets/USA_flag.jpg")} fluid />
                <br />
                <Image src={require("../assets/US_gdp.jpg")} fluid />
                
            </header>
        </div>
    );
}

export default USA;