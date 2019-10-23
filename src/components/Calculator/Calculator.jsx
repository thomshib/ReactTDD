import React, {Component} from 'react';
import './Calculator.css'
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';


class Calculator extends Component{
    state = {
        displayValue: '0',
        numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'],
        operators: ['/', 'x', '-', '+'],
        selectedOperator: '',
        storedValue: ''

    };

    callOperator = () =>{

        let{displayValue,storedValue,selectedOperator} = this.state;
        const updateStoredValue  = displayValue;

        displayValue = parseInt(displayValue,10);
        storedValue = parseInt(storedValue,10);
        //console.log('displayValue:' + displayValue);
        //console.log('storedValue:' + storedValue);
        switch (selectedOperator){
            case '+':
                displayValue = storedValue + displayValue;
                break;

            case '-':
                displayValue = storedValue - displayValue;
                break;

            case '*':
                displayValue = displayValue * storedValue;
                break;

            case '/':
                displayValue = storedValue / displayValue; 
                break;

            default:
                displayValue = '0';
            

        };

        displayValue = displayValue.toString();
        selectedOperator = '';

        if(displayValue === 'NaN' || displayValue === 'Infinity') displayValue ='0';

        this.setState({displayValue,storedValue: updateStoredValue,selectedOperator});
        
    };

    setOperator = value => {
        let{displayValue,storedValue,selectedOperator} = this.state;

        if(selectedOperator === ''){
            storedValue = displayValue;
            displayValue = '0';
            selectedOperator = value;
        }else{
            selectedOperator = value;
        }

        this.setState({ displayValue,storedValue, selectedOperator});
    };

    updateDisplay = value => {
        let {displayValue} = this.state;

        //prevents multiples instances of '.'
        if(value === '.' && displayValue.includes('.')) value = '';

        if(value === 'ce'){
            //deletes last char
            displayValue = displayValue.substr(0,displayValue.length - 1);

            if(displayValue === '') displayValue = '0';
        } else{
                //replace displayValue with value if displayValue is "0"
                //else concatenate displayValue and value
                displayValue === '0' ? displayValue = value : displayValue += value;
            }

            this.setState({displayValue});
        

        
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
    };
}

export default  Calculator;