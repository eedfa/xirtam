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
    boardName
   }
}

`
const addBoard = gql`
  mutation($boardName:String){
    boardAdd(boardName:$boardName){
      boardId
    }
  }
`

export { loginRequest, createUserReuqest, loadBoards, addBoard }
