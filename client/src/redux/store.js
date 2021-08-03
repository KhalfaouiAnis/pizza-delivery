import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  pizzasListReducer,
  addPizzaReducer,
  getPizzaByIdReducer,
  editPizzaReducer,
  deletePizzaReducer,
} from "./reducers/pizzaReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  placeOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
  deliverOrderReducer,
} from "./reducers/orderReducer";
import {
  userRegisterReducer,
  userLoginReducer,
  usersListReducer,
} from "./reducers/userReducer";

const mainReducer = combineReducers({
  pizzasList: pizzasListReducer,
  addPizza: addPizzaReducer,
  editPizza: editPizzaReducer,
  deletePizza: deletePizzaReducer,
  getPizzaById: getPizzaByIdReducer,
  cart: cartReducer,
  placeOrder: placeOrderReducer,
  getUserOrders: getUserOrdersReducer,
  getAllOrders: getAllOrdersReducer,
  deliverOrder: deliverOrderReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  usersList: usersListReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItems,
  },
  userLogin: {
    currentUser: currentUser,
    error: null,
  },
};
const middleware = [thunk];
const store = createStore(
  mainReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
