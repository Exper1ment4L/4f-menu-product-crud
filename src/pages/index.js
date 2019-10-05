import React, { Component } from "react";
import ProductList from "../components/ProductList";
import { Provider } from "mobx-react";
import store from "../stores/store";

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
