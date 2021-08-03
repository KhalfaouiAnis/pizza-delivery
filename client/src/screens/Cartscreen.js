import { useSelector, useDispatch } from "react-redux";
import Checkout from "../components/stripe/Checkout.component";
import { addToCart, deleteFromCart } from "../redux/actions/cartActions";
import "../styles/cartscreen.css";
import AOS from "aos";

export default function Cartscreen() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;
  const subTotal = cartItems.reduce((x, item) => (x += item.price), 0);

  AOS.init();

  return (
    <div>
      <div className="row justify-content-center">
        <div data-aos="zoom-in" className="cart-content col-md-7 shadow-md">
          <h2 className="card-title text-center">Card Items</h2>
          {cartItems.length === 0 && (
            <h1 className="text-center mt-5">Your cart is empty</h1>
          )}
          {cartItems.map((item) => {
            const limitUp = item.quantity > 9;
            return (
              <div className="flex-container">
                <div className="text-left m-1 w-100">
                  <p>
                    {item.name} [{item.varient}]
                  </p>
                  <p>
                    Price: {item.quantity}*{item.prices[0][item.varient]}=
                    {item.price}
                  </p>
                  <p className="quantity-text">Quantity</p>
                  <i
                    className={`fas fa-plus ${limitUp && "bloqued"}`}
                    onClick={() => {
                      if (item.quantity < 10) {
                        dispatch(
                          addToCart(item, item.quantity + 1, item.varient)
                        );
                      }
                    }}
                  ></i>
                  <b>{item.quantity}</b>
                  <i
                    className="fas fa-minus"
                    onClick={() => {
                      if (item.quantity > 1) {
                        dispatch(
                          addToCart(item, item.quantity - 1, item.varient)
                        );
                      } else {
                        dispatch(deleteFromCart(item));
                      }
                    }}
                  ></i>
                  <hr />
                </div>

                <div className="m-1 w-100">
                  <img
                    className="cart-item-image"
                    src={item.image}
                    alt="Item"
                  />
                </div>

                <div className="m-1 w-100 mt-4">
                  <i
                    className="fas fa-trash fa-lg"
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-3 text-center small-shadow">
          <h3 className="subtotal">
            <span>SubTotal:</span> {subTotal}/£
          </h3>
          <Checkout subtotal={subTotal} />
        </div>
      </div>
    </div>
  );
}
