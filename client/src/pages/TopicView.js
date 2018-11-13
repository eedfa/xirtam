import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { loadTopicPosts, loadTopicPostsBoardcast } from '../requests/graphqlRequests.js'
import Post from '../elements/mainView/Post.js'
import CreatePost from '../elements/overlay/CreatePost.js'
import Modal from 'react-modal'
import { Button } from 'react-materialize'
import TopBar from '../elements/overlay/TopBar.js'
class TopicView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topicId: this.props.match.params.topicId,
      subPosts: [],
      modalIsOpen: false
    }
    this.customStyles = {
      overlay: { zIndex: 10 },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    }
  }
  componentDidMount () {
    this.props.loadTopicPosts.subscribeToMore({
      document: loadTopicPostsBoardcast,
      variables: { topicId: this.props.match.params.topicId },
      updateQuery: (prev, subscriptionData) => {
        if (!subscriptionData.data) return prev
        const newFeedItem = subscriptionData.data
        const newPosts = this.state.subPosts
        newPosts.push(newFeedItem.loadTopicPostsBoardcast)
        this.setState({ subPosts: newPosts })
      }
    })
  }
  loadPosts () {
    let posts = []
    if (this.props.loadTopicPosts.loading) {
      return (<div className='loadig'>Loading...</div>)
    } else {
      posts = this.props.loadTopicPosts.loadTopicPosts
    }
    posts = posts.concat(this.state.subPosts)
    return posts.map(post => {
      return (
        <div>
          <Post postContent={post.topicContent} postPic={post.topicPic} closeModal={this.closeModal.bind(this)} postTimeStamp={post.topicTimeStamp} postAuthor='tbd' />
          <div style={{ marginTop: '100px' }}>.</div>
        </div>
      )
    })
  }
  openModal () {
    this.setState({ modalIsOpen: true })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }
  render () {
    return (
      <div style={{ marginTop: '15%' }} className='topicView'>
        <TopBar style={{ 'zIndex': 999 }} />
        <Button className='createPostButton' onClick={this.openModal.bind(this)}>Create post</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal.bind(this)}
          style={this.customStyles}>
          <CreatePost topicMainId={this.state.topicId} closeModal={this.closeModal.bind(this)} />
        </Modal>
        {this.loadPosts()}
      </div>
    )
  }
}

export default compose(graphql(loadTopicPosts, { name: 'loadTopicPosts',
  options: ownProps => ({
    variables: {
      topicId: ownProps.match.params.topicId
    }
  }) }),
graphql(loadTopicPostsBoardcast, { name: 'loadTopicPostsBoardcast',
  options: ownProps => ({
    variables: {
      topicId: ownProps.match.params.topicId
    }
  }) }))(TopicView)
