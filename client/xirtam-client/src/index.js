import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ApolloClient from 'apollo-boost'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000/graphql'
})

ReactDOM.render(<ApolloProvider client={client}> <App /> </ApolloProvider>, document.getElementById('root'))

registerServiceWorker()
