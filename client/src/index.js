import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

class Root extends Component  {
  render () {
    return (
      <AlertProvider template={AlertTemplate}>
        <App />
      </AlertProvider>
    )
  }
}
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
