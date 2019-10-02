import React, { Component } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import ProductList from "../components/ProductList";
import axios from "axios";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      description: ""
    };
  }

  addProduct() {
    axios
      .post("http://localhost:5000/api/products", {
        name: this.state.name,
        price: this.state.price,
        description: this.state.description
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
      alert(this.state.name +""+ "Added successfully.")
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div align="center">
        <h1>4F</h1>
        <h1>Add new product</h1>
        <table>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
          </tr>
          <tr>
            <td>
              <TextField
                value={this.state.name}
                onChange={this.handleInputChange.bind(this)}
                placeholder="Name"
                name="name"
              />
            </td>
            <td>
              <TextField
                value={this.state.price}
                onChange={this.handleInputChange.bind(this)}
                placeholder="Price"
                name="price"
              />
            </td>
            <td>
              <TextField
                value={this.state.description}
                onChange={this.handleInputChange.bind(this)}
                placeholder="Description"
                name="description"
              />
            </td>
            <td>
              <Button onClick={this.addProduct.bind(this)}>Add</Button>
            </td>
          </tr>
        </table>

        <h2 align="center">List of products</h2>
        <ProductList />
      </div>
    );
  }
}

export default index;
