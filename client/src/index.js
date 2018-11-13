import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { split } from 'apollo-link'
import ApolloClient from 'apollo-client'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import rootReducer from './reducers/rootReducer.js'
import RootRouter from './routers/RootRouter.js'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import './css/board.css'
import './css/topic.css'
import './css/post.css'
import './css/createPost.css'
import './css/boardSpacing.css'
import './css/topBar.css'
import './css/loginForm.css'
import './css/rating.css'
import './css/share.css'
import conf from './config.js'
const initialState = {
  token: ''
}
const linkCompose = split(query => {
  const { kind, operation } = getMainDefinition(query)
  return kind === 'OperationDefinition' && operation === 'subscription'
},
new WebSocketLink({
  uri: conf.remoteWebSocket,
  options: {
    reconnect: true
  }
}),
createUploadLink({ uri: conf.remoteServer })
)

const store = createStore(rootReducer, initialState)
const client = new ApolloClient({
  ssrMode: typeof window !== 'undefined',
  cache: new InMemoryCache(),
  link: linkCompose,
  uri: conf.remoteServer })
ReactDOM.render(<Provider store={store}><BrowserRouter><ApolloProvider client={client}><RootRouter /></ApolloProvider></BrowserRouter></Provider>, document.getElementById('root'))

registerServiceWorker()
