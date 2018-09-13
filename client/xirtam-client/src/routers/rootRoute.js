import { Switch, Route } from 'react-router-dom'
import App from '../App.js'
import Board from '../pages/Board.js'
import React, { Component } from 'react'

class RootRouter extends Component {
  render () {
    return (
      <div className='routde'>
        <main>
          <Switch>
            <Route exact path={'/'} component={App} />
            <Route path={'/b/:boardName'} component={Board} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default RootRouter
