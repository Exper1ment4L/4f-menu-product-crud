import React, { Component } from 'react';
import ProductList from '../components/Product/ProductList';
import { Provider } from 'mobx-react';
import store from '../stores/productStore';
import Head from 'next/head'; 

class Products extends Component {
  render() {
    return (
      <Provider store={store}>
        <Head>
          <title>4F ~ Ürünler Listesi</title>
          <link rel="icon" type="image/jpg" href="https://image.flaticon.com/icons/png/512/123/123300.png"/>
        </Head>
        <ProductList></ProductList>
      </Provider>
    );
  }
}

export default Products;
