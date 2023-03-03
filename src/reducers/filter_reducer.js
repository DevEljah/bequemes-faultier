import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      // gotcha! we hv 2 properties - "all_products" and "filter_products" (in initialState)
      // the products (coming as a payload) as been set to equal to
      // both of them ("all_products" and "filter_products")
      // but it'a needed to use the "spread operator"
      // bc if it just set equal to "all_products" and the same for the "filter_products"
      // bc once it's filtered the products can't go back to default
      // bc js will point to the same place in the memory
      // so using the "spread operator" the values can be copied
      // so this it's not referenced to the same place in memory (bc it's cpied)
    };
    // return state;
    throw new Error(`No Matching "${action.type}" - action type`);
  }
};
export default filter_reducer;
