import React from 'react';
import {shallow} from 'enzyme';
import Keypad from './Keypad';
import { isTSAnyKeyword, jsxEmptyExpression, exportAllDeclaration } from '@babel/types';

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


    it('should render a <div/>',() => {
        expect(wrapper.find('div').length).toEqual(1);

    });


});