import React, { Component } from 'react'
import Topic from '../elements/topic.js'
import { topics } from '../requests/graphqlRequests.js'
import { compose, graphql,Query } from 'react-apollo'
import { Button } from 'react-materialize'
import Modal from 'react-modal'
import { gql } from 'apollo-boost'
import { connect } from 'react-redux'
import CreateTopic from '../elements/createTopic.js'
import { withRouter } from 'react-router'
var _ = require('lodash');

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boardName: '',
      topicList: [],
      columns:20,
      width:200,
      height:200,
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
  openModal () {
    this.setState({ modalIsOpen: true })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
    window.location.reload();
  }
  resize(){
    let height = 200
    let columns = Math.round(window.innerWidth/200)
    let width  = (80/columns)+'%'
    if (window.innerWidth <300){
      height = window.innerWidth
    }
    this.setState({
      height:height,
      width:width,
      columns:columns
    })
  }
  componentWillMount(){
    this.resize.bind(this)
  }
  componentDidMount(){
    let boardName = this.props.match.params.boardName
    this.setState({ boardName: boardName })
    window.addEventListener('resize',this.resize.bind(this))
  }

  loadBoard () {
    const result =  null
  
    let data = this.props.topics
    if (data.loading){
      return(<div className='loading'>Loading...</div>)
    }else{
        if(data.topics.length === 0){
          return(<div className='loading'>No topics</div>)
        }
        const topicsColums = []
        const topics =data.topics 
        let currentColum = 0
        for(let i = 0 ;i < topics.length;i++){
          if(i%this.state.columns === 0){
              topicsColums.push([])
              currentColum = i/this.state.columns
          }
          topicsColums[currentColum].push(topics[i])
        }
        const collection = _.zip(topicsColums)
        return collection.map((topic)=>{
          if(topic[0]!== undefined){
            let col = []
            for(let i = 0 ; i < topic[0].length; i++){
                col.push(<Topic  title={topic[0][i].topicName} topicId={topic[0][i].id} 
                boardName={this.state.boardName} content={topic[0][i].topicContent} altStyle={{width:this.state.width,height:this.state.height}} padding={20} />)
            }
            return (
              <div className='topicList'>
                {col}
              </div>
  
            )

          }
        })

    }
  }

  render () {
    return (
      <div> 
        <div className='topicView'>
            <Button className='createPostButton' onClick={this.openModal.bind(this)}>Create post</Button>
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal.bind(this)}
                style={this.customStyles}>
              <CreateTopic topicMainId={this.state.topicId} closeModal={this.closeModal.bind(this)}/>
            </Modal>    
        </div>
        {this.loadBoard()}
      </div>
    )
  
}
}
const mapStateToProps = (state,props) => {
  console.log('state')
  console.log(props.match.params.boardName)
  return (

    {
      ownProps: props,
      boardId: state.boardId
    }
  )
}

export default  compose(connect(mapStateToProps),graphql(topics, { name: 'topics', 
  options: ({ ownProps,boardId }) => ({
    variables: { boardId:boardId,
                 boardName: ownProps.match.params.boardName}})
    
  }))(Board)
