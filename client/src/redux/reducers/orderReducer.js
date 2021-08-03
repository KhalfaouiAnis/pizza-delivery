import {
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  DELIVER_ORDER_FAIL,
} from "../action-types/orderActionTypes";

const initialOrdersState = {
  orders: [],
  loading: false,
  error: null,
  success: false,
};

export const placeOrderReducer = (state = initialOrdersState, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PLACE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// export const deliverOrderReducer = (state = initialOrdersState, action) => {
//   switch (action.type) {
//     case DELIVER_ORDER_REQUEST:
//       return {
//         ...state,
//         deliverLoading: true,
//       };
//     case DELIVER_ORDER_SUCCESS:
//       return {
//         ...state,
//         deliverLoading: false,
//         success: true,
//       };
//     case DELIVER_ORDER_FAIL:
//       return {
//         ...state,
//         deliverLoading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

export const getUserOrdersReducer = (state = initialOrdersState, action) => {
  switch (action.type) {
    case GET_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        success: true,
      };
    case GET_USER_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const getAllOrdersReducer = (state = initialOrdersState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        success: true,
      };
    case GET_ALL_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const deliverOrderReducer = (
  state = { deliverLoading: false, orderDeliverdId: null },
  action
) => {
  switch (action.type) {
    case DELIVER_ORDER_REQUEST:
      return {
        ...state,
        deliverLoading: true,
        deliveredOrderdId: action.payload,
      };

    case DELIVER_ORDER_SUCCESS:
      return {
        ...state,
        deliverLoading: false,
      };

    case DELIVER_ORDER_FAIL:
      return {
        ...state,
        deliverLoading: false,
      };

    default:
      return state;
  }
};
