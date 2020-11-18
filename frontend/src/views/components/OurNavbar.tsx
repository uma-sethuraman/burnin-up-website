import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import WebFont from "webfontloader";
import { AiOutlineSearch } from "react-icons/ai";

/* navbar component used at the top of all pages */
class OurNavbar extends React.Component {
  textInput: any;
  navbarColor: string;

  constructor(props: any) {
    super(props);
    this.navbarColor = "";

    /* initialize ref to store search bar input */
    this.textInput = React.createRef();
  }

  /* when clicking enter or the search button,
  redirect to search page and pass in the query */
  onClick() {
    window.location.assign("/search/q=" + this.textInput.current.value);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 100) {
      this.setState({ navbarColor: "white"});
    } else {
      this.setState({ navbarColor: "black"});
    }
  };

  render() {
    WebFont.load({
      google: {
        families: [
          "Trirong",
          "Nunito Sans",
          "Quicksand",
          "Vesper Libre",
          "Trocchi",
          "serif",
          "Advantage",
          "Prompt",
          "Big Shoulders Stencil Text",
          "cursive",
          "Raleway",
          "sans-serif",
        ],
      },
    });
    /* attach ref to FormControl component */
    return (
      <div className="OurNavbar">
        {/* <Navbar fixed="top" style={window.scrollY > 150? {backgroundColor: "black"}: {}} variant = "dark"> */}
        <Navbar fixed="top" style={{backgroundColor: "black"}} variant="dark">
          <Navbar.Brand href="/">
            
            <div style={{color: "white", fontFamily: "Raleway"}}>
              <b>
                Burnin' Up
              </b>
            </div>
          </Navbar.Brand>

          {/* links to navbar pages */}
          <Nav className="mr-auto">
            <Nav.Link href="/about" >
              <div style={{color: "white", fontFamily: "Raleway"}}>About Us</div>
            </Nav.Link>
            <Nav.Link href="/cities">
              <div style={{color: "white", fontFamily: "Raleway"}}>
                Cities
              </div>
            </Nav.Link>
            <Nav.Link href="/countries">
              <div style={{color: "white", fontFamily: "Raleway"}}>
                Countries
              </div>
            </Nav.Link>
            <Nav.Link href="/years">
              <div style={{color: "white", fontFamily: "Raleway"}}>
                Annual Global Climate Change
              </div>
            </Nav.Link>
            <Nav.Link href="/howtohelp">
              <div style={{color: "white", fontFamily: "Raleway"}}>
                How To Help
              </div>
            </Nav.Link>
            <Nav.Link href="/visualizations">
              <div style={{color: "white", fontFamily: "Raleway"}}>
                Visualizations
              </div>
            </Nav.Link>
          </Nav>

          {/* saves query when user clicks enter or "search" button */}
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl
              className="mr-sm-2"
              type="text"
              placeholder="Search"
              ref={this.textInput}
              onKeyPress={(event: any) => {
                if (event.key === "Enter") {
                  this.onClick();
                }
              }}
            />
            <Button style={{backgroundColor: "white", borderColor: "white", color: "black"}} 
            variant="info" onClick={() => this.onClick()}>
              <AiOutlineSearch />
            </Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

export default OurNavbar;
