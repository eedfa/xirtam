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
    console.log('addTopic')
    console.log(newTopic)
    this.setState(prevState => ({
      arrayvar: [...prevState.arrayvar, newTopic]
    }))
  }
  loadList () {
    console.log('this.props.topicList')
    console.log(this.props.topics)
    if (this.props.topics.length === 0) {
      return (<div>loading ...</div>)
    } else {
      return this.props.topics.map(
        (topic) => {
          console.log(topic.topicContent)
          return (
            <div className='topic'>
              <Topic title={topic.topicContent} />
            </div>
          )
        })
    }
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
