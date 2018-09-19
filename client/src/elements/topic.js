import React, { Component } from 'react'

import { withRouter } from 'react-router'
class Topic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      post: '',
      topicId:''
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
  onClick(){
    const { history: { push } } = this.props
    push('/b/'+this.props.boardName+'/'+this.props.topicId);
  }
  render () {
    return (
      <div  id='topic' className='topic' onClick={this.onClick.bind(this)} style={this.props.altStyle}>
        <form onSubmit={this.onSubmit.bind(this)} >
          <div className='topicTitle'>{this.props.title}</div>
          <div className='topicContent'>{this.props.content}</div>
        </form>
      </div>
    )
  }
}
export default withRouter(Topic)
