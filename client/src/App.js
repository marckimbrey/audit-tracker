import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import './App.css';
import Table from './binTable/Table';
import AuditBin from './AuditBin';
import AddBin from './AddBin';
import Login from './Login';
import BinDetail from './BinDetail'

class App extends Component {
    state = {
    response:  '',
    user: false
  };

  componentDidMount() {
    if(window.localStorage.getItem('user')) {
      const user = JSON.parse(window.localStorage.getItem('user'));
      this.verifyUserToken(user.token)
    }
    this.callApi().then(res => this.setState(
        { response: res,
          binNumbers:res.map(bin =>  bin.bin)
        }))
      .catch(err => console.log(err));
    this.updateBin = this.updateBin.bind(this)
    this.addNewBin = this.addNewBin.bind(this)
    this.loginUser = this.loginUser.bind(this);
    this.deleteAudit = this.deleteAudit.bind(this)
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
    this.setState({response:[...this.state.response, newBin]})
  }

  loginUser = (user) => {
    console.log('user',user)
    localStorage.setItem('user', JSON.stringify(user))
    this.setState({user: user})
  }

  deleteAudit = (bin, dt) => {
    let updatedBin;
    let newBinState;
    const newAuditHistory = bin.auditHistory.filter((auditDate) => {
      return auditDate !== dt;
    })
    const lastAuditExist = newAuditHistory.filter(auditDate => {
      return (Date.parse(auditDate) === Date.parse(bin.lastAudit))
    })[0]

    if (!lastAuditExist) {
      newBinState = this.state.response.map(x => {
        if (x._id === bin._id) {
          x.auditHistory = newAuditHistory;
          x.lastAudit = newAuditHistory[newAuditHistory.length-1]
          updatedBin = x
          return x;
        }
        return x;
      })
    } else {
      newBinState = this.state.response.map(x => {
        if (x._id === bin._id) {
          x.auditHistory = newAuditHistory;
          updatedBin = x;
          return x;
        }
        return x;
      })
    }
    console.log('bin to update', updatedBin)
    fetch('/api/bins/deleteAudit',
      {method: 'PUT', headers: {"Content-Type": "application/json" },
      body:JSON.stringify({updatedBin})})
      .then(res => res.json())
      .then(updatedBin => {
        console.log(updatedBin)
        })
    this.setState({response: newBinState})

  }

  verifyUserToken = (token) => {
    fetch('/api/users/verifyToken',
      {method: 'POST', headers: {"Content-Type": "application/json" },
      body:JSON.stringify({token:token})})
      .then(res => res.json())
      .then(user => {
          if (user.user.token) {
            this.setState({user: user.user})
          }
        })
  }

  render() {

  return (
    <Router>
      <div className="App">
        <Route path="/" exact
          {...this.props}
          render={props => {
            if(this.state.user) {
              return (<div className="App">
                <AuditBin binNumbers={
                  this.state.binNumbers} updateBin={this.updateBin}/>
                <Table bins={this.state.response} />
                <AddBin addNewBin={this.addNewBin} />
              </div>)
            } else {
                return (<div className="App">
                  <Login loginUser={this.loginUser} />
                </div>)
            }}}
        />
        <Route path='/bin/:id' render={(props) => {
          return(
            <BinDetail
              {...props}
              bin={this.state.response}
              deleteAudit={this.deleteAudit}
             />
          )
        }}
        />
      </div>
    </Router>
  )}
}

export default App;
