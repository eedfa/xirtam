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
const initialState = {
  token: ''
}

const store = createStore(rootReducer, initialState)
const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000/graphql',
  request: async (operation) => {
    console.log('store.getState().token')
    console.log(store.getState().token)
    operation.setContext({
      headers: {
        'x-access-token': store.getState().token
      } })
  }

})
ReactDOM.render(<Provider store={store}><ApolloProvider client={client}> <App /> </ApolloProvider></Provider>, document.getElementById('root'))

registerServiceWorker()
