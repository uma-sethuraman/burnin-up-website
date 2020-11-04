import React from "react";

/* slide component which contains a source for an image,
a caption, and a link to its corresponding country - used
in the OurCarousel component */

class Slide {
    caption: string;
    src: any;
    countryLink: string;

    constructor(caption: string, src: any, countryLink: string) {
        this.caption = caption;
        this.src = src;
        this.countryLink = countryLink;
      }
}

export default Slide;