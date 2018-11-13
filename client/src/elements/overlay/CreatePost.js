import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { addTopicPost } from '../../requests/graphqlRequests.js'
import Dropzone from 'react-dropzone'
import '../../css/post.css'
import Modal from 'react-modal'
class CreatePost extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      link: '',
      content: '',
      type: 1,
      file: Buffer,
      isOpen: false,
      imageView: 'hiddenView',
      textView: 'showView',
      linkView: 'hiddenView',
      imageTab: 'nonActiveTab',
      textTab: 'activeTab',
      linkTab: 'nonActiveTab'
    }
    this.style = {
      height: '400px',
      width: '600px'
    }
  }
  setViewVisible (viewClassName, tabClassName) {
    this.setState({ imageView: 'hiddenView',
      textView: 'hiddenView',
      linkView: 'hiddenView',
      imageTab: 'nonActiveTab',
      textTab: 'nonActiveTab',
      linkTab: 'nonActiveTab' })
    this.setState({ [viewClassName]: 'showView',
      [tabClassName]: 'activeTab' })
  }
  onDrop (files) {
    this.setState({
      file: files[0]
    })
  }
  submitPost () {
    this.props.addTopicPost({ variables: {
      topicName: this.state.title,
      topicContent: this.state.content,
      topicMainId: this.props.topicId,
      topicMainName: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
      topicType: this.state.type,

      files: this.state.file }
    }).then(data => {
      this.props.closeModal()
    })
  }
  onClose () {
    this.setState({ isOpen: false })
  }
  onOpen () {
    this.setState({ isOpen: true })
  }
  render () {
    return (
      <div className='createPost'>
        <div waves='light' onClick={this.onOpen.bind(this)}>Create Post</div>
        <Modal
          className='createPostModal'
          isOpen={this.state.isOpen}
          onRequestClose={this.onClose.bind(this)}
        >
          <div className='createPostTab'>
            <div className={this.state.imageTab} onClick={this.setViewVisible.bind(this, 'imageView', 'imageTab')}> <div className='tabText'> image</div> </div>
            <div className={this.state.textTab} onClick={this.setViewVisible.bind(this, 'textView', 'textTab')}> <div className='tabText'>text </div></div>
            <div className={this.state.linkTab} onClick={this.setViewVisible.bind(this, 'linkView', 'linkTab')}>  <div className='tabText'>link</div> </div>
          </div>
          <div className={this.state.imageView}>
            <label>PlaceUploadBlobtitle</label>
            <textarea className='postTitleInput' onChange={(e) => { this.setState({ title: e.target.value }) }} />
            <label className='textViewContetnLabel' htmlFor='TextViewContentInput'>Write post ...</label>
            <textarea className='postContentInput' onChange={(e) => { this.setState({ content: e.target.value }) }} />
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>File</p>
            </Dropzone>
            <div className='submitPostButton' onClick={this.submitPost.bind(this)}>  <div className='tabText'>Post </div></div>
          </div>
          <div className={this.state.textView}>
            <label >Place title</label>
            <textarea className='postTitleInput' onChange={(e) => { this.setState({ title: e.target.value }) }} />
            <label className='textViewContetnLabel' htmlFor='textViewContentInput'>Write post ...</label>
            <textarea className='postContentInput' onChange={(e) => { this.setState({ content: e.target.value }) }} />
            <div className='submitPostButton' onClick={this.submitPost.bind(this)}>  <div className='tabText'>Post </div></div>
          </div>
          <div className={this.state.linkView}>
            <label>Place title</label>
            <textarea className='postTitleInput' onChange={(e) => { this.setState({ title: e.target.value }) }} />
            <label className='linkViewContetnLabel' htmlFor='linkViewContentInput'>Place link ...</label>
            <textarea className='postContentInput' style={{ height: '30%' }} onChange={(e) => { this.setState({ link: e.target.value }) }} />
            <div className='submitPostButton' onClick={this.submitPost.bind(this)}>  <div className='tabText'>Post </div></div>
          </div>
        </Modal>
      </div>

    )
  }
}

export default compose(graphql(addTopicPost, { name: 'addTopicPost' }))(CreatePost)
