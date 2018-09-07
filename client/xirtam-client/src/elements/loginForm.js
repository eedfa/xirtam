import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { loginRequest } from '../requests/graphqlRequests.js'
import Modal from 'react-modal'
import { Button } from 'react-materialize'
class loginForm extends Component {
  constructor (props) {
    super(props)
    console.log(loginRequest)
    this.state = {
      'username': '',
      'password': '',
      'modalOpen': false
    }
    this.customStyles = {
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
  onOpenModal () {
    this.setState({ 'modalOpen': true })
  }
  onCloseModal () {
    this.setState({ 'modalOpen': false })
  }

  submit (e) {
    e.preventDefault()
    console.log(this.props)
    this.props.loginRequest({
      variables: {
        username: this.state.username,
        password: this.state.password
      }
    })
  }
  render () {
    return (
      <div class='loginForm'>
        <Button waves='light' onClick={this.onOpenModal.bind(this)}> Sing in
        </Button>
        <Modal
          isOpen={this.state.modalOpen}
          onCloseModal={this.onCloseModal.bind(this)}
          style={this.customStyles}>

          <form onSubmit={this.submit.bind(this)}>
            <div className='input-field'>
              <label htmlFor='username'>username</label>
              <input id='username' type='text' onChange={(e) => { this.setState({ 'username': e.target.value }) }} />
            </div>
            <div className='input-field'>
              <label htmlFor='password'>password</label>
              <input type='password' id='password' onChange={(e) => { this.setState({ 'password': e.target.value }) }} />
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

export default compose(graphql(loginRequest, { name: 'loginRequest' }))(loginForm)
