import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Image from "react-bootstrap/Image";
import WebFont from "webfontloader";

import landing from "../../../assets/landing-bg.jpg";
import austin from "../../../assets/austin-capitol.jpg";
import beijing from "../../../assets/beijing-skyline.jpg";

const images = [
  {
    url: austin,
    title: 'Cities',
    width: '33%',
    ref: "/cities",
  },
  {
    url: beijing,
    title: 'Countries',
    width: '34%',
    ref: "/countries",
  },
  {
    url: landing,
    title: 'Annual Climate Change',
    width: '33%',
    ref: "/years",
  },
];

/* styles for buttons */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 250,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px 
                ${theme.spacing(4)}px 
                ${theme.spacing(1) + 6}px`,
      fontFamily: "Raleway",
      fontSize: "25px"
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }),
);

/* used to display model page buttons
on landing page */
export default function LandingButton() {

  /* load fonts */
  WebFont.load({
    google: {
      families: [
        "Raleway",
      ],
    },
  });

  const classes = useStyles();

  /* display the three model buttons */
  return (
    <div className={classes.root}>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <Link to={image.ref}>
          <div className={classes.imageSrc}>
            <Image src = {image.url} width={"100%"} height={250}/>
          </div>

          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              <b>{image.title}</b>
              <span className={classes.imageMarked} />
            </Typography>
          </span>
          </Link>
        </ButtonBase>
      ))}
    </div>
  );
}
