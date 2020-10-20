import React from "react";

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