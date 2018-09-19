import React , {Component} from 'react'
import { compose, graphql} from 'react-apollo'
import {loadTopicPosts} from '../requests/graphqlRequests.js'
import Post from '../elements/post.js'
import CreatePost from '../elements/createPost.js'
import Modal from 'react-modal'
import { Button } from 'react-materialize'
class TopicView extends Component{
  constructor(props){
    super(props)
    this.state ={
      topicId:this.props.match.params.topicId,
      posts:[],
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

  loadPosts(){
    let posts = []
    if (this.props.loadTopicPosts.loading){
       return(<div className='loadig'>Loading...</div>  )
    } else{
      posts = this.props.loadTopicPosts.loadTopicPosts
 
    }
    return posts.map(post=>{
      return(
        <Post postContent={post.topicContent} postTimeStamp={post.topicTimeStamp} postAuthor='tbd'/>
      )
    })
  }
  openModal () {
    this.setState({ modalIsOpen: true })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }
  render(){

    return(
      <div className='topicView'>
           <Button className='createPostButton' onClick={this.openModal.bind(this)}>Create post</Button>
           <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal.bind(this)}
              style={this.customStyles}>
             <CreatePost topicMainId={this.state.topicId} closeModal={this.closeModal.bind(this)}/>
           </Modal>
          {this.loadPosts()}      
      </div>
    )
  }

}

export default compose(graphql(loadTopicPosts,{ name:'loadTopicPosts',
options: (ownProps) => ({
  variables: {
    topicId: ownProps.match.params.topicId
  }
})}))(TopicView)