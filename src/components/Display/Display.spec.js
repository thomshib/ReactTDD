import React from 'react';
import Display from './Display';
import {shallow} from 'enzyme';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

describe('Display', () => {
    let wrapper;
    beforeEach( () => wrapper = shallow(<Display displayValue={''}/>));

    it('should render a <div />' ,() => {
        expect(wrapper.find('div').length).toEqual(1);
    });


});

