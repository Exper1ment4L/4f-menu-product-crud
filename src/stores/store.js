import { observable, action } from "mobx";
import axios from "axios";

class Store {
  @observable products = [];
  @observable isEdit = false;
  @observable product = {
    id: 0,
    name: "",
    price: "",
    description: ""
  };

  @action addProduct() {
    console.log(this.name);
    axios
      .post("http://localhost:5000/api/products", {
        name: this.product.name,
        price: this.product.price,
        description: this.product.description
      })
      .then(response => {
        response.status == 200 ? this.getAll() : alert("ERROR");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  @action deleteProduct() {
    axios
      .delete("http://localhost:5000/api/products/" + this.product.id)
      .then(res => {
        console.log(res);
        res.status == 200 ? this.getAll() : alert("ERROR");
      });
  }

  @action updateProduct() {
    axios
      .put("http://localhost:5000/api/products/" + this.product.id, {
        name: this.product.name,
        price: this.product.price,
        description: this.product.description
      })
      .then(response => {
        console.log(response);
        response.status = 200 ? this.getAll() : alert("Error");
      })
      .catch(error => {
        console.log(err);
      });
  }

  @action getAll() {
    axios.get("http://localhost:5000/api/products/").then(res => {
      this.products = res.data;
    });
    return this.products;
  }

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
}

const store = new Store();
export default store;
