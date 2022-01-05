import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import './Auth.css'
import is from 'is_js'
import axios from 'axios'

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пороль',
                errorMessage: 'Введите корректный пороль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            },
        }
    };

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try {
            const response =  await axios.post( 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?' +
                'key=AIzaSyCW323OV53fdI3MmEH4p0D3G_FErAYFq0w', authData )
            console.log(response.data)
        }catch (e) {
            console.log(e)
        }
    };

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try {
            const response =  await axios.post( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?' +
                'key=AIzaSyCW323OV53fdI3MmEH4p0D3G_FErAYFq0w', authData )
            console.log(response.data)
        }catch (e) {
            console.log(e)
        }



    };
    submitHandler = event => {
        event.preventDefault()
    };

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== ''
        }

        if (validation.email) {
            isValid = is.email(value)
        }

        if (validation.minLength) {
            isValid = value.trim().length >= validation.minLength && isValid;
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name =>{
            isFormValid = formControls[name].valid
        });

        this.setState({
            formControls, isFormValid
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}

                />
            )
        })
    }

    render() {
        return (
            <div className={'Auth'}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={'AuthForm'}>
                        {this.renderInputs()}
                        <Button type="success" disabled = {!this.state.isFormValid} onClick={this.loginHandler}>Войти</Button>
                        <Button type="primary" disabled = {!this.state.isFormValid} onClick={this.registerHandler}>Зарегестрироваться</Button>
                    </form>
                </div>
            </div>
        );
    }
}


export default Auth;