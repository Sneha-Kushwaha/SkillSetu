import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FakeRazorpayModal from "../components/FakeRazorpayModal";
import api from "../api/axios"; // ✅ Import this if not already

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFakePaymentSuccess = async () => {
    const userId = localStorage.getItem("userId");
    const userCartProducts = cart.map(item => ({
      product: item._id,
      quantity: item.quantity,
    }));

    try {
      await api.post("/orders", {
        customer: userId,
        products: userCartProducts,
        totalAmount: total,
        paymentStatus: "Paid",
        paymentId: "FAKE_PAYMENT_1234"
      });

      clearCart();
      navigate("/invoice");
    } catch (err) {
      console.error("Order failed to save:", err);
      alert("Failed to complete order. Try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Pay with Razorpay (Fake)
        </button>
      </div>

      {showModal && (
        <FakeRazorpayModal
          onClose={() => setShowModal(false)}
          onSuccess={handleFakePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Checkout;
