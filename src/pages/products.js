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
          <link rel="icon" type="image/jpg" href="https://image.flaticon.com/icons/png/512/123/123300.png"/>
        </Head>
        <ProductList></ProductList>
      </Provider>
    );
  }
}

export default Products;
