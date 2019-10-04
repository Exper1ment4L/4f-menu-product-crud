import React, { Component } from "react";
import Button from "./Button";
import TextField from "../components/TextField";
import { inject,observer } from 'mobx-react';

@inject('store')
@observer
class ProductList extends Component {
  
  
  constructor(props) {
    super(props);
    const { store } = this.props;
    store.getAll();
  }
  
  addProduct() {
    const { store } = this.props;
    store.addProduct()
  }
  deleteProduct(id) {
    const { store } = this.props;
    store.id=id;
    console.log("asdasd")
    store.deleteProduct()
  }
  handleNameChange(e) {
    const { store } = this.props;
    store.name = e.target.value
  }
  handlePriceChange(e) {
    const { store } = this.props;
    store.price = e.target.value
  }
  handleDescChange(e) {
    const { store } = this.props;
    store.description = e.target.value
  }

  updateHandler(id) {
    const { store } = this.props;
    const updated = this.props.store.products.filter(product=> product._id == id)
    store.id = updated[0]._id;
    store.name = updated[0].name;
    store.price = updated[0].price;
    store.description = updated[0].description;
    store.isEdit=true;
  }

  updateProduct() {
    const { store } = this.props;
    store.updateProduct();
    this.resetstore()
  }
  
  resetstore() {
    const { store } = this.props;
    store.id = ""
    store.name = ""
    store.price =""
    store.description=""
    store.isEdit=false;
  }

  render() {
    const { store } = this.props;
    return (
      <div>
        <div align="center">
        <h1>4F</h1>
        <h1>{store.isEdit==false ? "Add new product" : "Updating product"}</h1>
        <table>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
          </tr>
          <tr>
            <td>
              <TextField
                value={store.name}
                onChange={this.handleNameChange.bind(this)}
                placeholder="Name"
                name="name"
              />
            </td>
            <td>
              <TextField
                value={store.price}
                onChange={this.handlePriceChange.bind(this)}
                placeholder="Price"
                name="price"
              />
            </td>
            <td>
              <TextField
                value={store.description}
                onChange={this.handleDescChange.bind(this)}
                placeholder="Description"
                name="description"
              />
            </td>
            <td>
              {store.isEdit==false ? <Button onClick={this.addProduct.bind(this)}>Add</Button> : null}
              {store.isEdit==true ? <Button update onClick={this.updateProduct.bind(this)}>Update</Button>: null}
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
          {store.products.map(product => (
            <tr key={product._id}>
              <th scope="row">{store.products.indexOf(product) + 1}</th>
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
