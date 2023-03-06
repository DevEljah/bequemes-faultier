import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  // get "products" from "ProductsContext"
  // can't be passed into the "filter_reducer" nicht möglich!
  // bc "filter_reducer" is just a simple func (hook rules!)
  // but can be passed through the "FilterProvider" component
  const { products } = useProductsContext(); //grab the products! /invoked!
  // but it can't be pass into the "state" directly! into "initialState"
  const [state, dispatch] = useReducer(reducer, initialState);
  // that why "useEffect" need to be setup so;
  // when the component mounts, then dispatch an action
  // which is gonna be "LOAD_PRODUCTS"
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);
  // gotcha!: "products" initially going to be an "empty array"
  // even in the "products_context"!
  // thats why as a dependency we pass-in the "products"!

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);
  //when the "porducts" or "state.sort" changes.
  //state.filters == >> when every time the value in this object changes this useEffect will be run.

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // console.log(value);
    if (name === "category") {
      value = e.target.textContent; //gets the "text" that's inside of the "button"
    }
    if (name === "color") {
      value = e.target.dataset.color;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilters = () => {};

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// custom hook!
export const useFilterContext = () => {
  return useContext(FilterContext);
};

// gotcha!: setup an "actions.js" that takes those products from it
// and dumps them into the "filter_context" the "product_context"
