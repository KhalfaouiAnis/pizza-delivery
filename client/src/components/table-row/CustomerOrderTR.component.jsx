import "./table-row.styles.css";

export default function CustomerOrderTableRow({ order }) {
  return (
    <tr>
      <td>
        {order.orderItems.map((item) => {
          return (
            <div id="multiple-items">
              <p>
                {item.name} [{item.varient}] * {item.quantity} ={item.price}
              </p>
            </div>
          );
        })}
      </td>
      <td>
        <p>Street: {order.shippingAddress.street}</p>
        <p>City: {order.shippingAddress.city}</p>
        <p>Country: {order.shippingAddress.country}</p>
        <p>Postal Code: {order.shippingAddress.pincode}</p>
      </td>
      <td>
        {order.isDelivered ? (
          <p className="delivered">Delivery status : Delivered</p>
        ) : (
          <p className="not-delivered">Delivery status : Pending</p>
        )}

        <p>Order amount: {order.orderAmount} /$</p>
        <p>Order date: {order.createdAt.substring(0, 10)}</p>
        <p>Transaction id: {order.transactionId}</p>
        <p>Order id: {order._id}</p>
      </td>
    </tr>
  );
}
