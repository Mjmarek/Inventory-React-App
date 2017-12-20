import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProductDetail from './ProductDetail';

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
      }).then(listRes => listRes.json())
        .then(listRes => this.setState({productList: listRes, token}))
    })
  }
  render() {
    let contentDiv = "Loading...";
    if (this.state.productList) {
      contentDiv = <ul>
        {this.state.productList.map(item => <li key={item.ProductId} onClick={e => this.setState({currentItem: item.ProductId})} >{item.Number}</li>)}
      </ul>
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Inventory Management</h1>
        </header>
        <h2><b>Product List</b></h2>
        <div>
          {!this.state.currentItem && contentDiv}
        </div>
        {this.state.currentItem && <ProductDetail selectedId={this.state.currentItem} token={this.state.token}/>}
      </div>
    );
  }
}

export default App;
