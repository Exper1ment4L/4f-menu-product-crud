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
  }

  userLogin() {
    const { store } = this.props;
    store.userLogin();
  }

  handleEmailChange(e) {
    const { store } = this.props;
    store.setEmail(e.target.value);
  }

  handlePasswordChange(e) {
    const { store } = this.props;
    store.setPassword(e.target.value);
  }

  render() {
    const { store } = this.props;
    return (
      <Container>
        <Row>
          <Col>
          <h2>Lütfen Giriş Yapınız</h2></Col>
        </Row>
        <Row>
          <Col>
            <TextField  value={store.user.email} onChange={this.handleEmailChange.bind(this)} placeholder='Email'></TextField>
            <br />
            <TextField  value={store.user.password} onChange={this.handlePasswordChange.bind(this)} placeholder='Şifre' type="password"></TextField>
            <br />
            <br />
            <Button submit onClick={this.userLogin.bind(this)}> Giriş Yap</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
