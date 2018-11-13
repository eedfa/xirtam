import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../css/profile.css'
class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      newPassword: '',
      currentPassword: ''
    }
  }
  onSaveChanges () {

  }
  render () {
    return (
      <div className='profile'>
        <label className='usernameLabel'>username</label>
        <input className='usernameInput' value={this.props.username} onChange={(e) => { this.setState({ username: e.target.value }) }} />
        <label className='newPasswordLabel'>new password</label>
        <input className='newPasswordInput' onChange={(e) => { this.setState({ newPassowrd: e.target.value }) }} />
        <label className='emailLabel'>email</label>
        <input className='emailInput' value={this.props.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
        <label className='currentPasswordLabel'>Current Password</label>
        <input className='currentPasswordInput' value='*********************' onChange={(e) => { this.setState({ currentPassword: e.target.value }) }} />
        <div className='saveChanges' onClick={this.onSaveChanges.bind(this)}>Save changes</div>
      </div>
    )
  }
}
const _mapStateToProps = state => ({
  username: state.profileUsername,
  email: state.profileEmail
})
export default connect(_mapStateToProps)(Profile)
