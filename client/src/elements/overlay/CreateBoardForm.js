import React, { Component } from 'react'
import Modal from 'react-modal'
import { compose, graphql } from 'react-apollo'
import { addBoard } from '../../requests/graphqlRequests.js'
import { connect } from 'react-redux'
import M from 'materialize-css'
import '../../css/topBar.css'
class CreateBoardForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      boardName: ''
    }
    this.style = {
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
  onClose () {
    this.setState({ isOpen: false })
  }
  onOpen () {
    this.setState({ isOpen: true })
  }
  onSubmitForm (e) {
    e.preventDefault()
    window.outToken = this.props.token
    this.props.addBoard({ variables: {
      boardName: this.state.boardName
    } }).then(data => {
      this.onClose()
      window.location.reload()
    }).catch(() => {
      this.onClose()
      M.toast({ html: 'Please login' })
    })
  }
  render () {
    return (
      <div className='createBoardForm' >
        <div waves='light' onClick={this.onOpen.bind(this)}>Create Board</div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.onClose.bind(this)}
          style={this.style}>
          <form onSubmit={this.onSubmitForm.bind(this)} >
            <div className='boardName'>
              <label htmlFor='boardName'>Board Name</label>
              <input id='boardName' autoFocus onChange={e => { this.setState({ boardName: e.target.value }) }} />
            </div>
            <button class='btn wave-effect wave-light' type='submit' name='action'>
                Submit
            </button>
          </form>
        </Modal>
      </div>

    )
  }
}

const _mapStateToProps = state => ({ token: state.token })

export default compose(connect(_mapStateToProps), graphql(addBoard, {
  name: 'addBoard' }))(CreateBoardForm)
