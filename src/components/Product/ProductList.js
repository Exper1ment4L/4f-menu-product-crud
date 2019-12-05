import React, { Component } from 'react';
import Button from '../Button';
import TextField from '../TextField';
import Container from '../Container';
import Col from '../Col';
import Row from '../Row';
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
      <Container fluid>
        <Row>
          <Col>
            <h1>
              {store.isEdit == false
                ? 'Ürünler Listesi  '
                : 'Ürün Güncelleniyor'}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md="2"></Col>
          <Col>
            <Row>
              <Col>
                <TextField
                  value={store.product.name}
                  onChange={this.handleNameChange.bind(this)}
                  placeholder="Ürün Adı"
                  name="name"
                />
              </Col>
              <Col>
                <TextField
                  value={store.product.price}
                  onChange={this.handlePriceChange.bind(this)}
                  placeholder="Ürün Fiyatı"
                  name="price"
                />
              </Col>
              <Col>
                <TextField
                  value={store.product.description}
                  onChange={this.handleDescChange.bind(this)}
                  placeholder="Ürün Açıklaması"
                  name="description"
                />
              </Col>
              <Col>
                {store.isEdit == false ? (
                  <Button success onClick={this.addProduct.bind(this)}>
                    Ekle
                  </Button>
                ) : null}
                {store.isEdit == true ? (
                  <Button update onClick={this.updateProduct.bind(this)}>
                    Güncelle
                  </Button>
                ) : null}
              </Col>
            </Row>
          </Col>
          <Col md="2"></Col>
        </Row>
        <Row>
          <Col>
            <table border="1" align="center" width="50%">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ürün ID</th>
                  <th scope="col">Adı</th>
                  <th scope="col">Fiyatı</th>
                  <th scope="col">Açıklama</th>
                  <th scope="col">İşlem</th>
                </tr>
              </thead>
              <tbody align="center">
                {store.products.length > 0
                  ? store.products.map(product => (
                      <tr key={product._id}>
                        <th scope="row">
                          {store.products.indexOf(product) + 1}
                        </th>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                        <td>
                          <Button
                            delete
                            onClick={this.deleteProduct.bind(this, product._id)}
                          >
                            Sil
                          </Button>
                          <Button
                            update
                            onClick={this.updateHandler.bind(this, product._id)}
                          >
                            Düzenle
                          </Button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProductList;
