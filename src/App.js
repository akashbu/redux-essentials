import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { AddPostForm } from './features/posts/AddPostForm'
import {SinglePost} from './features/posts/SinglePost'
import {PostsList} from './features/posts/PostsList'
import { EditPost} from './features/posts/EditPost'
import {UsersList} from './features/users/UsersList'
import {UserPage} from './features/users/UserPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm/>
                <PostsList/>
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePost}/>
          <Route exact path="/editPost/:postId" component={EditPost}/>
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
