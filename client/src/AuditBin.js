import React, { Component } from 'react';


export default class AuditBin extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
   fetch('/api/bins/update', {
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "PUT",
      body: JSON.stringify({bin: this.state.value})
    }).then(res => res.json())
    .then(newBin => this.props.updateBin(newBin))
    .catch(err => console.log(err));
    event.preventDefault();

  }

  render() {
    if(this.props.binNumbers) {
      console.log('loading bin numbers')

      this.options = this.props.binNumbers.map((bin, i) => {
        return <option key={i} value={bin}>{bin}</option>
      })

    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Bin:

        <select value={this.state.value} onChange={this.handleChange}>
          {this.options}
        </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
