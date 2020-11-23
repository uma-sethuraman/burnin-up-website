import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import WebFont from "webfontloader";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import logo from "../../assets/burninup_icon-removebg-preview.png";

/* the navigation bar which appears on
all the pages */
const OurNavbar = (props: any) => {
  /* input for search bar */
  const textInput: any = React.useRef();

  /* save y position of window in order to 
  change navbar color to solid after certain
  y position */
  const [windowYPos, setWindowYPos] = useState<number>(0);

  /* used when pressing search button in navbar */
  function searchOnClick() {
    window.location.assign("/search/q=" + textInput.current.value);
  }

  /* load the fonts */
  WebFont.load({
    google: {
      families: ["Raleway", "sans-serif", "Prompt"],
    },
  });

  /* for navbar tabs */
  const styles = {
    tabs: {
      color: "white",
      fontFamily: "Raleway",
    } as React.CSSProperties,
    searchButton: {
      backgroundColor: "white",
      borderColor: "white",
      color: "black",
    } as React.CSSProperties,
  };

  /* if the user passes in props.singleColor as true,
  then make the navbar solid black. otherwise, make the
  navbar clear until the user scrolls past the given y
  position and then change the navbar to solid black. */
  function getNavbarStyle() {
    if (props.singleColor !== undefined && props.singleColor) {
      return { backgroundColor: "black" };
    } else {
      if (windowYPos > 75) return { backgroundColor: "black" };
      else return {};
    }
  }

  /* store window y position as user scrolls */
  const handleScroll = () => {
    setWindowYPos(window.scrollY);
  };

  /* add scroll event listener to window */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tabs = [
  {
    href: "/about",
    name: "ABOUT US",
  },
  {
    href: "/cities",
    name: "CITIES",
  },
  {
    href: "/countries",
    name: "COUNTRIES",
  },
  {
    href: "/years",
    name: "ANNUAL CLIMATE CHANGE",
  },
  {
    href: "/howtohelp",
    name: "HOW TO HELP",
  },
  {
    href: "/visualizations",
    name: "OUR DATA",
  },
  {
    href: "/provider-visualizations",
    name: "PROVIDER DATA",
  },
  ];

  return (
    <div className="OurNavbar">
      <Navbar fixed="top" style={getNavbarStyle()} variant="dark">

        <Navbar.Brand href="/">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="logo-style">
              <Image
                src={logo}
                style={{
                  maxHeight: "5vh",
                  marginRight: "2vh",
                  marginLeft: "1vh",
                }}>
              </Image>
            </div>
            <div style={{
                color: "white",
                fontFamily: "Raleway",
                display: "flex",}}>
              <b>BURNIN' UP &nbsp;</b>
            </div>
          </div>
        </Navbar.Brand>

        {/* links to navbar pages */}
        <Nav className="mr-auto">
        {tabs.map((tab) => (
          <Nav.Link href={tab.href}>
            <div style={styles.tabs}>{tab.name} &nbsp;</div>
          </Nav.Link>
        ))}
        </Nav>

        {/* saves query when user clicks enter or "search" button */}
        <Form
          inline onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormControl
            className="mr-sm-2"
            type="text"
            placeholder="Search"
            ref={textInput}
            onKeyPress={(event: any) => {
              if (event.key === "Enter") {
                searchOnClick();
              }
            }}
          />
          {/* search button */}
          <Button
            style={styles.searchButton}
            variant="info"
            onClick={() => searchOnClick()}
          >
          <AiOutlineSearch />
          </Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default OurNavbar;
