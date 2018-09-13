import React, { Component } from 'react'

class Topic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }
  }
  render () {
    return (
      <div className='topic'>
        {this.props.title}
      </div>
    )
  }
}
export default Topic
