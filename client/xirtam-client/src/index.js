import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ApolloClient from 'apollo-boost'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer.js'
const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000/graphql'
})
const store = createStore(rootReducer)
ReactDOM.render(<Provider store={store}><ApolloProvider client={client}> <App /> </ApolloProvider></Provider>, document.getElementById('root'))

registerServiceWorker()
