import React, { Component } from 'react'
import './App.css'
import Topic from './elements/topic.js'
import CreateUserForm from './elements/createUserForm.js'
import LoginForm from './elements/loginForm.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <LoginForm />
      </div>

    )
  }
}

export default App
