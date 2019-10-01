import React, { Component } from "react";
import axios from "axios";
import Button from './Button';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentWillMount(){
    this.getAllProducts();
  }


  getAllProducts() {
    axios.get("http://localhost:5000/api/products/").then(res => {
      console.log(res);
      this.setState({ products: res.data });
    });
  }

  deleteProduct(id) {
    axios.delete('http://localhost:5000/api/products/'+id).then(res =>{
      console.log(res);
      alert("Product successfully deleted.");
    })
  }

  updateProduct() {
    axios.post('http://localhost:5000/api/products', {
    name: 'Catsandra',
    image: 'https://example.com/images/catsandra.jpg',
    description: 'Catsandra is the fanciest cat in town!'
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(err);
  });
  }

  render() {
    return (
      <table border="1">
        <tr>
          <td>Product ID</td>
          <td>Name</td>
          <td>Price</td>
          <td>Description</td>
          <td>Edit</td>
        </tr>
        {this.state.products.map(product => (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td><Button delete onClick={this.deleteProduct.bind(this,product._id)}>Delete</Button></td>
          </tr>
        ))}
      </table>
    );
  }
}

export default ProductList;
