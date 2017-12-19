import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    fetch("http://localhost:3000/Token", {
    method:"POST",  
    body:new URLSearchParams({
        grant_type:"password",
        username:"Manager3@email.com",
        password:"Password#3"
    })  
    }).then(response => response.json()).then(response => {
      let token = "Bearer " + response.access_token;
      fetch("http://localhost:3000/api/Inventory", {
        headers: {
          Authorization: token
        }
      }).then(listRes => listRes.json()).then(listRes => this.setState({productList: listRes}))
    })
  }
  render() {
    let contentDiv = "loading";
    if (this.state.productList) {
      contentDiv = JSON.stringify(this.state.productList)
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Inventory Management</h1>
        </header>
        <div>
          {contentDiv}
        </div>
      </div>
    );
  }
}

export default App;