import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class OurNavbar extends React.Component {
  textInput: any;

  constructor(props: any) {
    super(props);
    /* Initialize ref to store search bar input */
    this.textInput = React.createRef();
  }


  onClick() {
    window.location.assign("/search/q=" + this.textInput.current.value);
  }

  render() {
    /* 2. Attach Ref to FormControl component */
    return (
      <div className="OurNavbar">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Burnin Up</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/cities">Cities</Nav.Link>
            <Nav.Link href="/countries">Countries</Nav.Link>
            <Nav.Link href="/years">Annual Global Climate Change</Nav.Link>
          </Nav>
          <Form inline onSubmit={e => { e.preventDefault() }}>
            <FormControl
              className="mr-sm-2"
              type="text"
              placeholder="Search"
              ref={this.textInput}
              onKeyPress={(event:any) => {
                if (event.key === "Enter") {
                    this.onClick();
                }
            }}
            />
            <Button
              variant="outline-success"
              onClick={() => this.onClick()}
              
            >
              Search
            </Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

export default OurNavbar;
