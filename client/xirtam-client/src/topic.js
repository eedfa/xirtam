import React, {Component} from 'react';

class Topic extends Component{
    render(){
        const {topics}  =this.props;
        const topicList = topics.map( topic =>{
            return (

        <div className = "topic">
            <div> {topic.topicName}</div>
            </div>
            )
        })
        return(
                <div className="topic-list">
                    { topicList}
                </div>
        )

    }


}
export default Topic;