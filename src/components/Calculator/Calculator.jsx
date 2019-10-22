import React, {Component} from 'react';
import './Calculator.css'

class Calculator extends Component{
    state = {
        display: '0',
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
        return (
            <div className="calculator-container" />
        );
    }
}

export default  Calculator;