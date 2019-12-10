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
    if (
      store.product.name.length > 0 &&
      store.product.price > 0 &&
      store.product.description.length > 0
    ) {
      store.addProduct();
      this.resetstore();
    } else {
      store.setMessage('Boş geçilemez');
    }
  }

  updateProduct() {
    const { store } = this.props;
    if (
      store.product.name.length > 0 &&
      store.product.price > 0 &&
      store.product.description.length > 0
    ) {
      store.updateProduct();
      this.resetstore();
    } else {
      store.setMessage('Boş geçilemez');
    }
  }

  deleteProduct(id) {
    const { store } = this.props;
    store.setId(id);
    if (confirm('Ürün silinsin mi?')) {
      store.deleteProduct(id);
    }
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

  resetstore() {
    const { store } = this.props;
    store.setProduct({
      id: '',
      name: '',
      price: '',
      description: '',
    });
    store.isEdit = false;
    store.message = '';
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

  handleSearchChange(e) {
    const { store } = this.props;
    store.query = e.target.value;
    store.filteredProducts = store.products.filter(product =>
      product.name.toLowerCase().includes(store.query.toLowerCase())
    );
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
            <span>
              {store.query.length > 0
                ? 'Bulunan Ürün Sayısı:' + store.filteredProducts.length
                : 'Toplam Ürün Sayısı:' + store.products.length}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <TextField
                  value={store.product.name}
                  onChange={this.handleNameChange.bind(this)}
                  placeholder="Ürün Adı"
                  name="name"
                />
                <TextField
                  value={store.product.price}
                  onChange={this.handlePriceChange.bind(this)}
                  placeholder="Ürün Fiyatı"
                  name="price"
                />
                <TextField
                  value={store.product.description}
                  onChange={this.handleDescChange.bind(this)}
                  placeholder="Ürün Açıklaması"
                  name="description"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {store.isEdit == false ? (
                  <Button success onClick={this.addProduct.bind(this)}>
                    Ekle
                  </Button>
                ) : null}
                {store.isEdit == true ? (
                  <Col>
                    <Button update onClick={this.updateProduct.bind(this)}>
                      Kaydet
                    </Button>
                    <Button delete onClick={this.resetstore.bind(this)}>
                      İptal
                    </Button>
                  </Col>
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <span>{store.message}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              full
              search
              value={store.query}
              onChange={this.handleSearchChange.bind(this)}
              placeholder="Aramak için ürün adı girin"
              name="search"
            ></TextField>
          </Col>
        </Row>
        <Row>
          <Col>
            <table border="1" align="center" width="100%">
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
                {store.filteredProducts.length > 0
                  ? store.filteredProducts.map(product => (
                      <tr key={product._id}>
                        <th scope="row">
                          {store.filteredProducts.indexOf(product) + 1}
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
                            Kaldır
                          </Button>
                          <Button
                            update
                            onClick={this.updateHandler.bind(this, product._id)}
                          >
                            Güncelle
                          </Button>
                        </td>
                      </tr>
                    ))
                  : store.query.length > 0 && store.filteredProducts.length == 0
                  ? null
                  : store.products.map(product => (
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
                            Kaldır
                          </Button>
                          <Button
                            update
                            onClick={this.updateHandler.bind(this, product._id)}
                          >
                            Güncelle
                          </Button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProductList;
