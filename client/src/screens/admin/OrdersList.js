import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../components/loading/Loading.component";
import Error from "../../components/error/Error.component";
import OrderTableRow from "../../components/table-row/OrderTR.component";
import { deliverOrder, getALLOrders } from "../../redux/actions/orderActions";
import AOS from "aos";

export default function OrdersList() {
  AOS.init();

  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.getAllOrders);
  const { error, loading, orders } = ordersState;

  const deliverOrderState = useSelector((state) => state.deliverOrder);
  const { deliverLoading, deliveredOrderdId } = deliverOrderState;

  useEffect(() => {
    dispatch(getALLOrders());
  }, [dispatch]);

  function deliver(orderId) {
    dispatch(deliverOrder(orderId));
  }

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
    <div>
      <h2 className="text-left">Orders List</h2>
      {error && <Error error={error} />}
      <table className="table table-striped" data-aos="zoom-in">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer Email</th>
            <th>Customer ID</th>
            <th>Order Amount</th>
            <th>Order Date</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <OrderTableRow
                  key={order._id}
                  order={order}
                  deliver={deliver}
                  deliverLoading={deliverLoading}
                  orderDeliverdId={deliveredOrderdId}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
