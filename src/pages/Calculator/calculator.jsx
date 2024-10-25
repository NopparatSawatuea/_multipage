import React, { useState } from 'react';
import './calculator.css';

const Calculator = () => {
    const [screenValue, setScreenValue] = useState('0');
    const [currentInput, setCurrentInput] = useState('');
    const [previousInput, setPreviousInput] = useState('');
    const [operator, setOperator] = useState('');

    const datanumber = (number) => {
        if (screenValue === '0' || operator === '=') {
            setScreenValue(number);
            setOperator('');
        } else {
            setScreenValue(prev => prev + number);
        }
        setCurrentInput(screenValue + number);
    };

    const dataoperator = (op) => {
        if (currentInput === '') return;

        if (operator) {
            calculate();
        }

        setOperator(op);
        setPreviousInput(currentInput);
        setCurrentInput('');
        setScreenValue('');
    };

    const calculate = () => {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            case '%':
                result = (prev * current) / 100;
                break;
            case '√':
                result = Math.sqrt(current);
                break;
            case '1/x':
                result = 1 / current;
                break;
            case '+/-':
                result = -current;
                break;
            default:
                return;
        }

        setScreenValue(result);
        setCurrentInput(result);
        setOperator('');
    };

    const dataclear = () => {
        setScreenValue('0');
        setCurrentInput('');
        setPreviousInput('');
        setOperator('');
    };

    const handleKeyDown = (e) => {
        const value = e.key;
        if (value === 'Escape') {
            dataclear();
        } else if (value === 'Enter') {
            calculate();
        } else if (value === '/' || value === '*' || value === '+' || value === '-') {
            dataoperator(value);
        } else if (value >= '0' && value <= '9') {
            datanumber(value);
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentInput, previousInput, operator]);

    return (
        <div className='calculator-container'>
            <div className="calculator">
                <div>
                    <input type="text" className="input" value={screenValue} readOnly />
                </div>
                <section className="input">
                    <div className="calc-btn-row">
                        <button className="btn-operator" onClick={dataclear}>CE</button>
                        <button className="btn-operator">MC</button>
                        <button className="btn-operator">MR</button>
                        <button className="btn-operator">M+</button>
                        <button className="btn-operator">M-</button>
                    </div>

                    <div className="calc-btn-row">
                        <button className="btn-number" onClick={() => datanumber('7')}>7</button>
                        <button className="btn-number" onClick={() => datanumber('8')}>8</button>
                        <button className="btn-number" onClick={() => datanumber('9')}>9</button>
                        <button className="btn-operator" onClick={() => dataoperator('÷')}>÷</button>
                        <button className="btn-operator">√</button>
                    </div>

                    <div className="calc-btn-row">
                        <button className="btn-number" onClick={() => datanumber('4')}>4</button>
                        <button className="btn-number" onClick={() => datanumber('5')}>5</button>
                        <button className="btn-number" onClick={() => datanumber('6')}>6</button>
                        <button className="btn-operator" onClick={() => dataoperator('x')}>x</button>
                        <button className="btn-operator">%</button>
                    </div>

                    <div className="calc-btn-row">
                        <button className="btn-number" onClick={() => datanumber('1')}>1</button>
                        <button className="btn-number" onClick={() => datanumber('2')}>2</button>
                        <button className="btn-number" onClick={() => datanumber('3')}>3</button>
                        <button className="btn-operator" onClick={() => dataoperator('-')}>-</button>
                        <button className="btn-operator">1/x</button>
                    </div>

                    <div className="calc-btn-row">
                        <button className="btn-number" onClick={() => datanumber('0')}>0</button>
                        <button className="btn-number">.</button>
                        <button className="btn-operator">+/-</button>
                        <button className="btn-operator" onClick={() => dataoperator('+')}>+</button>
                        <button className="btn-operator" onClick={calculate}>=</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Calculator;
