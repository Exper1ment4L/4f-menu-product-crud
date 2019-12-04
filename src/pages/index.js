import React, { Component } from 'react';

import { Provider } from 'mobx-react';
import store from '../stores/userStore';
import Login from '../components/Login/Login';

class Home extends Component {
  render() {
    return (
      <Provider store={store}>
        <Login></Login>
      </Provider>
    );
  }
}

export default Home;
