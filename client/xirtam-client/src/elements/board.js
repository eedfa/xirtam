import React, { Component } from 'react'
import '../css/board.css'

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Placeholder',
      repliesCount: 999
    }
  }
  render () {
    return (
      <div id='Board' className='Board'>
        <div id='boardTitle' className='boardTitle'>{this.props.title}</div>
        <div id='boardRepliesCount' className='boardRepliesCount'>{this.props.repliesCount}</div>

      </div>
    )
  }
}

export default Board
