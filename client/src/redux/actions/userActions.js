import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../action-types/userActionTypes";
import axios from "axios";

export const registerUser = (user_data) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });

  try {
    await axios.post("/api/v0/users/register", { user_data });
    dispatch({
      type: USER_REGISTER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });

  try {
    const { data } = await axios.post("/api/v0/users/login", {
      email,
      password,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("currentUser", JSON.stringify(data));
    // window.location.href = "/";
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT_SUCCESS,
  });
  // window.location.href = "/login";
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_USER_REQUEST,
  });

  try {
    const { data } = await axios.get("/api/v0/users/all-users");
    dispatch({
      type: GET_ALL_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({
    type: DELETE_USER_REQUEST,
  });

  try {
    const {
      data: { deletedUserId },
    } = await axios.post("/api/v0/users/delete-user", { userId });

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: deletedUserId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
