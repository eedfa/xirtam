import React, { Component } from 'react'
import './App.css'
import Topic from './elements/topic.js'
import CreateUserForm from './elements/createUserForm.js'
import BoardList from './elements/boardList.js'
import LoginForm from './elements/loginForm.js'
import CreateBoardForm from './elements/createBoardForm.js'
import { rootRoute } from './routers/rootRoute.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <LoginForm />
        <CreateUserForm />
        <CreateBoardForm />
        <BoardList />
        <rootRoute />
      </div>

    )
  }
}

export default App
