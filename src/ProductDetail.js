import React, { Component } from 'react';

class ProductDetail extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/Inventory/" + this.props.selectedId, {
      headers: {
        Authorization: this.props.token
      }
    }).then(res => res.json()).then(res => this.setState({ productDetail: res }))
  }
  render() {
    return (
      <div>
        {!this.state.productDetail && <div>Loading...</div>}
        {this.state.productDetail && <div>
          <h3>Availability:</h3>
          {this.state.productDetail.Flag}
          <h3>Item Number:</h3>
          {this.state.productDetail.Number}
          <h3>Item Name:</h3>
          {this.state.productDetail.Name}
          <h3>Quantity on Floor:</h3>
          {this.state.productDetail.Quantity}
          <h3>Location:</h3>
          {this.state.productDetail.Location}
          <h3>Comments:</h3>
          {this.state.productDetail.Comments}
          <h3>Manager:</h3>
          {this.state.productDetail.UserName}
        </div>}
      </div>
    );
  }
}

export default ProductDetail;
