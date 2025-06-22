import { motion } from "framer-motion";

const FakeRazorpayModal = ({ onClose, onSuccess }) => {
  const handlePayment = () => {
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-xl font-bold text-center mb-4">Fake Razorpay Checkout</h2>
        <p className="mb-4 text-center text-gray-600">Pay securely for your order</p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePayment}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Simulate Payment
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FakeRazorpayModal;
