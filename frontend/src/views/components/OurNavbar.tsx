import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { string } from "prop-types";
import { Class } from "@material-ui/icons";

function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
}

function amountscrolled() {
  var winheight =
    window.innerHeight ||
    (document.documentElement || document.body).clientHeight;
  var docheight = getDocHeight();
  var scrollTop =
    window.pageYOffset ||
    (document.documentElement || document.body.parentNode || document.body)
      .scrollTop;
  var trackLength = docheight - winheight;
  var pctScrolled = Math.floor((scrollTop / trackLength) * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
  console.log(pctScrolled + "% scrolled");
}

export type NavbarProps = {
  color?: string;
}

/* navbar component used at the top of all pages */
class OurNavbar extends React.Component<NavbarProps, {}> {
  textInput: any;
  navbarColor: string;
  winHeight: number;
  docHeight: number;

  constructor(props: NavbarProps) {
    super(props);
  //   this.navbarColor = props.color;
    this.navbarColor = this.props.color!;
    console.log("NAVBAR COLOR: " + this.navbarColor);
    this.winHeight =
      window.innerHeight ||
      (document.documentElement || document.body).clientHeight;
    this.docHeight = getDocHeight();

    window.addEventListener(
      "scroll",
      function () {
        amountscrolled();
      },
      false
    );

    /* initialize ref to store search bar input */
    this.textInput = React.createRef();
  }

  /* when clicking enter or the search button,
  redirect to search page and pass in the query */
  onClick() {
    window.location.assign("/search/q=" + this.textInput.current.value);
  }

  render() {
    /* attach ref to FormControl component */
    return (
      <div className="OurNavbar">
        {console.log(this.winHeight)}
        {/* this.winHeight> 10?"white": "black" */}
        <Navbar bg={this.navbarColor} variant="dark" fixed="top">
        {console.log(this.navbarColor)}
          <Navbar.Brand href="/">
            <b>
              Burnin Up
            </b>
          </Navbar.Brand>

          {/* links to navbar pages */}
          <Nav className="mr-auto">
            <Nav.Link href="/about">
              <b>About Us</b>
            </Nav.Link>
            <Nav.Link href="/cities">
              <b>Cities</b>
            </Nav.Link>
            <Nav.Link href="/countries">
              <b>Countries</b>
            </Nav.Link>
            <Nav.Link href="/years">
              <b>Annual Global Climate Change</b>
            </Nav.Link>
            <Nav.Link href="/howtohelp">
              <b>How To Help</b>
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
            <Button variant="info" onClick={() => this.onClick()}>
              Search
            </Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

export default OurNavbar;
