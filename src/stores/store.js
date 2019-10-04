import { observable, action, computed, observe } from 'mobx';
import axios from 'axios';

class Store {

  @observable products = []
  @observable id
  @observable name
  @observable price
  @observable description
  @observable isEdit = false

  constructor() {
    this.getAll();
  }

  @action addProduct() {
    console.log(this.name)
    axios
      .post("http://localhost:5000/api/products", {
        name: this.name,
        price: this.price,
        description: this.description
      })
      .then(response=>{
        response.status==200 ? this.getAll() : alert('ERROR')
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  @action deleteProduct() {
    axios.delete("http://localhost:5000/api/products/" +this.id).then(res => {
      console.log(res);
      res.status==200 ? this.getAll() : alert("ERROR")
    });
  }

  @action updateProduct() {
    axios
      .put("http://localhost:5000/api/products/"+this.id, {
        name: this.name,
        price : this.price,
        description: this.description
      })
      .then(response => {
        console.log(response);  
        response.status=200 ? this.getAll() : alert("Error");
      })
      .catch(error => {
        console.log(err);
      });
  }

  @action getAll() {
    axios.get("http://localhost:5000/api/products/").then(res => {
      this.products = res.data
    });
    return this.products;
  }

 
}

const store = new Store();
export default store;