import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-materialize'
import PrivateRoute from '../PrivateRoute/privateroute';
import UserPosts from '../Posts/userPost';
import CreatePost from './createPost'
import EditPost from './editPost'
import { getUserPosts, checkLoggedIn } from '../../store/actions'

class Dashboard extends Component {
  componentDidMount() {
    const id = localStorage.getItem('id')
    this.props.getUserPosts(id)
  }

  render() {
    const { location, match, email, history } = this.props
    const { path } = match
    const { pathname } = location

    return (
      <div className="dashboard">
        <aside className="dashboard-sidebar">
          <header className="sidebar-title">
            <h3>Email: {email}</h3>
            <hr />
          </header>

          <section className="sidebar-actions">
            <Button
              onClick={e => {
                e.preventDefault()
                history.push(`${path}/posts/add`)
              }}
              large
            >
              Create Post
            </Button>
          </section>
        </aside>
        <main className="dashboard-posts">
          {pathname === '/dashboard' && (
            <UserPosts userPosts={this.props.posts} />
          )}
          <PrivateRoute
            exact
            path="/dashboard/posts/add"
            component={CreatePost}
          />
          <PrivateRoute
            exact
            path="/dashboard/posts/update/:id"
            component={EditPost}
          />

          <Button
            id="mobile-actions"
            floating
            fab={{ direction: 'left', hoverEnabled: false }}
            icon="more_horiz"
            className="teal"
            large
          >
            <Button
              onClick={() => this.props.history.push('/dashboard/posts/add')}
              tooltip="Create a new post"
              tooltipOptions={{ position: 'top' }}
              floating
              icon="add"
              className="green"
            />
          </Button>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.authReducer.id,
  email: state.authReducer.email,
  posts: state.postsReducer.userPosts
})

export default withRouter(
  connect(
    mapStateToProps,
    { getUserPosts, checkLoggedIn }
  )(Dashboard)
)
