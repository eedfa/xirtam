import React, { Component } from 'react'
import Topic from './topic.js'

class TopicList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topics: []
    }
  }
  addTopic (newTopic) {
    this.setState(prevState => ({
      arrayvar: [...prevState.arrayvar, newTopic]
    }))
  }
  loadList () {
      return this.props.topics.map(
        (topic) => {
          return (
            <div className='topicList'>
              <Topic  title={topic.topicName} content={topic.topicContent} topicId={topic.id} />
            </div>
          )
        })
  }
  render () {
    return (
      <div className='topicList'>
        {this.loadList()}
      </div>
    )
  }
}

export default TopicList
