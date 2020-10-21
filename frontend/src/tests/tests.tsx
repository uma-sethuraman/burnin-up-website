import React from 'react';
import ReactDOM from 'react-dom';
import { expect, use } from 'chai';
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';

import { render } from '@testing-library/react';

import App from "../views/App";
import About from "../views/About";
import Cities from "../views/Cities";
import CityInstance from "../views/components/City/CityInstance";
import GeneralYears from "../views/GeneralYears";
import Countries from "../views/Countries";
import CountryInstance from "../views/components/Country/CountryInstance";
import YearInstance from "../views/components/Year/YearInstance";
Enzyme.configure({
  adapter: new Adapter(),
})

var assert = require('assert')

it('should get Cities', async () => {
	const copy = shallow(<Cities />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(1);
});
