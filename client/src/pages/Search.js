import React, { Component } from 'react'
import TopBar from '../elements/overlay/TopBar.js'
import Board from '../elements/mainView//Board.js'
import Topic from '../elements/mainView/Topic.js'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { searchQuery } from '../requests/graphqlRequests.js'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: 20,
      width: 200,
      height: 200
    }
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
  loadResults () {
    if (this.props.searchQuery.loading) {
      return <div className='loading'>Loading...</div>
    } else {
      const searchResult = this.props.searchQuery.seacrhQuery
      let coll = []
      searchResult.map(result => {
        if (result.boardName) {
          coll.push(<Board title={result.boardName} altStyle={{ width: this.state.width, height: this.state.height }} p boardId={result.id} padding={20} />)
        } else if (result.topicContent) {
          coll.push(<Topic title={result.topicName} imgUrl={'http://localhost:4000/uploads/' + result.topicPic} topicId={result.id} content={result.topicContent}
            altStyle={{ width: this.state.width, height: this.state.height, backgroundImage: `url(http://localhost:4000/uploads/${result.topicPic}` }} padding={20} />)
        }
      })
      return coll
    }
  }
  render () {
    return (
      <div className='search' style={{ marginTop: '10%' }}>
        <TopBar style={{ 'zIndex': 999 }} />
        <div style={{ marginLeft: '10%' }}>
          {this.loadResults()}
        </div>
      </div>
    )
  }
}
const _mapStateToProps = (state, props) => ({ ownProps: props })
export default compose(connect(_mapStateToProps), graphql(searchQuery, { name: 'searchQuery',
  options: ownProps => ({
    variables: {
      query: ownProps.match.params.searchQuery
    }
  }) }))(Search)
