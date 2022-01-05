import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet
} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";

const AppRoute = () => {
  return (
      <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="auth" element={<Auth />} />
          <Route path="quiz-creator" element={<QuizCreator />} />
          <Route path="/quizes/:id" element={<Quiz />} />
      </Routes>
  );
};
class App extends Component {
  render() {
    return (

        <Router>
          <Layout>
              <AppRoute  />
          </Layout>
        </Router>

    )
  }
}

export default App
