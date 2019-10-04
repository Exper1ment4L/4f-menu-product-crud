import React, { Component } from "react";
import { Provider } from "mobx-react";
import ProductList from "../components/ProductList";

class Home extends Component {
  
  render() {
    return (
        <ProductList></ProductList>
    );
  }
}

export default Home;
