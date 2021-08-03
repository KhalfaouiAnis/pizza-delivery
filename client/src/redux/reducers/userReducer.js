import {
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "../action-types/userActionTypes";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

const initialLoginState = {
  success: false,
  logoutSuccess: false,
  error: null,
  loading: false,
  currentUser: null,
};

export const userLoginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        currentUser: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT_SUCCESS:
      localStorage.removeItem("currentUser");
      return {
        ...state,
        logoutSuccess: true,
        error: null,
        loading: false,
        currentUser: null,
      };

    default:
      return state;
  }
};

// admin reducers
export const usersListReducer = (
  state = { users: [], loading: false },
  action
) => {
  switch (action.type) {
    case GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_ALL_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const initialDeleteState = {
  deleteLoading: false,
  deleteSuccess: false,
  deletedUserId: null,
  deleteError: null,
};

export const deleteUserReducer = (state = initialDeleteState, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteLoading: false,
        deletedUserId: action.payload,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        deleteError: action.payload,
        deleteLoading: false,
      };
    default:
      return state;
  }
};
