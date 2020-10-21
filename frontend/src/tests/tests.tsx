import React from 'react';
import ReactDOM from 'react-dom';
import { expect, use } from 'chai';
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

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

it('get City General Page', async () => {
	const copy = shallow(<Cities />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(1);
});
// it('get Country General Page', async () => {
// 	const copy = shallow(<Countries />);
// 	expect(copy).to.not.be.undefined;
// 	expect(copy).to.have.length(1);
// 	expect(copy.find("div")).to.have.length(7);
// });

it('should get GeneralYears', async () => {
	const copy = shallow(<GeneralYears />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(1);
});

// it('should get About', async () => {
// 	const copy = shallow(<About />);
// 	expect(copy).to.not.be.undefined;
// 	expect(copy).to.have.length(1);
// 	expect(copy.find("div")).to.have.length(42);
// });

it('should get CityInstance', async () => {
	const component = mount(<Router><CityInstance /> </Router>);
	expect(component).to.not.be.undefined;
	expect(component).to.have.length(1);
});

it('should get CountryInstance', async () => {
	const component = mount(<Router><CountryInstance /></Router>);
	expect(component).to.not.be.undefined;
	expect(component).to.have.length(1);
});

it('should get YearInstance', async () => {
	const component = mount(<Router><YearInstance /></Router>);
	expect(component).to.not.be.undefined;
	expect(component).to.have.length(1);
});

