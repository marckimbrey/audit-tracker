import React, { Component } from 'react';
import './App.css';
import Table from './binTable/Table'

class App extends Component {
    state = {
    response:  ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/bins');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Table bins={this.state.response} />
      </div>
    );
  }
}

export default App;
