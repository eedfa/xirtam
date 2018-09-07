import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { createUserReuqest } from '../requests/graphqlRequests.js'
import { Button } from 'react-materialize'
import M from 'materialize-css'
import Modal from 'react-modal'
class CreateUserForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      email: '',
      modalIsOpen: false
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
  submitForm (e) {
    e.preventDefault()
    if (this.state.password !== this.state.repeatPassword) {
      M.toast({ html: 'Please check your passwords' })
    } else if (this.state.email == '') {
      M.toast({ html: 'Please enter email' })
    } else {
      console.log(this.props)
      this.props.createUserReuqest({
        variables: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }
      })
    }
  }
  openModal () {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal () {
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }
  render () {
    return (

      <div className='CreateUserForm'>

        <Button waves='light' onClick={this.openModal.bind(this)}>Sing up</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal.bind(this)}
          style={this.customStyles}
        >

          <form onSubmit={this.submitForm.bind(this)}>
            <div className='username input-field' >
              <label htmlFor='username'>Username</label>
              <input type='text' id='username' onChange={(e) => { this.setState({ username: e.target.value }) }} />
              <label htmlFor='username' />
            </div>
            <div className='input-field'>
              <label htmlFor='password'>Password</label>
              <input id='password' type='password' onChange={(e) => { this.setState({ password: e.target.value }) }} />
            </div>
            <div className='input-field' >

              <label htmlFor='passwordRepeat'>Repeat Password</label>
              <input id='passwordRepeat' type='password' onChange={(e) => { this.setState({ repeatPassword: e.target.value }) }} />
            </div>

            <div className='input-field' >

              <label htmlFor='email'>Email</label>
              <input id='email' type='email' className='form-control' onChange={(e) => { this.setState({ email: e.target.value }) }} />
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

export default compose(graphql(createUserReuqest, { name: 'createUserReuqest' }))(CreateUserForm)
