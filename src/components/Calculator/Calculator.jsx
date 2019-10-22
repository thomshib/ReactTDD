import React, {Component} from 'react';
import './Calculator.css'
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';


class Calculator extends Component{
    state = {
        displayValue: '0',
        numbers: [],
        operators: [],
        selectedOperator: '',
        storedValue: ''

    };

    callOperator = () =>{
        console.log("call operator");
    };

    setOperator = () => {
        console.log('set opration');
    };

    updateDisplay = () => {
        console.log('update display');
    };
    
    render = () => {
        const { displayValue,numbers,operators } = this.state;

        return (
            <div className="calculator-container">
                <Display displayValue={displayValue} />
                <Keypad 
                    callOperator = {this.callOperator}
                    numbers = {numbers}
                    operators = {operators}
                    setOperator = {this.setOperator}
                    updateDisplay = {this.updateDisplay}
                />
            </div>
        );
    }
}

export default  Calculator;