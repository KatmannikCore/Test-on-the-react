import React, {Component} from 'react';
import './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import {creacteControl, validate, validateForm} from '../../form/formFramework'
import Input from "../../components/UI/Input/Input";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

function CreateOptionControl(number) {
    return creacteControl({
        label: `Вариант ${number}`,
        errorMassage: 'Значение не может быть пустым',
        id: number
    }, {required:true})
}
function createFromControls() {
    return{
        question: creacteControl({
            label: 'Введите вопрос',
            errorMassage: 'Вопрос не может быть пустым'
        }, {required:true}),
        option1: CreateOptionControl(1),
        option2: CreateOptionControl(2),
        option3: CreateOptionControl(3),
        option4: CreateOptionControl(4),
    }
}


class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls:createFromControls()
    };

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = event => {
        event.preventDefault();

        const {question, option1, option2 , option3, option4} = this.state.formControls;

        const questionItem = {
           question: question.value,
           id: this.props.quiz.length + 1,
           rightAnswerId: this.state.rightAnswerId,
           answers:[
               {text: option1.value, id:option1.id},
               {text: option2.value, id:option2.id},
               {text: option3.value, id:option3.id},
               {text: option4.value, id:option4.id}
           ]
        };
        this.props.createQuizQuestion(questionItem)
    };
    createQuizHandler =  event =>{
        event.preventDefault();

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls:createFromControls()
        });
        this.props.finishCreateQuiz()
    };
    //Создание Input
    renderControls(){
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return(
                <React.Fragment  key={controlName + index}>
                    <Input
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> :null}
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label = 'Выберите правильный ответ'
            value = {this.state.rightAnswerId}
            onChange = {this.selectChangeHandler}
            options = {[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />

        return (
            <div className={'QuizCreator'}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        {select}
                        <Button type = 'primary' disabled = {!this.state.isFormValid} onClick = {this.addQuestionHandler}>
                            Добвать вопрос
                        </Button>
                        <Button type = 'success' disabled = {this.props.quiz.length === 0} onClick = {this.createQuizHandler}>
                            Cоздать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        quiz:  state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return{
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);