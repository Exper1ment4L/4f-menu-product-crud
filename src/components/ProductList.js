import React, { Component } from "react";
import axios from "axios";
import Button from "./Button";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentWillMount() {
    this.getAllProducts();
  }
  
  getAllProducts() {
    axios.get("http://localhost:5000/api/products/").then(res => {
      console.log(res);
      this.setState({ products: res.data });
    });
  }

  deleteProduct(id) {
    axios.delete("http://localhost:5000/api/products/" + id).then(res => {
      console.log(res);
      alert("Product successfully deleted.");
    });
  }

  updateProduct() {
    axios
      .post("http://localhost:5000/api/products", {
        name: "Catsandra",
        image: "https://example.com/images/catsandra.jpg",
        description: "Catsandra is the fanciest cat in town!"
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
      <table border="1" align="center" width="50%">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody align="center">
          {this.state.products.map(product => (
            <tr key={product._id}>
              <th scope="row">{this.state.products.indexOf(product) + 1}</th>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td align="left" width="250px">
                <Button
                  delete
                  onClick={this.deleteProduct.bind(this, product._id)}
                >
                  Delete
                </Button>
                <Button
                  update
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ProductList;
