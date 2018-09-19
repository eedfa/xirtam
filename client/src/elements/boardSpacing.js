import React, { Component } from 'react'


class BoardSpacing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Placeholder',
      repliesCount: 999
    }
  }
  render () {
    return (
      <div id='boardSpacing' />
    )
  }
}

export default BoardSpacing
