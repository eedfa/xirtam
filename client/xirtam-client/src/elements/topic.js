import React, { Component } from 'react'

class Topic extends Component {
  render () {
    const topic = {
      name: ''
    }

    return (
      <div className='topic'>
        <a href='#!' class='collection-item'> {topic.topicName}</a>
      </div>
    )
  }
}
export default Topic
