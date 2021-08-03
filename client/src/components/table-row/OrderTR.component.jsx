import "./table-row.styles.css";

export default function OrderTableRow({ order, deliver }) {
  return (
    <tr>
      <td>{order._id}</td>
      <td>{order.email}</td>
      <td>{order.userId}</td>
      <td>{order.orderAmount} £</td>
      <td>{order.updatedAt.substring(0, 10)}</td>
      <td>
        {order.isDelivered ? (
          <h5 className="delivered">Delivered</h5>
        ) : (
          <button
            className="btn admin-btn shake-btn"
            onClick={() => deliver(order._id)}
          >
            Deliver
          </button>
        )}
      </td>
    </tr>
  );
}
