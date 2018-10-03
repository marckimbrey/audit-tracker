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
    }).then(res => res.json())
    .then(user => this.props.loginUser(user))
    .catch(err => console.log(err));

    event.preventDefault();
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          username:
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
