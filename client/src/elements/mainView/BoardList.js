import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import Board from './Board.js'
import BoardSpacing from './BoardSpacing.js'
import { loadBoards, loadBoardsBoardcast } from '../../requests/graphqlRequests.js'
import { connect } from 'react-redux'

const _ = require('lodash')
class BoardList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boards: [],
      subBoards: [],
      width: 500,
      height: 80,
      columns: 3,
      boardId: '',
      searchResult: [],
      imgUrl: ''
    }
  }

  updateDimension () {
    const columns = Math.round(window.innerWidth / 500)
    const width = (80 / columns) + '%'
    let height = 80
    if (window.innerWidth < 800) {
      height = window.innerWidth / 10
    }
    this.setState({ width,
      columns,
      height })
  }
  componentWillMount () {
    this.updateDimension.bind(this)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimension.bind(this))
  }
  componentDidMount () {
    /*
    this.props.loadBoards.subscribeToMore({
      document: loadBoardsBoardcast,
      variables: { },
      updateQuery: (prev, subscriptionData) => {
        if (!subscriptionData.data) return prev
        const newBoards = this.state.subBoards
        newBoards.push(subscriptionData.data.loadBoardsBoardcast)
        this.setState({ subBoards: newBoards })
      }
    }) */
    window.addEventListener('resize', this.updateDimension.bind(this))
  }

  load () {
    let props = this.props
    if (this.props.searchResult !== undefined) {
      /*
      props.loadBoards = {
        ...props.loadBoards,
        boards: this.props.searchResult,
        loading: false,
        error: null,
        length: 1
      }
      */
      props.loadBoards.boards = this.props.searchResult
      props.loadBoards.loading = false
      props.loadBoards.error = null
      props.loadBoards.length = 1
    }
    if (props.loadBoards.loading ||
        props.loadBoards.error ||
        props.loadBoards.length === 0) {
      return
    }
    let boards = props.loadBoards.boards
    boards = boards.concat(this.state.subBoards)
    const boardsColumns = []
    let currentColum = 0
    boards.map((board, i) => {
      if (i % this.state.columns === 0) {
        boardsColumns.push([])
        currentColum = i / this.state.columns
      }
      boardsColumns[currentColum].push(boards[i])
    }
    )
    const collection = _.zip(boardsColumns)
    return collection.map((board) => {
      if (board[0] !== undefined) {
        const coll = []
        board[0].map((element) => {
          coll.push(<Board title={element.boardName} boardId={element.id} altStyle={{ width: this.state.width, height: this.state.height }} padding={20} />)
        })
        return (
          <div className='boardList'>
            <style>
              {`
                      :root{
                        --imgUrl: url( ${this.state.imgUrl});
                      }
                    `}
            </style>
            {coll}
            <BoardSpacing />
          </div>
        )
      }
    })
  }
  render () {
    if (this.props.loadBoards.loading) {
      return (<div >
        <div className='boardList'>
          <div className='loading' >Loading..</div>
        </div>
      </div>)
    }
    if (this.props.loadBoards.error) {
      console.log(this.props.loadBoards)

      return (<div >
        <div className='boardList'>
          <div className='loading' >no connection to main server</div>
        </div>
      </div>)
    }
    if (this.props.loadBoards.length === 0) {
      return (<div >
        <div className='boardList'>
          <div className='loading' >no boards</div>
        </div>
      </div>)
    }
    return (
      <div >
        <div className='boardList'>

          {this.load()}
        </div>
      </div>
    )
  }
}

const _mapStateToProps = (state, props) => ({ searchResult: state.searchResult })
console.log(loadBoards.kind)
console.log('loadBoards.kind')
export default compose(connect(_mapStateToProps), graphql(loadBoards, { name: 'loadBoards' }))(BoardList)
