import {
  GET_PIZZAS_REQUEST,
  GET_PIZZAS_SUCCESS,
  GET_PIZZAS_FAIL,
  ADD_PIZZA_REQUEST,
  ADD_PIZZA_SUCCESS,
  ADD_PIZZA_FAIL,
  GET_PIZZA_BY_ID_REQUEST,
  GET_PIZZA_BY_ID_SUCCESS,
  GET_PIZZA_BY_ID_FAIL,
  EDIT_PIZZA_REQUEST,
  EDIT_PIZZA_SUCCESS,
  EDIT_PIZZA_FAIL,
  DELETE_PIZZA_REQUEST,
  DELETE_PIZZA_SUCCESS,
  DELETE_PIZZA_FAIL,
} from "../action-types/pizzaActionTypes";
import axios from "axios";

export const getAllPizzas = () => async (dispatch) => {
  dispatch({
    type: GET_PIZZAS_REQUEST,
  });

  try {
    const { data } = await axios.get("/api/v0/pizzas/all-pizza");
    dispatch({
      type: GET_PIZZAS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PIZZAS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPizzaById = (pizzaid) => async (dispatch) => {
  dispatch({
    type: GET_PIZZA_BY_ID_REQUEST,
  });

  try {
    const { data } = await axios.post("/api/v0/pizzas/get-pizza-by-id", {
      pizzaid,
    });
    dispatch({
      type: GET_PIZZA_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PIZZA_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterPizzas = (serachKey, category) => async (dispatch) => {
  let filteredPizzas;
  dispatch({
    type: GET_PIZZAS_REQUEST,
  });

  try {
    const { data } = await axios.get("/api/v0/pizzas/all-pizza");
    filteredPizzas = data.filter((pizza) =>
      pizza.name.toLowerCase().includes(serachKey)
    );
    if (category !== "all") {
      filteredPizzas = data.filter(
        (pizza) => pizza.category.toLowerCase() === category
      );
    }
    dispatch({
      type: GET_PIZZAS_SUCCESS,
      payload: filteredPizzas,
    });
  } catch (error) {
    dispatch({
      type: GET_PIZZAS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({
    type: ADD_PIZZA_REQUEST,
  });

  try {
    await axios.post("/api/v0/pizzas/add-pizza", { pizza });
    dispatch({
      type: ADD_PIZZA_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADD_PIZZA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editPizza = (updatedPizza) => async (dispatch) => {
  dispatch({
    type: EDIT_PIZZA_REQUEST,
  });

  try {
    const {
      data: { updatedPizzaId },
    } = await axios.post("/api/v0/pizzas/edit-pizza", {
      updatedPizza,
    });

    dispatch({
      type: EDIT_PIZZA_SUCCESS,
      payload: updatedPizzaId,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PIZZA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePizza = (pizzaId) => async (dispatch) => {
  dispatch({
    type: DELETE_PIZZA_REQUEST,
  });

  try {
    const {
      data: { deletedPizzaId },
    } = await axios.post("/api/v0/pizzas/delete-pizza", { pizzaId });

    dispatch({
      type: DELETE_PIZZA_SUCCESS,
      payload: deletedPizzaId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PIZZA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
