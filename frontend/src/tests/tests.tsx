import React from 'react';
import { expect } from 'chai';
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

/* Importing components/pages to test */
import App from "../views/App";
import About from "../views/About";
import Cities from "../views/Cities";
import CityInstance from "../views/components/City/CityInstance";
import GeneralYears from "../views/GeneralYears";
import Countries from "../views/Countries";
import CountryInstance from "../views/components/Country/CountryInstance";
import YearInstance from "../views/components/Year/YearInstance";
import Search from "../views/components/Search/Search";
import HowToHelp from '../views/HowToHelp';

Enzyme.configure({
  adapter: new Adapter(),
})

it('Get Landing Page', async () => {
	const copy = shallow(<App />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(1);
});

it('Get About Page', async () => {
	const copy = shallow(<About />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(24);
});

it('Get City General Page', async () => {
	const copy = shallow(<Cities />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(1);
});

it('Get Countries General page', async () => {
	const copy = shallow(<Countries />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(1);
});

it('Get Years General page', async () => {
	const copy = shallow(<GeneralYears />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(1);
});

it('Get How To Help page', async () => {
	const copy = shallow(<HowToHelp />);
	expect(copy).to.not.be.undefined;
	expect(copy).to.have.length(1);
	expect(copy.find("div")).to.have.length(7);
});
  
it('Get a CityInstance', async () => {
	const component = mount(<Router><CityInstance /> </Router>);
	expect(component).to.not.be.undefined;
	expect(component).to.have.length(1);
});

it('Get a CountryInstance', async () => {
	const component = mount(<Router><CountryInstance /></Router>);
	expect(component).to.not.be.undefined;
	expect(component).to.have.length(1);
});

it('Get a YearInstance', async () => {
	const component = mount(<Router><YearInstance /></Router>);
	expect(component).to.not.be.undefined;
	expect(component).to.have.length(1);
});

it('Get a Search Page', async () => {
	const component = mount(<Router><Search /></Router>);
	expect(component).to.not.be.undefined;
	expect(component).to.have.length(1);
});

