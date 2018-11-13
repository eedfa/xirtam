import { Switch, Route } from 'react-router-dom'
import Main from '../pages/Main.js'
import Board from '../pages/Board.js'
import TopicView from '../pages/TopicView.js'
import Search from '../pages/Search.js'
import React, { Component } from 'react'
import { createBrowserHistory } from 'history'

class RootRouter extends Component {
  render () {
    const history = createBrowserHistory()
    return (
      <div className='route'>
        <main>
          <Switch history={history}>
            <Route exact path={'/'} component={Main} />
            <Route exact path={'/b/:boardName'} component={Board} />
            <Route exact path={'/b/:boardName/:topicId'} component={TopicView} />
            <Route exact path={'/s/:searchQuery'} component={Search} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default RootRouter
