import axios  from 'axios'

export default axios.create({
    baseURL:'https://react-quiz-ad6e2-default-rtdb.firebaseio.com/'
})