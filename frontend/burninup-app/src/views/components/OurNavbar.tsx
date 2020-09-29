import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

function OurNavbar() {
    return (
        <div className="OurNavbar">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Burnin Up</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/landing">Home</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
                <Nav.Link href="/cities">Cities</Nav.Link>
                <Nav.Link href="/countries">Countries</Nav.Link>
                <Nav.Link href="/climatechange">Climate Change</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </div>
    );
}

export default OurNavbar;