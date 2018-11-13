import React, { Component } from 'react'

class Share extends Component {
  shareFacebook () {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '', 'width=400,height=300')
  }
  shareTwitter () {
    window.open('https://twitter.com/intent/tweet?text=' + window.location.href, '', 'width=400,height=300')
  }

  render () {
    return (
      <div className='share'>
        <div onClick={this.shareFacebook.bind(this)}>facebook</div>
        <div onClick={this.shareTwitter.bind(this)}>twitter</div>
      </div>

    )
  }
}
export default Share
