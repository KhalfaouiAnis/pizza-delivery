import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../redux/actions/orderActions";
import Success from "../success/Success.component";
import Error from "../error/Error.component";
import Loading from "../loading/Loading.component";

import "./checkout.styles.css";

export default function Checkout({ subtotal }) {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.placeOrder);
  const { loading, error, success } = ordersState;

  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  function tokenHandler(token) {
    dispatch(placeOrder(token, subtotal));
  }

  return (
    <div>
      {loading && (
        <div className="text-center loader">
          <Loading />
        </div>
      )}
      {error && <Error error={error} />}
      {success && (
        <div className="mr-3">
          <Success success="Order placed successfully 🥳" />
        </div>
      )}
      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        currency="USD"
        token={tokenHandler}
        stripeKey="pk_test_cvR1yDmwkBTuv1Y4Pcnl6MeX00By9wv7dA"
      >
        <button
          disabled={!localStorage.getItem("currentUser") || cartItems === 0}
          className="shake-btn btn btn-block mt-3"
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
}
