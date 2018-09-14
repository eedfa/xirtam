import React, { Component } from 'react'
import '../css/topic.css'
import { compose, graphql } from 'react-apollo'
import { addTopicPost } from '../requests/graphqlRequests.js'

class Topic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      post: ''
    }
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.addTopicPost({ variables: {
      topicName: this.props.title,
      topicContent: this.state.post,
      topicMainId: this.props.topicMainId
    } })
  }

  render () {
    return (
      <div className='topic'>
        <form onSubmit={this.onSubmit.bind(this)} >
          {this.props.title}
          {this.props.content}
          {this.props.topicMainId}
          <input className='postTextBox' onChange={(e) => { this.setState({ post: e.target.value }) }} />
          <button onSubmit={this.onSubmit.bind(this)} >Post</button>
        </form>
      </div>
    )
  }
}
export default compose(graphql(addTopicPost, { name: 'addTopicPost' }))(Topic)
