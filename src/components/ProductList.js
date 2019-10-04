import React, { Component } from "react";
import axios from "axios";
import Button from "./Button";
import TextField from "../components/TextField";
import { inject,observer } from 'mobx-react';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      name: "",
      price: "",
      description: "",
      id:"",
      isEdit: false
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getAllProducts();
  }

  addProduct() {
    axios
      .post("http://localhost:5000/api/products", {
        name: this.state.name,
        price: this.state.price,
        description: this.state.description
      })
      .then(response=>{
        response.status==200 ? this.getAllProducts() : alert('asdasd')
      })
      .catch(function(error) {
        console.log(error);
      });
      
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  getAllProducts() {
    axios.get("http://localhost:5000/api/products/").then(res => {
      this.setState({ products: res.data });
    });
    this.stateReset();
  }

  deleteProduct(id) {
    axios.delete("http://localhost:5000/api/products/" + id).then(res => {
      console.log(res);
      res.status==200 ? this.getAllProducts() : null
    });
  }

  updateHandler(id) {
    const updated = this.state.products.filter(product => product._id == id)
    console.log(updated[0].name)
    this.setState({
      id:updated[0]._id,
      name:updated[0].name,
      price:updated[0].price,
      description:updated[0].description,
      isEdit:true,
    })
  }

  stateReset() {
    this.setState({
      id:"",
      name:"",
      price:"",
      description:"",
      isEdit: false
    })
  }

  updateProduct(id) {
    axios
      .put("http://localhost:5000/api/products/"+id, {
        name: this.state.name,
        price : this.state.price,
        description: this.state.description
      })
      .then(response => {
        console.log(response);  
        response.status=200 ? this.getAllProducts() : null
      })
      .catch(error => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div align="center">
        <h1>4F</h1>
        <h1>{this.state.isEdit==false ? "Add new product" : "Updating"+" " +this.state.name +" "+  "product"}</h1>
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
              {this.state.isEdit==true ? <Button update onClick={this.updateProduct.bind(this,this.state.id)}>Update</Button>: null}
            </td>
          </tr>
        </table>
      </div>
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
                  onClick={this.updateHandler.bind(this,product._id)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    );
  }
}

export default ProductList;
