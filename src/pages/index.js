import React, { Component } from 'react';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import userStore from '../stores/userStore';
import Login from '../components/Login/Login';

class Home extends Component {
  render() {
    return (
      <Provider store={userStore}>
        <Head>
          <title>4F ~ Admin</title>
        </Head>
        <Login></Login>
      </Provider>
    );
  }
}

export default Home;
