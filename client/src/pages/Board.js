import React, { Component } from 'react'
import Topic from '../elements/mainView//Topic.js'
import { topics, loadBoards, loadTopicsBoardcast, ratingBoardcast } from '../requests/graphqlRequests.js'
import { compose, graphql } from 'react-apollo'
import { Button } from 'react-materialize'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import CreateTopic from '../elements/overlay/CreateTopic.js'
import Share from '../elements/overlay/Share.js'
import Rating from '../elements/overlay/Rating.js'
import TopBar from '../elements/overlay/TopBar.js'
const _ = require('lodash')

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boardName: '',
      topicList: [],
      subTopics: [],
      rating: undefined,
      boardScore: 0,
      columns: 20,
      width: 200,
      height: 200,
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
  openModal () {
    this.setState({ modalIsOpen: true })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }
  resize () {
    let height = 200
    const columns = Math.round(window.innerWidth / 200)
    const width = (80 / columns) + '%'
    if (window.innerWidth < 300) {
      height = window.innerWidth
    }
    this.setState({
      height: height,
      width: width,
      columns: columns
    })
  }
  componentWillMount () {
    this.resize.bind(this)
  }

  componentDidMount () {
    const boardName = this.props.match.params.boardName
    this.setState({ boardName: boardName })
    window.addEventListener('resize', this.resize.bind(this))
    this.props.topics.subscribeToMore({
      document: loadTopicsBoardcast,
      variables: { topicId: this.props.match.params.topicId },
      updateQuery: (prev, subscriptionData) => {
        if (!subscriptionData.data) return prev
        const newFeedItem = subscriptionData.data
        const newTopics = this.state.subTopics
        newTopics.push(newFeedItem.loadTopicsBoardcast)
        this.setState({ subTopics: newTopics })
      }
    })
    this.props.loadBoards.subscribeToMore({
      document: ratingBoardcast,
      variables: { boardName: this.state.boardName },
      updateQuery: (prev, subscriptionData) => {
        if (!subscriptionData.data) return prev
        const newFeedItem = subscriptionData.data
        const newRating = newFeedItem.ratingBoardcast.ratingScore / newFeedItem.ratingBoardcast.ratingAmount
        this.setState({ rating: newRating })
      }
    })
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.resize.bind(this))
  }
  loadBoard () {
    const data = this.props.topics
    if (data.loading || data.topics.length === 0) {
      return
    }
    const topicsColums = []
    let topics = data.topics
    topics = topics.concat(this.state.subTopics)
    let currentColum = 0
    topics.map((topicObj, i) => {
      if (i % this.state.columns === 0) {
        topicsColums.push([])
        currentColum = i / this.state.columns
      }
      topicsColums[currentColum].push(topics[i])
    }
    )
    const collection = _.zip(topicsColums)
    return collection.map((topic) => {
      if (topic[0] !== undefined) {
        const col = []
        topic[0].map((element) => {
          col.push(<Topic title={element.topicName} imgUrl={'http://localhost:4000/uploads/' + element.topicPic} topicId={element.id}
            boardName={this.state.boardName} content={element.topicContent}
            altStyle={{ width: this.state.width, height: this.state.height, backgroundImage: `url(http://localhost:4000/uploads/${element.topicPic}` }} padding={20} />)
        })
        return (
          <div className='topicList'>
            {col}
          </div>
        )
      }
    })
  }
  loadRating () {
    const dataBoards = this.props.loadBoards
    if (dataBoards.loading) {
      return
    }
    let boardScore = dataBoards.boards[0].ratingScore / dataBoards.boards[0].ratingAmount
    if (this.state.rating !== undefined) {
      boardScore = this.state.rating
    }
    return (
      <Rating boardId={this.props.boardId} boardName={this.state.boardName} stars={boardScore} />
    )
  }
  render () {
    if (this.props.topics.loading) {
      return (
        <div style={{ marginTop: '5%' }}>
          <TopBar button='topic' style={{ 'zIndex': 999 }} />
          <div className='loading'>Loading...</div>
        </div>)
    }
    if (this.props.topics.length === 0) {
      return (
        <div style={{ marginTop: '5%' }}>
          <TopBar button='topic' style={{ 'zIndex': 999 }} />
          <div className='loading'>No topics</div>
        </div>)
    }
    return (
      <div style={{ marginTop: '5%' }}>
        <TopBar button='topic' style={{ 'zIndex': 999 }} />
        <div className='topicView'>
          <Button className='createPostButton' onClick={this.openModal.bind(this)}>Create post</Button>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal.bind(this)}
            style={this.customStyles}>
            <CreateTopic boardName={this.state.boardName} topicMainId={this.state.topicId} closeModal={this.closeModal.bind(this)} />
          </Modal>
        </div>
        {this.loadRating()}
        {this.loadBoard()}
        <Share />
      </div>
    )
  }
}
const _mapStateToProps = (state, props) => ({
  ownProps: props,
  boardId: state.boardId
})

export default compose(connect(_mapStateToProps), graphql(topics, { name: 'topics',
  options: (ownProps, boardId) => ({
    variables: { boardId: boardId,
      boardName: ownProps.match.params.boardName } })

}), graphql(loadBoards, { name: 'loadBoards',
  options: (ownProps, boardId) => ({
    variables: { boardId: boardId,
      boardName: ownProps.match.params.boardName } }) }),
graphql(loadTopicsBoardcast, { name: 'loadTopicsBoardcast',
  options: ownProps => ({
    variables: {
      topicId: ownProps.match.params.boardName
    }
  }) }))(Board)
