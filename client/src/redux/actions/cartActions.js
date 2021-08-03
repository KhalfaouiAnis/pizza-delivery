import {
  ADD_TO_CART,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  DELETE_FROM_CART,
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_SUCCESS,
} from "../action-types/cartActionTypes";

export const addToCart = (pizza, quantity, varient) => (dispatch, getState) => {
  let cartItem = {
    name: pizza.name,
    _id: pizza._id,
    image: pizza.image,
    varient,
    quantity: Number(quantity),
    prices: pizza.prices,
    price: pizza.prices[0][varient] * quantity,
  };
  dispatch({
    type: ADD_TO_CART_REQUEST,
    payload: cartItem,
  });

  dispatch({
    type: ADD_TO_CART,
    payload: cartItem,
  });
  const cartItems = getState().cart.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({
    type: ADD_TO_CART_SUCCESS,
    payload: cartItem,
  });
};

export const deleteFromCart = (pizza) => (dispatch, getState) => {
  dispatch({
    type: DELETE_FROM_CART_REQUEST,
  });
  dispatch({
    type: DELETE_FROM_CART,
    payload: pizza,
  });

  const cartItems = getState().cart.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  dispatch({
    type: DELETE_FROM_CART_SUCCESS,
  });
};
