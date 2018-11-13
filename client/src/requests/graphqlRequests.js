import gql from 'graphql-tag'

const createUserReuqest = gql`
  mutation($username: String!, $password: String!, $email: String!){
    addUser(username:$username,passwordHash:$password,email:$email){
      id
    } 
  }
`
const loginRequest = gql`
mutation ($username: String, $password: String){
  loginQuery(username:$username ,password:$password){
    token,
    username,
    email
  }
  }
`
const loadBoards = gql`
query($boardName:String,$boardId:String){
  boards(boardName:$boardName,boardId:$boardId){
    boardName id ratingAmount ratingScore
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
    topicName,topicContent,topicTimeStamp,id,topicPic
  }
}

`
const addTopicPost = gql`
mutation(    $topicName: String,
  $topicContent: String,
  $topicMainId: String,
  $topicMainName: String,
  $topicType: Int,
  $files: Upload){
  addTopicPost(
    topicMainName:$topicMainName,
    topicName:$topicName,
    topicContent:$topicContent,
    topicMainId:$topicMainId,
    topicType:$topicType,
    files:$files
  ){topicName}


}
`
const loadTopicPostsBoardcast = gql`
subscription loadTopicPostsBoardcast($topicId: String!){
  loadTopicPostsBoardcast(topicId: $topicId){
    topicName,
    topicContent,
    topicTimeStamp,
    topicBoardName,
    originPost,
    topicPic
  }
}
`
const loadTopicPosts = gql`
query loadTopicPosts($topicId: String!){
  loadTopicPosts(topicId: $topicId){
    topicName,topicContent,topicTimeStamp,id,topicPic
  }
}
`
const addTopicMutation = gql`
mutation($boardId: String,$boardName:String,$topicName: String ,$topicContent: String ,$topicType: Int,$file: Upload){
  addTopicMutation(topicName:$topicName,boardName:$boardName, topicContent:$topicContent,boardId:$boardId ,topicType:$topicType,file:$file){
    topicName,
    topicContent,
    boardId
  }
}
`

const searchQuery = gql`
  query seacrhQuery($query: String){
    seacrhQuery(query:$query){
      ... on Board {
        boardName
        id
        ratingAmount
        ratingScore
      }
      ... on Topic{
        topicName
        topicContent
        topicTimeStamp
        id
        topicPic
      }
    }
  }
`

const voteBoard = gql`
    mutation($boardId: String,$boardName: String, $rating: Int){
      boardAddRating( boardId:$boardId,rating:$rating boardName:$boardName){
        id
      }
    }
`
const loadBoardsBoardcast = gql`
subscription loadBoardsBoardcast($boardName:String,$boardId:String){
  loadBoardsBoardcast(boardName:$boardName,boardId:$boardId){
    boardName id ratingAmount ratingScore
   }
}
`
const loadTopicsBoardcast = gql`
subscription loadTopicsBoardcast($boardName:String,$boardId:String){
  loadTopicsBoardcast(boardName:$boardName,boardId:$boardId){
    topicName,
    topicContent,
    topicTimeStamp,
    topicBoardName,
    topicPic
   }
}
`
const ratingBoardcast = gql`
subscription ratingBoardcast($boardName:String,$boardId:String){
    ratingBoardcast(boardName:$boardName,boardId:$boardId){
      ratingAmount ratingScore
     
  }
}
`
export { loginRequest, createUserReuqest, loadBoards, addBoard,
  topics, addTopicPost, loadTopicPosts, addTopicMutation,
  voteBoard, searchQuery, loadTopicPostsBoardcast,
  loadBoardsBoardcast, loadTopicsBoardcast, ratingBoardcast }
