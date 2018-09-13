import React, { Component } from 'react'
import TopicList from '../elements/topicList.js'
import { loadTopics } from '../requests/graphqlRequests.js'
import { compose, graphql } from 'react-apollo'

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boardName: '',
      topicList: []
    }
  }
  loadBoard () {
    this.props.loadTopics({ variables: { topicBoardName: 'aaa'
    } }).then(result => {
      let element = null
      console.log('topics')
      console.log(result.data.loadTopicMutation)
      this.setState({ topicList: result.data.loadTopicMutation })
    })
  }
  componentDidMount () {
    let boardName = this.props.match.params.boardName

    this.setState({ boardName: boardName })
    this.loadBoard()
  }
  render () {
    return (
      <div className='topicList'>
        <TopicList topics={this.state.topicList} />
      </div>
    )
  }
}

export default compose(graphql(loadTopics, { name: 'loadTopics' }))(Board)
