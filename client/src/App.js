import React, { Component } from 'react';
import './App.css';
import Table from './binTable/Table';
import AuditBin from './AuditBin';
import AddBin from './AddBin';

class App extends Component {
    state = {
    response:  ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState(
        { response: res,
          binNumbers:res.map(bin =>  bin.bin)
        }))
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
        <AuditBin binNumbers={
          this.state.binNumbers} />
        <Table bins={this.state.response} />
        <AddBin />
      </div>
    );
  }
}

export default App;
