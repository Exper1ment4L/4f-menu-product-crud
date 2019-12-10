import React, { Component } from 'react';
import Head from 'next/head'; 
import { Provider } from 'mobx-react';
import store from '../stores/userStore';
import Login from '../components/Login/Login';

class Home extends Component {
  render() {
    return (
      <Provider store={store}>
        <Head>
          <title>4F ~ Admin</title>
          <link rel="icon" type="image/jpg" href="https://img.icons8.com/metro/26/000000/lock.png"/>
        </Head>
        <Login></Login>
      </Provider>
    );
  }
}

export default Home;
