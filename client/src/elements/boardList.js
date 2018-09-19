import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import Board from './board.js'
import BoardSpacing from './boardSpacing.js'
import { loadBoards } from '../requests/graphqlRequests.js'

var _ = require('lodash');
class boardList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boards: [],
      width:500,
      height:80,
      columns:3,
      boardId:''
    }
  }
  updateDimension(){

    let columns =Math.round( window.innerWidth/500)
    let width =  (80/columns)+'%'
    let height = 80
    if (window.innerWidth<800){
        height = window.innerWidth/10
    }
    this.setState({width:width,
                   columns:columns,
                  height:height})

  }
  componentWillMount(){
    this.updateDimension.bind(this)
  }
  componentDidMount(){
    window.addEventListener('resize',this.updateDimension.bind(this))
  }
  
  load () {
    var data = this.props
    if (data.loadBoards.loading) {
      return <div className='loading' >Loading..</div>
    } else {
      if (data.loadBoards.error){
        return <div className='loading' >no connection to main server</div>
      }
      if (data.loadBoards.length === 0) {
        return <div className='loading' >no boards</div>
      } else {
        const boards = data.loadBoards.boards
        const boardsColumns = []
        let currentColum = 0
        for (let i =0 ; i < boards.length ;i++){
          if(i%this.state.columns ===0){
            boardsColumns.push([])
            currentColum = i/this.state.columns
          }
          boardsColumns[currentColum].push( boards[i])
        }
        let collection =  _.zip(boardsColumns)
        return collection.map((board) => {
          if (board[0] !== undefined){
            const coll = []
            for(let i = 0 ; i < board[0].length ; i++){
              coll.push(<Board title={board[0][i].boardName} boardIds={board[0][i].id} altStyle={{width:this.state.width,height:this.state.height}} padding={20} />)
            }
            return (
              <div className='boardList'>
                {coll}
                <BoardSpacing />
              </div>

            )
          }
        })
      }
    }
  }
  render () {
    return (
      <div >
        <div className='boardList'>
          {this.load()}
        </div>
      </div>
    )
  }
}

export default compose(graphql( loadBoards,{ name: 'loadBoards' }))(boardList)
