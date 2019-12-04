import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Button from '../Button';
import Col from '../Col';
import Row from '../Row';
import TextField from '../TextField';
import Container from '../Container';

@inject('store')
@observer
class Login extends Component {
  componentDidMount() {
    const { store } = this.props;
    store.setEmail('');
    store.setMessage('');
    store.setPassword('');
  }

  userLogin() {
    const { store } = this.props;
    store.isEmailEmpty || store.isPasswordEmpty
      ? store.setMessage('Email veya şifrenizi girin')
      : store.userLogin();
  }

  userRegister() {
    const { store } = this.props;
    store.isEmailEmpty || store.isPasswordEmpty
      ? store.setMessage('Email veya şifrenizi girin')
      : store.userRegister();
  }

  handleEmailChange(e) {
    const { store } = this.props;
    store.setEmail(e.target.value);
    store.user.email.length > 0
      ? (store.isEmailEmpty = false)
      : (store.isEmailEmpty = true);
  }

  handlePasswordChange(e) {
    const { store } = this.props;
    store.setPassword(e.target.value);
    store.user.password.length > 0
      ? (store.isPasswordEmpty = false)
      : (store.isPasswordEmpty = true);
  }

  render() {
    const { store } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <h2>Lütfen Giriş Yapınız</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              value={store.user.email}
              onChange={this.handleEmailChange.bind(this)}
              placeholder="Email"
            ></TextField>
            <br />
            <TextField
              value={store.user.password}
              onChange={this.handlePasswordChange.bind(this)}
              placeholder="Şifre"
              type="password"
            ></TextField>
            <br />
            <br />
            <h3>{store.message}</h3>
            <Button submit onClick={this.userLogin.bind(this)}>
              {' '}
              Giriş Yap
            </Button>
            <Button submit onClick={this.userRegister.bind(this)}>
              Kayıt Ol
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
