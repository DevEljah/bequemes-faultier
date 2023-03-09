import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
      // if Item is in the Cart
      const temCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          // if the "id" matches
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          // if the "id" doesn't match
          return cartItem;
        }
      });
      return { ...state, cart: temCart };
    } else {
      // if Item is not in the Cart
      const newItem = {
        id: id + color, //bc same cart-item can hv different colors
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
