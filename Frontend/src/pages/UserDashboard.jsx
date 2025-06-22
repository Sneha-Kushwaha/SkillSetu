import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-blue-600">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-700">Welcome, {user.name} 🎉</h2>
          <p className="text-gray-500 mt-1">Here's your account overview.</p>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile Info</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        {/* Order History Placeholder */}
        <div className="bg-white rounded-lg shadow p-5 col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Orders</h3>
          <p className="text-gray-500 italic">Order data integration coming soon...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
