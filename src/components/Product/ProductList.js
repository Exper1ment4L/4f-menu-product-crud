import React, { Component } from 'react';
import Button from '../Button';
import TextField from '../TextField';
import Container from '../Container';
import Col from '../Col';
import Row from '../Row';
import { inject, observer } from 'mobx-react';

@inject('ProductStore')
@inject('UserStore')
@observer
class ProductList extends Component {
  componentDidMount() {
    const { ProductStore , UserStore} = this.props;
    ProductStore.getAll();
    UserStore.userAuth();
  }

  addProduct() {
    const { ProductStore , UserStore} = this.props;
    if (
      ProductStore.product.name.length > 0 &&
      ProductStore.product.price > 0 &&
      ProductStore.product.description.length > 0 &&
      UserStore.isAuth
    ) {
      ProductStore.addProduct();
      this.resetProductStore();
    } else {
      ProductStore.setMessage('Boş geçilemez');
    }
  }

  updateProduct() {
    const { ProductStore, UserStore} = this.props;
    if (
      ProductStore.product.name.length > 0 &&
      ProductStore.product.price > 0 &&
      ProductStore.product.description.length > 0 &&
      UserStore.isAuth
    ) {
      ProductStore.updateProduct();
      this.resetProductStore();
    } else {
      ProductStore.setMessage('Boş geçilemez');
    }
  }

  deleteProduct(id) {
    const { ProductStore, UserStore } = this.props;
    ProductStore.setId(id);
    if(UserStore.isAuth) {
      if (confirm('Ürün silinsin mi?')) {
        ProductStore.deleteProduct(id);
      }
    }
  }

  updateHandler(id) {
    const { ProductStore } = this.props;
    const updated = this.props.ProductStore.products.filter(
      product => product._id == id
    );
    ProductStore.setProduct({
      id: updated[0]._id,
      name: updated[0].name,
      price: updated[0].price,
      description: updated[0].description,
    });
    ProductStore.setEdit(true);
  }

  resetProductStore() {
    const { ProductStore } = this.props;
    ProductStore.setProduct({
      id: '',
      name: '',
      price: '',
      description: '',
    });
    ProductStore.isEdit = false;
    ProductStore.message = '';
  }

  handleNameChange(e) {
    const { ProductStore } = this.props;
    ProductStore.setName(e.target.value);
  }

  handlePriceChange(e) {
    const { ProductStore } = this.props;
    ProductStore.setPrice(e.target.value);
  }

  handleDescChange(e) {
    const { ProductStore } = this.props;
    ProductStore.setDescription(e.target.value);
  }

  handleSearchChange(e) {
    const { ProductStore } = this.props;
    ProductStore.query = e.target.value;
    ProductStore.filteredProducts = ProductStore.products.filter(product =>
      product.name.toLowerCase().includes(ProductStore.query.toLowerCase())
    );
  }

  render() {
    const { ProductStore } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col>
            <h1>
              {ProductStore.isEdit == false
                ? 'Ürünler Listesi  '
                : 'Ürün Güncelleniyor'}
            </h1>
            <span>
              {ProductStore.query.length > 0
                ? 'Bulunan Ürün Sayısı:' + ProductStore.filteredProducts.length
                : 'Toplam Ürün Sayısı:' + ProductStore.products.length}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <TextField
                  value={ProductStore.product.name}
                  onChange={this.handleNameChange.bind(this)}
                  placeholder="Ürün Adı"
                  name="name"
                />
                <TextField
                  value={ProductStore.product.price}
                  onChange={this.handlePriceChange.bind(this)}
                  placeholder="Ürün Fiyatı"
                  name="price"
                />
                <TextField
                  value={ProductStore.product.description}
                  onChange={this.handleDescChange.bind(this)}
                  placeholder="Ürün Açıklaması"
                  name="description"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {ProductStore.isEdit == false ? (
                  <Button success onClick={this.addProduct.bind(this)}>
                    Ekle
                  </Button>
                ) : null}
                {ProductStore.isEdit == true ? (
                  <Col>
                    <Button update onClick={this.updateProduct.bind(this)}>
                      Kaydet
                    </Button>
                    <Button delete onClick={this.resetProductStore.bind(this)}>
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
            <span>{ProductStore.message}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              full
              search
              value={ProductStore.query}
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
                {ProductStore.filteredProducts.length > 0
                  ? ProductStore.filteredProducts.map(product => (
                      <tr key={product._id}>
                        <th scope="row">
                          {ProductStore.filteredProducts.indexOf(product) + 1}
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
                  : ProductStore.query.length > 0 && ProductStore.filteredProducts.length == 0
                  ? null
                  : ProductStore.products.map(product => (
                      <tr key={product._id}>
                        <th scope="row">
                          {ProductStore.products.indexOf(product) + 1}
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
