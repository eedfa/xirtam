import { gql } from 'apollo-boost'

const createUserReuqest = gql`
  mutation($username: String!, $password: String!, $email: String!){
    addUser(username:$username,passwordHash:$password,email:$email){
      id
    } 
  }
`
const loginRequest = gql`
mutation($username: String, $password: String){
  loginMutation(username:$username ,password:$password){
      token
    }
  }
`
const loadBoards = gql`
{
  boards{
    boardName id
   }
}

`
const addBoard = gql`
  mutation($boardName:String){
    boardAdd(boardName:$boardName){
      boardName
    }
  }
`

const topics = gql`
query($boardId:String , $boardName:String){
  topics(boardId:$boardId , boardName:$boardName){
    topicName,topicContent,topicTimeStamp,id
  }
}

`
const addTopicPost = gql`
mutation($topicName: String ,$topicContent: String,$topicMainId: String ,$topicType: Int){
    addTopicPost(topicName:$topicName, topicContent:$topicContent,topicMainId:$topicMainId ,topicType:$topicType){
      topicName,
      topicContent
    }

}
`

const loadTopicPosts = gql`
query loadTopicPosts($topicId: String!){
  loadTopicPosts(topicId: $topicId){
    topicName,topicContent,topicTimeStamp,id
  }
}
`
const createTopicMutation = gql`
mutation($boardId: String,$topicName: String ,$topicContent: String ,$topicType: Int){
  addTopicMutation(topicName:$topicName, topicContent:$topicContent,boardId:$boardId ,topicType:$topicType){
    topicName,
    topicContent
  }
}

`

export { loginRequest, createUserReuqest, loadBoards, addBoard, 
  topics, addTopicPost ,loadTopicPosts,createTopicMutation }
