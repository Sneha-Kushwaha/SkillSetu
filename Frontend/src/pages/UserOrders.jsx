// src/pages/UserOrders.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    api.get(`/orders/${userId}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error loading orders:", err));
  }, []);

  if (orders.length === 0) {
    return <div className="p-6 text-center text-gray-500">No past orders found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧾 Your Order History</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow p-4 rounded border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Order ID: {order._id}</span>
              <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="text-sm text-gray-700">
              {order.products.map((item) => (
                <div key={item.product._id} className="flex justify-between">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>₹{item.product.price * item.quantity}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="mt-2 text-sm text-green-600">
                Payment Status: {order.paymentStatus}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
