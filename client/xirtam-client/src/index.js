import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from "apollo-boost";
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
    uri:"127.0.0.1:4000/graphql"

});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
