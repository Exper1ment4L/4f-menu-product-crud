import React, { Component } from 'react';
import Button from '../Button';
import TextField from '../TextField';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class ProductList extends Component {
  componentDidMount() {
    const { store } = this.props;
    store.getAll();
  }

  addProduct() {
    const { store } = this.props;
    store.addProduct();
    this.resetstore();
  }
  deleteProduct(id) {
    const { store } = this.props;
    store.setId(id);
    store.deleteProduct();
  }
  handleNameChange(e) {
    const { store } = this.props;
    store.setName(e.target.value);
  }
  handlePriceChange(e) {
    const { store } = this.props;
    store.setPrice(e.target.value);
  }
  handleDescChange(e) {
    const { store } = this.props;
    store.setDescription(e.target.value);
  }

  updateHandler(id) {
    const { store } = this.props;
    const updated = this.props.store.products.filter(
      product => product._id == id
    );
    store.setProduct({
      id: updated[0]._id,
      name: updated[0].name,
      price: updated[0].price,
      description: updated[0].description,
    });
    store.setEdit(true);
  }

  updateProduct() {
    const { store } = this.props;
    store.updateProduct();
    this.resetstore();
  }

  resetstore() {
    const { store } = this.props;
    store.setProduct({
      id: '',
      name: '',
      price: '',
      description: '',
    });
    store.isEdit = false;
  }

  render() {
    const { store } = this.props;
    return (
      <div>
        <div align="center">
          <h1>4F</h1>
          <h1>
            {store.isEdit == false ? 'Add new product' : 'Updating product'}
          </h1>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Price</td>
                <td>Description</td>
              </tr>
              <tr>
                <td>
                  <TextField
                    value={store.product.name}
                    onChange={this.handleNameChange.bind(this)}
                    placeholder="Name"
                    name="name"
                  />
                </td>
                <td>
                  <TextField
                    value={store.product.price}
                    onChange={this.handlePriceChange.bind(this)}
                    placeholder="Price"
                    name="price"
                  />
                </td>
                <td>
                  <TextField
                    value={store.product.description}
                    onChange={this.handleDescChange.bind(this)}
                    placeholder="Description"
                    name="description"
                  />
                </td>
                <td>
                  {store.isEdit == false ? (
                    <Button success onClick={this.addProduct.bind(this)}>
                      Add
                    </Button>
                  ) : null}
                  {store.isEdit == true ? (
                    <Button update onClick={this.updateProduct.bind(this)}>
                      Update
                    </Button>
                  ) : null}
                </td>
              </tr>
            </tbody>
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
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody align="center">
            {store.products.length > 0
              ? store.products.map(product => (
                  <tr key={product._id}>
                    <th scope="row">{store.products.indexOf(product) + 1}</th>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>
                      <Button
                        delete
                        onClick={this.deleteProduct.bind(this, product._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        update
                        onClick={this.updateHandler.bind(this, product._id)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductList;
