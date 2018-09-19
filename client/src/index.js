import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ApolloClient from 'apollo-boost'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import rootReducer from './reducers/rootReducer.js'
import RootRouter from './routers/rootRoute.js'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createUploadLink} from 'apollo-upload-client'
import './css/board.css'
import './css/topic.css'
import './css/post.css'
import './css/createPost.css'
import './css/boardSpacing.css'
const initialState = {
  token: ''
}
const store = createStore(rootReducer, initialState)
const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000/graphql', 
  cache: new InMemoryCache(),
  link:createUploadLink(),
  request: async (operation) => {
    console.log('store.getState().token')
    console.log(store.getState().token)
    operation.setContext({
      headers: {
        'x-access-token': store.getState().token
      } })
  }

})
ReactDOM.render(<Provider store={store}><BrowserRouter><ApolloProvider client={client}><RootRouter /></ApolloProvider></BrowserRouter></Provider>, document.getElementById('root'))

registerServiceWorker()
