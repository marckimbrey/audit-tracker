import React, { Component } from 'react';
import './App.css';
import Table from './binTable/Table';
import AuditBin from './AuditBin';
import AddBin from './AddBin';
import Login from './Login';

class App extends Component {
    state = {
    response:  '',
    authorisedUser: false
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState(
        { response: res,
          binNumbers:res.map(bin =>  bin.bin)
        }))
      .catch(err => console.log(err));
    this.updateBin = this.updateBin.bind(this)
    this.addNewBin = this.addNewBin.bind(this)
    this.loginUser = this.loginUser.bind(this);
  }

  callApi = async () => {
    const response = await fetch('/api/bins');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  updateBin = (updatedBin) => {
    const newBinState = this.state.response.map((bin, x) => {
      return (bin.bin == updatedBin.bin)? updatedBin: bin;
    });

    this.setState({response: newBinState})
  }

  addNewBin = (newBin) => {
    console.log('newBin',newBin)
    this.setState({response:[...this.state.response, newBin]})
  }

  loginUser = (user) => {
    console.log('user', user)
    this.setState({authorisedUser: true})
  }

  render() {
    if(this.state.authorisedUser) {
      return (
        <div className="App">
          <AuditBin binNumbers={
            this.state.binNumbers} updateBin={this.updateBin}/>
          <Table bins={this.state.response} />
          <AddBin addNewBin={this.addNewBin} />
        </div>
      )
    } else {
      return(
      <Login loginUser={this.loginUser} />
      );
    }
  }
}

export default App;
