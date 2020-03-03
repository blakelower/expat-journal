import React, {Component} from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts } from "./store/actions"
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Dashboard from "./components/Dashboard/dashboard";
import PrivateRoute from "./components/PrivateRoute/privateroute";
import PostList from './components/Posts/postList';

//style
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css'

class App extends Component {
  componentDidMount() {
    M.AutoInit()
    if (localStorage.getItem('token')) {
    }
    this.props.getPosts()
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/posts"
          render={props => <PostList {...props} posts={this.props.posts} />}
        />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route
          exact
          path="/signup"
          render={props => <Signup {...props} />}
        />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  isLoggedIn: state.authReducer.isLoggedIn
})

const mapDispatchToProps = {
  getPosts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

