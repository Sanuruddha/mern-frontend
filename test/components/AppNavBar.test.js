import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AppNavBar } from '../../src/components/AppNavBar';
import expect from 'expect';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
    describe('AppNavBar', () => {
        beforeEach(()=> {

        });

        it('should render self without errors', () => {
            const component = shallow(<AppNavBar auth={{loggedIn: true}}/>);
            expect(component).toHaveLength(1);
        });

        it('should render props correctly', () => {
            const component = shallow(<AppNavBar auth={{loggedIn: true}}/>);
            expect(component.instance().props.auth.loggedIn).toBe(true);
        });

        it('should render props correctly', () => {
            const component = shallow(<AppNavBar auth={{loggedIn: false}}/>);
            expect(component.instance().props.auth.loggedIn).toBe(false);
        });

        it('should toggle collapse upon clicking Toggler', () => {
            const component = shallow(<AppNavBar auth={{loggedIn: false}}/>);
            const navbarToggler = component.find('NavbarToggler');
            expect(component.instance().state.isOpen).toBe(false);
            navbarToggler.props().onClick();
            expect(component.instance().state.isOpen).toBe(true);
        });

        it('should change isOpen state when toggle function is called', () => {
            const component = shallow(<AppNavBar auth={{loggedIn: false}}/>);
            expect(component.instance().state.isOpen).toBe(false);
            component.instance().toggle();
            expect(component.instance().state.isOpen).toBe(true);
        });

        // it('should toggle collapse when toggler is clicked', () => {
        //     const {enzymeWrapper} = setup({
        //         auth: {
        //             loggedIn: true
        //         }
        //     });
        //     enzymeWrapper.find('NavbarToggler').simulate('click');
        //     expect(enzymeWrapper.find('Collapse')).isOpen.toBe(true);
        // });
        //
        // it('should render NavLink if authenticated', () => {
        //     const {enzymeWrapper} = setup({
        //         auth: {
        //             loggedIn: true
        //         }
        //     });
        //     enzymeWrapper.find('NavbarToggler').simulate('click');
        //     expect(enzymeWrapper.contains(<NavLink href={'/logout'}></NavLink>)).toBe(true);
        // });
        //
        // it('should render self and subcomponents', () => {
        //     const {enzymeWrapper} = setup({
        //         auth: {
        //             loggedIn: false
        //         }
        //     });
        //     enzymeWrapper.find('NavbarToggler').simulate('click');
        //     expect(enzymeWrapper.contains(<NavLink href={'/logout'}></NavLink>)).toBe(false);
        // });
    });
});
