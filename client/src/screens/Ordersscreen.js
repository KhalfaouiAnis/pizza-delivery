import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserOrders } from "../redux/actions/orderActions";

import Loading from "../components/loading/Loading.component";
import Error from "../components/error/Error.component";

import "../styles/orderscreen.css";
import CustomerOrderTableRow from "../components/table-row/CustomerOrderTR.component";

export default function Ordersscreen() {
  const dispatch = useDispatch();

  const ordersState = useSelector((state) => state.getUserOrders);
  const { error, loading, orders } = ordersState;

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="text-center" style={{ marginTop: "6rem" }}>
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="orders text-center">All Orders</h1>
      <hr></hr>
      <div className="row justify-content-center">
        {error && <Error error={error} />}
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Items</th>
              <th>Delivery address</th>
              <th>
                Order Info<sub>s</sub>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => {
                return <CustomerOrderTableRow key={order._id} order={order} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
