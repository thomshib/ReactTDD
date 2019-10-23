import React from 'react';
import {shallow,mount} from 'enzyme';
import Keypad from './Keypad';
import { isTSAnyKeyword, jsxEmptyExpression, exportAllDeclaration } from '@babel/types';
import { wrap } from 'module';

describe('Keypad', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Keypad 
            callOperator={jest.fn()}
            numbers={[]}
            operators={[]}
            setOperator={jest.fn()}
            updateDisplay={jest.fn()}
            />
        );

    });


    it('should render 4 <div/>',() => {
        expect(wrapper.find('div').length).toEqual(4);

    });


    it('should render the key component', () =>{
        expect(wrapper.find('Key').length).toEqual(1);
    });

    it('should render key for each index of numbers, operators and the sunbmit button', () => {
        const numbers = ['0','1'];
        const operators =['+','-'];
        const submit = 1;
        const keyTotal = numbers.length + operators.length + submit;
        wrapper.setProps({ numbers,operators});
        expect(wrapper.find('Key').length).toEqual(keyTotal);
    });

    it('should render correctly',() => expect(wrapper).toMatchSnapshot());


});


describe('mounted Keypad',() => {
    let wrapper;

    beforeEach(() =>{
        wrapper = mount(
            <Keypad
            callOperator={jest.fn()}
            numbers={[]}
            operators={[]}
            setOperator={jest.fn()}
            updateDisplay={jest.fn()}
            
            />
        )

    });

    it('render the values of numbers to the DOM',() =>{
        wrapper.setProps({numbers:['0','1','2']});
        expect(wrapper.find('.numbers-container').text()).toEqual('012');

    });

    it('render the values of operators to the DOM',() =>{
        wrapper.setProps({operators:['+','-','*']});
        expect(wrapper.find('.operators-container').text()).toEqual('+-*');

    });



});