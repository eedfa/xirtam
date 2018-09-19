import React ,{Component} from 'react'
import {graphql , compose} from 'react-apollo'
import {addTopicPost} from '../requests/graphqlRequests.js' 
import Dropzone from 'react-dropzone'
import '../css/post.css'
import M from 'materialize-css'
class CreatePost extends Component{

constructor(props){
    super(props)
    this.state = {
      title:'',
      link:'',
      content:'',
      file:Buffer,
      imageView:'hiddenView',
      textView:'showView',
      linkView:'hiddenView',
      imageTab:'nonActiveTab',
      textTab:'activeTab',
      linkTab:'nonActiveTab'
    }
}
setViewVisible(viewClassName,tabClassName){
  this.setState({ imageView:'hiddenView',
  textView:'hiddenView',
  linkView:'hiddenView',
  imageTab:'nonActiveTab',
  textTab:'nonActiveTab',
  linkTab:'nonActiveTab'})
  this.setState({[viewClassName]:'showView',
  [tabClassName]:'activeTab'})
  
}
submitPost(){
// Some day will upload file with graphql. Some day...
  this.props.addTopicPost({variables:{
    topicName: this.state.title ,
    topicContent: this.state.content,
    topicMainId: this.props.topicMainId,
    topicType:this.state.topicType}}).then((data)=>{ 
      this.props.closeModal()
      window.location.reload();
    }).catch((error) => {
      M.toast({ html: 'Please login' })
      this.props.closeModal()
     
    });

}
render(){
  
  return(
      <div className='createPost'>
        <div  className='createPostTab'>
          <div className={this.state.imageTab} onClick={this.setViewVisible.bind(this,'imageView','imageTab')}> <div className='tabText'> image</div> </div>
          <div className={this.state.textTab} onClick={this.setViewVisible.bind(this,'textView','textTab')}> <div className='tabText'>text </div></div>
          <div className={this.state.linkTab} onClick={this.setViewVisible.bind(this,'linkView','linkTab')}>  <div className='tabText'>link</div> </div>
        </div>
        <div className={this.state.imageView}>
          <label>Place title</label>
          <textarea className='postTitleInput' onChange={(e)=>{this.setState({title:e.target.value})}}/>
          <div className='submitPostButton' onClick={this.submitPost.bind(this)}>  <div className='tabText'>Post </div></div>
        </div>
        <div className={this.state.textView}>
          <label >Place title</label>
          <textarea className='postTitleInput' onChange={(e)=>{this.setState({title:e.target.value})}}/>
          <label className='textViewContetnLabel' htmlFor='textViewContentInput'>Write post ...</label>
          <textarea className='postContentInput' onChange={(e)=>{this.setState({content:e.target.value})}}/>
          <div className='submitPostButton' onClick={this.submitPost.bind(this)}>  <div className='tabText'>Post </div></div>
          </div>
        <div className={this.state.linkView}>
          <label>Place title</label>
          <textarea className='postTitleInput' onChange={(e)=>{this.setState({title:e.target.value})}}/>
          <label className='linkViewContetnLabel' htmlFor='linkViewContentInput'>Place link ...</label>
          <textarea className='postContentInput' style={{height:'30%'}} onChange={(e)=>{this.setState({link:e.target.value})}}/>
          <div className='submitPostButton' onClick={this.submitPost.bind(this)}>  <div className='tabText'>Post </div></div>
        </div>
      </div>

  )
}
}

export default compose(graphql(addTopicPost,{name:'addTopicPost'}))(CreatePost)