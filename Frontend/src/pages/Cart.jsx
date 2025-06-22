// src/pages/Cart.jsx
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty. <Link to="/" className="text-blue-500 underline">Go shopping</Link></p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center p-4 bg-white shadow rounded">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">₹{item.price} × {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-16 text-center border p-1 rounded"
                    onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                  />
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ₹{total.toFixed(2)}</p>
            <Link to="/checkout" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
