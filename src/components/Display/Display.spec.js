import React from 'react';
import Display from './Display';
import {shallow} from 'enzyme';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

describe('Display', () => {
    let wrapper;
    beforeEach( () => wrapper = shallow(<Display displayValue={''}/>));

    it('should render correctly' ,() => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a <div />' ,() => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('renders the value of displayValue',() =>{
        wrapper.setProps({displayValue: 'test'});
        expect(wrapper.text()).toEqual('test');


    });

});

