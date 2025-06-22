import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

      {/* Welcome Box */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold">Welcome, {user.name} 👋</h2>
        <p className="text-gray-600">Manage SkillSetu with confidence.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-5 text-center hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
          <p className="text-3xl text-blue-500 font-bold">120</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5 text-center hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Products</h3>
          <p className="text-3xl text-green-500 font-bold">45</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5 text-center hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
          <p className="text-3xl text-purple-500 font-bold">200</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
