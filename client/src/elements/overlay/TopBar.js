import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Profile from './Profile.js'
import Modal from 'react-modal'
import CreateUserForm from './CreateUserForm.js'
import LoginForm from './LoginForm.js'
import CreateBoardForm from './CreateBoardForm.js'
import CreateTopic from './CreateTopic.js'
import CreatePost from './CreatePost.js'
import '../../css/topBar.css'
class TopBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      searchType: 0,
      openModal: false
    }
  }
  search () {
    const { history: { push } } = this.props
    push('/s/' + this.state.searchText)
  }
  openProfileModal () {
    this.setState({ openModal: true })
  }
  closeModal () {
    this.setState({ openModal: false })
  }
  loginProfile () {
    if ((this.props.token === undefined || this.props.token === '') && this.props.tokenGoogle === undefined) {
      return <div className='loginForm'><LoginForm /></div>
    } else {
      return <div className='loginForm' onClick={this.openProfileModal.bind(this)}>{this.props.username}</div>
    }
  }
  singUp () {
    if ((this.props.token === undefined || this.props.token === '') && this.props.tokenGoogle === undefined) {
      return <CreateUserForm className='styleButton' />
    }
  }
  createButton () {
    switch (this.props.button) {
      case 'board':
        return <CreateBoardForm className='styleButton' />
      case 'topic':
        return <CreateTopic className='styleButton' boardName={this.state.boardName} topicMainId={this.state.topicId} closeModal={this.closeModal.bind(this)} />
      case 'post':
        return <CreatePost className='styleButton' topicMainId={this.state.topicId} closeModal={this.closeModal.bind(this)} />
    }
  }
  render () {
    return (
      <div class='topBar'>
        <div class='searchInputBox'>
          <input type='text' onChange={e => { this.setState({ searchText: e.target.value }) }} /></div>
        <div class='searchButton' onClick={this.search.bind(this)}>SEARCH</div>
        {this.loginProfile()}
        {this.createButton()}
        {this.singUp()}
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal.bind(this)}
          className='profileModal'
        >
          <Profile className='profileModal' />
        </Modal>

      </div>
    )
  }
}

const _mapStateToProps = state => ({
  token: state.token,
  tokenGoogle: state.tokenGoogle,
  username: state.profileUsername
})
const _mapDispatchToProps = dispatch => ({
  searchResult: token => {
    dispatch({ type: 'Search_Result', token: token })
  }

})

export default withRouter(compose(connect(_mapStateToProps, _mapDispatchToProps))(TopBar))
