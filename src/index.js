import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ProductsProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </ProductsProvider>
);

// gotcha!: place the "FilterProvider" inside of the "ProductsProvider"
// bc to get some info from the "product" in to the "filter"
// so that just ensures that we'll aleays hv access to the data that
// coming from the "ProductsProvider"
// codeSandbox Test
