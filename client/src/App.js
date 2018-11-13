import React, { Component } from 'react'
import './App.css'

import { rootRoute } from './routers/rootRoute.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <rootRoute />
      </div>

    )
  }
}

export default App
