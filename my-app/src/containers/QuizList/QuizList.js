import React, {Component} from 'react';
import './QuizList.css'
import {NavLink} from 'react-router-dom'
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";
class QuizList extends Component {
    state ={
        quizes: [],
        loading: true
    }

     renderQuizes(){
        return this.state.quizes.map(quiz => {
            return(
                <li key={quiz.id}>
                   <NavLink to = {'/quizes/' + quiz.id}>
                        {quiz.name}
                   </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/quizes.json')

            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                   id:key,
                   name:`Тест №${index+1}`
               })
            })


            this.setState({
                quizes, loading:false
            })
            console.log(this.state)
        }catch (e) {
            console.log(e)
        }

    }

    render() {
        return (
            <div className={'QuizList'}>
                <div className="QuizWrapper">
                    <h1>Список тестов</h1><br/>
                    {
                        this.state.loading
                        ?<Loader/>
                        :<ul>
                                {this.renderQuizes()}
                        </ul>
                    }

                </div>
            </div>
        );
    }
}

export default QuizList;

