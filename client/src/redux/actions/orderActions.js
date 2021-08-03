import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  DELIVER_ORDER_SUCCESS,
  DELIVER_ORDER_FAIL,
  DELIVER_ORDER_REQUEST,
} from "../action-types/orderActionTypes";
import axios from "axios";

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  const { currentUser } = getState().userLogin;
  const { cartItems } = getState().cart;

  try {
    await axios.post("/api/v0/orders/place-order", {
      token,
      subtotal,
      currentUser,
      cartItems,
    });
    dispatch({ type: PLACE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAIL });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const { currentUser } = getState().userLogin;
  dispatch({
    type: GET_USER_ORDERS_REQUEST,
  });

  try {
    const { data } = await axios.post("/api/v0/orders/user-orders", {
      userId: currentUser._id,
    });
    dispatch({
      type: GET_USER_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getALLOrders = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_ORDERS_REQUEST,
  });

  try {
    const { data } = await axios.get("/api/v0/orders/all-orders");
    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  dispatch({
    type: DELIVER_ORDER_REQUEST,
    payload: orderId,
  });

  try {
    await axios.post("/api/v0/orders/deliver-order", { orderId });
    const { data } = await axios.get("/api/v0/orders/all-orders");

    dispatch({
      type: DELIVER_ORDER_SUCCESS,
    });

    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELIVER_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
