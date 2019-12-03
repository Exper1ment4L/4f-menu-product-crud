import React, { Component } from 'react';
import ProductList from '../components/Product/ProductList';
import { Provider } from 'mobx-react';
import store from '../stores/productStore';

class Home extends Component {
  render() {
    return (
      <Provider store={store}>
        <ProductList></ProductList>
      </Provider>
    );
  }
}

export default Home;
