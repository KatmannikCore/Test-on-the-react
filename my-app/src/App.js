import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.autoLogin();
    }

    render() {

      let routes = (
          <Routes>
              <Route path="/" element={<QuizList />} />
              <Route path="auth" element={<Auth />} />
              <Route path="/quizes/:id" element={<Quiz />} />
          </Routes>
      );
      if(this.props.isAuthenticated){
          routes = (
              <Routes>
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/" element={<QuizList />} />
                  <Route path="auth" element={<Auth />} />
                  <Route path="quiz-creator" element={<QuizCreator />} />
                  <Route path="/quizes/:id" element={<Quiz />} />
              </Routes>
          )
      }

      return (
          <Router>
              <Layout>
                  {routes}
              </Layout>
          </Router>
      )
  }
}

function mapStateToProps(state) {
    return{
        isAuthenticated: !!state.auth.token
    }
}
function mapDispatchToProps(dispatch) {
    return{
        autoLogin:() => dispatch(autoLogin())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
