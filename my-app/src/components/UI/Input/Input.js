import React from 'react';
import "./Input.css"


function isInvalid(props) {
    return !props.valid && props.touched
}

const Input = props => {
    const inputType = props.type || 'text';
    const classes = ['Input'];
    const htmlFor = `${inputType}-${Math.random()}`;

     if(isInvalid(props)){
         classes.push('invalid')
     }

    return <div className={classes.join(' ')}>
        <label htmlFor={htmlFor}>{props.label}</label>
        <input
            type={inputType}
            id={htmlFor}
            value={props.value}
            onChange={props.onChange}
        />
        {
            isInvalid(props)
            ? <span>{props.errorMessage || 'Введите верное значение'}</span>
            :null
        }
    </div>;
};

export default Input;