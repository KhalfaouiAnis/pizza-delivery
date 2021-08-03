import {
  GET_PIZZAS_FAIL,
  GET_PIZZAS_REQUEST,
  GET_PIZZAS_SUCCESS,
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

export const pizzasListReducer = (
  state = { pizzas: [], loading: false },
  action
) => {
  switch (action.type) {
    case GET_PIZZAS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PIZZAS_SUCCESS:
      return {
        ...state,
        pizzas: action.payload,
        loading: false,
      };
    case GET_PIZZAS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const getPizzaByIdReducer = (
  state = { pizza: {}, loading: false },
  action
) => {
  switch (action.type) {
    case GET_PIZZA_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PIZZA_BY_ID_SUCCESS:
      return {
        ...state,
        pizza: action.payload,
        loading: false,
      };
    case GET_PIZZA_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const addPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PIZZA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_PIZZA_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case ADD_PIZZA_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const editPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PIZZA_REQUEST:
      return {
        ...state,
        editLoading: true,
      };
    case EDIT_PIZZA_SUCCESS:
      return {
        ...state,
        editSuccess: true,
        editLoading: false,
        updatedPizzaId: action.payload,
      };
    case EDIT_PIZZA_FAIL:
      return {
        ...state,
        editError: action.payload,
        editLoading: false,
      };
    default:
      return state;
  }
};

const initialDeleteState = {
  deleteLoading: false,
  deleteSuccess: false,
  deletedPizzaId: null,
  deleteError: null,
};
export const deletePizzaReducer = (state = initialDeleteState, action) => {
  switch (action.type) {
    case DELETE_PIZZA_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case DELETE_PIZZA_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteLoading: false,
        deletedPizzaId: action.payload,
      };
    case DELETE_PIZZA_FAIL:
      return {
        ...state,
        deleteError: action.payload,
        deleteLoading: false,
      };
    default:
      return state;
  }
};
