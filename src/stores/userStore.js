import { observable, action } from 'mobx';
import axios from 'axios';

class Store {
  @observable users = ['asddsa'];
  @observable isEdit = false;
  @observable user = {
    id: '',
    email: '',
    password: '',
  };
  @action addUser() {
    axios
      .post('http://localhost:5000/api/users', {
        email: this.user.email,
        password: this.user.password,
      })
      .then(res => {
        res.status == 200 ? this.getAll() : console.log(res.statusText);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  @action deleteUser() {
    axios
      .delete('http://localhost:5000/api/users/' + this.user.id)
      .then(res => {
        res.status == 200 ? this.getAll() : console.log(res.statusText);
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action updateUser() {
    axios
      .put('http://localhost:5000/api/users/' + this.user.id, {
        email: this.user.email,
        password: this.user.password,
      })
      .then(res => {
        res.status = 200 ? this.getAll() : console.log(res.statusText);
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action getAll() {
    axios.get('http://localhost:5000/api/users/').then(res => {
      this.users = res.users;
    });
    console.log(this.users);
    return this.users;
  }

  @action setId(id) {
    this.user.id = id;
  }

  @action setEmail(email) {
    this.user.email = email;
  }

  @action setPassword(password) {
    this.user.password = password;
  }

  @action setEdit(bool) {
    this.isEdit = bool;
  }

  @action setUser(user) {
    this.user = user;
  }
}

const store = new Store();
export default store;
