import { observable, action } from 'mobx';
import axios from 'axios';

class ProductStore {

  // States 
  
  @observable products = [];
  @observable filteredProducts = [];
  @observable isEdit = false;
  @observable query = '';
  @observable message = '';
  @observable product = {
    id: 0,
    name: '',
    price: '',
    description: '',
  };

  @action addProduct() {
    axios
      .post('http://localhost:5000/api/products/add/', {
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
      })
      .then(res => {
        res.data.success ? this.getAll() : this.setMessage(res.data.message);
      })
      .catch(function(error) {
        this.setMessage(error.data.message);
      });
  }

  @action deleteProduct() {
    axios
      .delete('http://localhost:5000/api/products/delete/' + this.product.id)
      .then(res => {
        res.data.success ? this.getAll() : alert('ERROR');
      });
  }

  @action updateProduct() {
    axios
      .put('http://localhost:5000/api/products/update/' + this.product.id, {
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
      })
      .then(res => {
        res.data.success ? this.getAll() : this.setMessage(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  }

  @action getAll() {
    axios.get('http://localhost:5000/api/products/').then(res => {
      this.products = res.data.products;
      this.setFilteredProducts(
        this.products.filter(product =>
          product.name.toLowerCase().includes(this.query.toLowerCase())
        )
      );
      this.setMessage(res.data.message);
    });
    return this.products;
  }

  @action getAllCache() {}

  @action setId(id) {
    this.product.id = id;
  }

  @action setName(name) {
    this.product.name = name;
  }

  @action setPrice(price) {
    this.product.price = price;
  }

  @action setDescription(description) {
    this.product.description = description;
  }

  @action setEdit(bool) {
    this.isEdit = bool;
  }

  @action setProduct(product) {
    this.product = product;
  }

  @action setProducts(products) {
    this.products = products;
  }

  @action setFilteredProducts(products) {
    this.filteredProducts = products;
  }

  @action setMessage(message) {
    this.message = message;
  }
}

const productStore = new ProductStore();
export default productStore;
