import React,{Component} from 'react'

class Post extends Component {
  render(){
    var date = new Date(this.props.postTimeStamp*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    if(this.props.postAuthor===''){
      this.props.postAuthor = 'Anon'
    }
    return(
      <div className='post' id='post' style={this.props.altStyle}>
          <div className='postAuthor'>{this.props.postAuthor}</div>
          <div className='postTimeStamp'>{hours}:{minutes}:{seconds}</div>
          <div className='postContent'>{this.props.postContent}</div>
      </div>
    )
  }
}

export default Post