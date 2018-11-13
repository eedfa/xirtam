import React, { Component } from 'react'
import conf from '../../config.js'
class Post extends Component {
  render () {
    const date = new Date(this.props.postTimeStamp * 1000)
    const hours = date.getHours()
    const minutes = '0' + date.getMinutes()
    const seconds = '0' + date.getSeconds()
    if (this.props.postAuthor === '') {
      this.props.postAuthor = 'Anon'
    }
    return (
      <div className='post' id='post' >
        <div className='postAuthor'>{this.props.postAuthor}</div>
        <div className='postTimeStamp'>{hours}:{minutes}:{seconds}</div>
        <div className='postContent'>{this.props.postContent}</div>
        <img className='postImg' src={conf.remoteUploads + this.props.postPic} />
      </div>
    )
  }
}

export default Post
