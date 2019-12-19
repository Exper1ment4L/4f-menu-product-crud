import React, { Component } from 'react';
import ProductList from '../components/Product/ProductList';
import { Provider } from 'mobx-react';
import productStore from '../stores/productStore';
import userStore from '../stores/userStore';
import Head from 'next/head';

class Products extends Component {
  render() {
    return (
      <Provider ProductStore={productStore} UserStore={userStore}>
        <Head>
          <title>4F ~ Ürünler Listesi</title>
        </Head>
        <ProductList></ProductList>
      </Provider>
    );
  }
}

export default Products;
