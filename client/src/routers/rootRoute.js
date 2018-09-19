import { Switch, Route } from 'react-router-dom'
import App from '../App.js'
import Board from '../pages/Board.js'
import TopicView  from '../pages/TopicView.js'
import React, { Component } from 'react'
import {createBrowserHistory} from 'history'

class RootRouter extends Component {
  render () {
    let history = createBrowserHistory()
    return (
      <div className='route'>
        <main>
          <Switch history={history}>
            <Route exact path={'/'} component={App} />
            <Route exact path={'/b/:boardName'} component={Board} />
            <Route exact path={'/b/:boardName/:topicId'}  component = {TopicView}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default RootRouter
