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
    login(username:$username ,password:$password){
      username
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

export { loginRequest, createUserReuqest, loadBoards }
