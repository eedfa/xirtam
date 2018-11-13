import React, { Component } from 'react'

import BoardList from '../elements/mainView/BoardList.js'
import TopBar from '../elements/overlay/TopBar.js'
import '../css/main.css'

class Main extends Component {
  render () {
    return (
      <div className='main'>
        <BoardList className='boardWindow' />
        <TopBar button='board' style={{ 'zIndex': 999 }} />
      </div>
    )
  }
}

export default Main
