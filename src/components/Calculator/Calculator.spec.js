import React from 'react';
import {shallow,mount} from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';
import { isTSAnyKeyword, exportAllDeclaration, isExpressionWrapper } from '@babel/types';
import { isRegExp } from 'util';
import { wrap } from 'module';

describe('Calculator', () =>{
    let wrapper;
    beforeEach(() => wrapper = shallow(<Calculator />));

    it('should render correctly',() => expect(wrapper).toMatchSnapshot());

    it('should render a div/>', () => {
        expect(wrapper.find('div').length).toEqual(1);

    });

    it('should render the Display and Keypad Components', () =>{
        expect(
            wrapper.containsAllMatchingElements
            ([
            <Display  displayValue={wrapper.instance().state.displayValue} />,
            <Keypad
                callOperator={wrapper.instance().callOperator}
                numbers={wrapper.instance().state.numbers}
                operators={wrapper.instance().state.operators}
                setOperator={wrapper.instance().setOperator}
                updateDisplay={wrapper.instance().updateDisplay}

            />
            ])
            ).toEqual(true);

    });


});

describe('mounted Calculator',() =>{

    let wrapper;
    beforeEach( () =>  wrapper = mount(<Calculator />));

    it('calls updateDisplay when a number is clicked', () =>{
        const spy = jest.spyOn(wrapper.instance(),'updateDisplay');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.number-key').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);


    });

    it('calls setOperator when an operator key is clicked',() => {
        const spy = jest.spyOn(wrapper.instance(),'setOperator');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.operator-key').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('calls callOperator when the submit key is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(),'callOperator');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.submit-key').simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);

    });


});


/*  
  functtional tests
*/

describe('updateDisplay',() => {

    let wrapper;
    beforeEach(() => {wrapper = shallow(<Calculator />)});

    it('updates displayValue',() => {
        wrapper.instance().updateDisplay('5');
        expect(wrapper.state('displayValue')).toEqual('5');

    });

    it('concatenate display value', () =>{
        wrapper.instance().updateDisplay('5');
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('50');
    });

    it('removes leading "0" from displyValue',() =>{
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('0');
        wrapper.instance().updateDisplay('5');
        expect(wrapper.state('displayValue')).toEqual('5');

    });

    it('prevents multiple leading "0" from displyValue',() =>{
        wrapper.instance().updateDisplay('0');
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('0');
        

    });

    it('removes last char of displayValue',() => {

        wrapper.instance().updateDisplay('5');
        wrapper.instance().updateDisplay('0');
        wrapper.instance().updateDisplay('ce');
        expect(wrapper.state('displayValue')).toEqual('5');

    });

    it('will set displayValue to "0"  if displayvalue is equal to empty string',() => {
        wrapper.instance().updateDisplay('ce');
        expect(wrapper.state('displayValue')).toEqual('0');

    });



});


describe('setOperator',() => {

    let wrapper;
    beforeEach( () => wrapper = shallow(<Calculator/>));

    it('updates the value of the selectedOperator' ,() => {
        wrapper.instance().setOperator('+');
        expect(wrapper.state('selectedOperator')).toEqual('+');
        wrapper.instance().setOperator('/');
        expect(wrapper.state('selectedOperator')).toEqual('/');
        

    });

    it('update the storedValue to the displayValue', () =>{
        wrapper.setState({displayValue: '5'});
        wrapper.instance().setOperator('+');
        expect(wrapper.state('storedValue')).toEqual('5');

    });

    it('update the value of displayValue to "0" ',() => {
        wrapper.setState( {displayValue: '5'});
        wrapper.instance().setOperator('+');
        expect(wrapper.state('displayValue')).toEqual('0');

    });

    it('selectedOperator is not an empty string, does not update stored value',() => {
        wrapper.setState( {displayValue: '5'});
        wrapper.instance().setOperator('+');
        expect(wrapper.state('storedValue')).toEqual('5');
        wrapper.instance().setOperator('-');
        expect(wrapper.state('storedValue')).toEqual('5');


    });



});


describe('callOperator',() =>{

    let wrapper;
    beforeEach(() => wrapper = shallow(<Calculator />));

    it('updates displayValue to sum of storedValue and displayValue', () => {
        wrapper.setState({storedValue: '3'});
        wrapper.setState({displayValue: '2'});
        wrapper.setState({selectedOperator: '+'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('5');


    });

    it('updates displayValue to difference of storedValue and displauValue', () => {
        wrapper.setState({storedValue: '3'});
        wrapper.setState({displayValue: '2'});
        wrapper.setState({selectedOperator: '-'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('1');


    });

    it('updates displayValue to product of storedValue and displauValue', () => {
        wrapper.setState({storedValue: '3'});
        wrapper.setState({displayValue: '2'});
        wrapper.setState({selectedOperator: '*'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('6');


    });

    it('updates displayValue to division of storedValue and displauValue', () => {
        wrapper.setState({storedValue: '3'});
        wrapper.setState({displayValue: '2'});
        wrapper.setState({selectedOperator: '/'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('1.5');


    });

    it('updates displayValue to "0" if operation results in NAN', () => {
        wrapper.setState({storedValue: '3'});
        wrapper.setState({displayValue: 'string'});
        wrapper.setState({selectedOperator: '/'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');


    });

    it('updates displayValue to "0" if operation results in Infinity', () => {
        wrapper.setState({storedValue: '3'});
        wrapper.setState({displayValue: '0'});
        wrapper.setState({selectedOperator: '/'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');


    });

    it('updates displayValue to "0" if selectedOprator does not match cases', () => {
        wrapper.setState({storedValue: '3'});
        wrapper.setState({displayValue: '2'});
        wrapper.setState({selectedOperator: 'string'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');


    });

    it('updates displayValue to "0" if called with no value for storedValue or selectedOperator', () => {
        wrapper.setState({storedValue: ''});
        wrapper.setState({displayValue: '10'});
        wrapper.setState({selectedOperator: ''});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');


    });


});