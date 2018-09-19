import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Placeholder',
      repliesCount: 999
    }
  }
  onClick(){
    const { history: { push } } = this.props;
    this.props.setBoardId(this.props.boardIds)
    this.setState({boardId:this.props.boardId})
    push('/b/'+this.props.title);
  }
  render () {
    return (
      <div id='Board' className='board' onClick={this.onClick.bind(this)} style={this.props.altStyle}>
        <div id='boardTitle' className='boardTitle'>{this.props.title}</div>
        <div id='boardRepliesCount' className='boardRepliesCount'>{this.props.repliesCount}</div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    boardId: state.boardId
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setBoardId: (boardId) => {
      dispatch({ type: 'Set_Borad_id', boardId: boardId })
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))
