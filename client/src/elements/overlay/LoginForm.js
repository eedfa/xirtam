import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { loginRequest } from '../../requests/graphqlRequests.js'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import M from 'materialize-css'
import '../../css/topBar.css'
const GlobalState = React.createContext()
class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.initClient = this.initClient.bind(this)
    this.auth2 = null
    window.app = window.app || {}
    const gapiPromise = (function () {
      return new Promise((resolve, reject) => {
        window.onLoadCallback = function () {
          resolve()
        }
      }
      )
    }())
    window.app.gapiPromise = gapiPromise
    this.state = {
      'user': {
        userImageUrl: null
      },
      'username': '',
      'password': '',
      'modalOpen': false,
      'token': ''
    }
    this.customStyles = {
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

  onOpenModal () {
    this.oauth2()
    this.setState({ 'modalOpen': true })
  }

  onCloseModal () {
    this.setState({ 'modalOpen': false })
  }

  initClient () {
    window.app.gapiPromise.then(() => {
      let self = this
      window.gapi.load('auth2', {
        callback: function () {
          self.auth2 = window.gapi.auth2.init({
            clientId: '17201176570-3a02te0df7oaj5pgqftmu9m8jielep5l.apps.googleusercontent.com'
          })
          self.auth2.then(() => { self.attachSignin(document.getElementById('img-google')) })
        },
        timeout: 5000
      }
      )
    })
  }

  attachSignin (element) {
    const singInCb = this.onSignIn.bind(this)
    this.auth2.attachClickHandler(element, {}, singInCb)
  }

  onSignIn (mess) {
    this.onCloseModal()
    if (mess.Zi.id_token !== '') {
      M.toast({ html: 'Logged in' })
    }
    this.setState({ 'token': mess.Zi.id_token })
    this.props = {
      ...this.props,
      setProfile: (mess.w3.ig, mess.w3.U3),
      setTokenGoogle: (mess.Zi.id_token)
    }
  }

  async oauth2 () {
    this.initClient()
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
    if (token.data.loginQuery.token !== '') {
      M.toast({ html: 'Logged in' })
    }
    this.props = {
      ...this.props,
      setProfile: (token.data.loginQuery.username, token.data.loginQuery.email),
      setToken: (token.data.loginQuery.token) }
    this.setState({ 'token': token.data.loginQuery.token })
  }
  componentDidMount () {
    let script2 = document.createElement('script')

    script2.src = 'https://apis.google.com/js/api.js'
    script2.defer = true

    document.body.appendChild(script2)
    let script = document.createElement('script')
    script2 = {
      ...script2,
      src: 'https://apis.google.com/js/platform.js?onload=onLoadCallback',
      defer: true
    }

    document.body.appendChild(script)
  }

  render () {
    return (
      <div >
        <GlobalState.Provider
          value={this.state.theme}>
          <Modal
            isOpen={this.state.modalOpen}
            onCloseModal={this.onCloseModal.bind(this)}
            style={this.customStyles}>
            <form onSubmit={this.submit.bind(this)}>
              <div className='input-field'>
                <label htmlFor='username'>username</label>
                <input id='username' type='text' onChange={e => { this.setState({ 'username': e.target.value }) }} />
              </div>
              <div className='input-field'>
                <label htmlFor='password'>password</label>
                <input type='password' id='password' onChange={e => { this.setState({ 'password': e.target.value }) }} />
              </div>
              <button class='btn wave-effect wave-light' type='submit' name='action'>
          Submit
              </button>
            </form>
            <div class='googleOathButton'>
              <img id='img-google' onDidMount={this.initClient.bind(this)} userImageUrl={this.state.user.userImageUrl} src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png' />
            </div>
          </Modal>
          <div waves='light' onClick={this.onOpenModal.bind(this)}> Sing in
          </div>
        </GlobalState.Provider>
      </div>
    )
  }
}

const _mapStateToProps = state => ({
  token: state.token,
  tokenGoogle: state.tokenGoogle
})
const _mapDispatchToProps = (dispatch) => ({

  setToken: (token) => { dispatch({ type: 'Set_token', token: token }) },
  setTokenGoogle: (token) => { dispatch({ type: 'Set_token_google', tokenGoogle: token }) },
  setProfile: (username, email) => {
    dispatch({ type: 'Set_profile', profileEmail: email, profileUsername: username })
  }

})

export default compose(connect(_mapStateToProps, _mapDispatchToProps), graphql(loginRequest, { name: 'loginRequest' }))(LoginForm)
