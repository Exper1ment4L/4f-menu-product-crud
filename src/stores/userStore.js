import { observable, action } from 'mobx';
import axios from 'axios';
import Router from 'next/router';

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
      .post('http://localhost:5000/api/users/login', {
        email: this.user.email,
        password: this.user.password,
      })
      .then(res => {
        console.log(res);
        if (res.data.success) {
          this.setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
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
      .post('http://localhost:5000/api/users/register', {
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
        'http://localhost:5000/api/users/authentication',
        { token: this.user.token },
        {
          headers: { Authorization: this.user.token },
        }
      )
      .then(res => {
        console.log(res.status);
        this.setAuth(true);
      })
      .catch(err => {
        console.log(err);
        this.setAuth(false);
      });
  }

  @action userDelete() {
    axios
      .delete('http://localhost:5000/api/users/' + this.user.id)
      .then(res => {
        console.log(res.status);
      })
      .catch(err => {
        console.log(err);
      });
  }

  @action userUpdate() {
    axios
      .put('http://localhost:5000/api/users/' + this.user.id, {
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
