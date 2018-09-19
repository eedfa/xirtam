import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { loginRequest } from '../requests/graphqlRequests.js'
import Modal from 'react-modal'
import { Button } from 'react-materialize'
import { connect } from 'react-redux'
import M from 'materialize-css'
const GlobalState = React.createContext()
class loginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'username': '',
      'password': '',
      'modalOpen': false,
      'token': ''
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

  async submit (e) {
    e.preventDefault()
    this.onCloseModal()
    const token = await this.props.loginRequest({
      variables: {
        username: this.state.username,
        password: this.state.password
      }
    })
    if(token.data.loginMutation.token !== ''){
      M.toast({ html: 'Logged in' })
    }
    this.props.setToken(token.data.loginMutation.token)
    this.setState({ 'token': token.data.loginMutation.token })
  }
  render () {
    return (
      <div class='loginForm'>
        <GlobalState.Provider
          value={this.state.theme}
        >
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
        </GlobalState.Provider>
      </div>

    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      dispatch({ type: 'Set_token', token: token })
    }
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), graphql(loginRequest, { name: 'loginRequest' }))(loginForm)
