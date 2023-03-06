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
    let maxPrice = action.payload.map((p) => p.price); //getting all the prices!
    maxPrice = Math.max(...maxPrice);
    // in the "max()" - method "Array" can't be passed
    // thats whay "spreed operator" is used
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

      filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
      // copy previous values (in initialState)
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempPorducts = [...filtered_products]; //? not [] ?
    if (sort == "price-lowest") {
      tempPorducts = tempPorducts.sort((a, b) => a.price - b.price);
    }
    if (sort == "price-highest") {
      tempPorducts = tempPorducts.sort((a, b) => b.price - a.price);
    }
    if (sort == "name-a") {
      tempPorducts = tempPorducts.sort((a, b) => {
        return a.name.localeCompare(b.name, { ignorePunctuation: true });
      });
    }
    if (sort == "name-z")
      tempPorducts = tempPorducts.sort((a, b) => {
        return b.name.localeCompare(a.name, { ignorePunctuation: true });
      });
    return { ...state, filtered_products: tempPorducts }; //?
    // ANS; bc if in case in some weird scenario none of them match
    // then at least it will display somting
    // otherwise if gonna go with with empty array for temProducts &
    // set the "filtered_products" equal to an empty array the products
    // there won't be displayed
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
    // [name]: value == >> whatever name value is passing
    // access that property and set it to the "value"
  }
  if (action.type === FILTER_PRODUCTS) {
    // console.log("filtering products");
    return { ...state };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};
export default filter_reducer;
