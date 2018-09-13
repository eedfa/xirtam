import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import Board from './board.js'
import BoardSpacing from './boardSpacing.js'
import { loadBoards } from '../requests/graphqlRequests.js'

class boardList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boards: []
    }
  }
  load () {
    var data = this.props
    if (data.loading) {
      return <div className='loadingBoards' >Loading..</div>
    } else {
      if (data.loadBoards.loading) {
        return <div className='loadingBoards' >Loading..</div>
      } else {
        const boards = data.loadBoards.boards
        return boards.map((boards) => {
          return (
            <div className='boardList'>

              <Board title={boards.boardName} padding={20} />
              <BoardSpacing />
            </div>

          )
        })
      }
    }
  }
  render () {
    return (
      <div className='boardList'>
        {this.load()}
      </div>
    )
  }
}

export default compose(graphql(loadBoards, { name: 'loadBoards' }))(boardList)
