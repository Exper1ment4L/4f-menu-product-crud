import { observable, action } from 'mobx';
import axios from 'axios';
import Router from 'next/router';
import Cryptr from 'cryptr';
const cryptr = new Cryptr('secretCryptoKey');

class UserStore {
  @observable users = [];
  @observable isEdit = false;
  @observable isAuth = false;
  @observable isEmailEmpty = true;
  @observable isPasswordEmpty = true;
  @observable message = '';
  @observable user = {
    id: '',
    email: '',
    password: '',
    token: '',
  };

  @action userLogin() {
    axios
      .post('https://api-4f.herokuapp.com/api/users/login', {
        email: this.user.email,
        password: this.user.password,
      })
      .then(res => {
        console.log(res);
        if (res.data.success) {
          this.setToken(res.data.token);
          localStorage.setItem('token', cryptr.encrypt(res.data.token));
          Router.push('/products');
        } else {
          this.setMessage(res.data.message);
        }
      })
      .catch(err => {
        this.setMessage(err);
      });
  }

  @action userRegister() {
    axios
      .post('https://api-4f.herokuapp.com/api/users/register', {
        email: this.user.email,
        password: this.user.password,
      })
      .then(res => {
        if (res.data.success) {
          this.setMessage('Kayıt başarılı giriş yapabilirsiniz.');
          this.setEmail('');
          this.setPassword('');
        } else {
          this.setMessage(res.data.message);
        }
      })
      .catch(err => {
        this.setMessage(err);
      });
  }

  @action userAuth() {
    axios
      .post(
        'https://api-4f.herokuapp.com/api/users/authentication',
        {
          token:cryptr.decrypt(localStorage.getItem('token'))
        },
      )
      .then(res => {
        console.log(JSON.stringify(res));
      })
      .catch(res => {
        console.log('Error:' + res.message);
      });
  }

  @action userDelete() {
    axios
      .delete('https://api-4f.herokuapp.com/api/users/' + this.user.id)
      .then(res => {
        console.log(res.status);
      })
      .catch(err => {
        console.log(err);
      });
  }

  @action userUpdate() {
    axios
      .put('https://api-4f.herokuapp.com/api/users/' + this.user.id, {
        email: this.user.email,
        password: this.user.password,
      })
      .then(res => {
        console.log(res.status);
      })
      .catch(err => {
        console.log(err);
      });
  }

  @action getAll() {
    axios.get('https://api-4f.herokuapp.com/api/users/').then(res => {
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

  @action setAuth(bool) {
    this.isAuth = bool;
  }

  @action setMessage(message) {
    this.message = message;
  }

  @action setToken(token) {
    this.user.token = token;
  }
}

const userStore = new UserStore();
export default userStore;
