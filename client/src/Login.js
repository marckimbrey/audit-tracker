import React, { Component } from 'react';


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const inputName = event.target.name;
    this.setState({[inputName]: event.target.value});
  }

  handleSubmit(event) {
   fetch('/api/users/login', {
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "Post",
      body: JSON.stringify(this.state)
    }).then(res => {
      if(res.status === 401) {
        this.props.showAlert("username and password did not match", 'error')
      }else if (res.status === 200) {
        return res.json()
      }

    })
    .then(user => {
      if (user) {
        this.props.loginUser(user)
      }
    })
    .catch(err => console.log(err));

    event.preventDefault();
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" className='login-input' value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" className='login-input' value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
