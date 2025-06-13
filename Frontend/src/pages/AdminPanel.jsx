import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar'; // Sidebar import
import axios from 'axios';

const AdminPanel = () => {
  const [stats, setStats] = useState({});
  const [artisans, setArtisans] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axios.get('/api/admin/stats');
        const artisansRes = await axios.get('/api/admin/pending-artisans');
        const productsRes = await axios.get('/api/admin/pending-products');
        setStats(statsRes.data);
        setArtisans(artisansRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const approveArtisan = async (id) => {
    try {
      await axios.post(`/api/admin/approve-artisan/${id}`);
      setArtisans((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error('Error approving artisan:', error);
    }
  };

  const approveProduct = async (id) => {
    try {
      await axios.post(`/api/admin/approve-product/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error approving product:', error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />  {/* Sidebar yahan call kiya */}

      <main className="p-6 flex-1 ml-64">  {/* Sidebar ke baaju ka content */}
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white shadow p-4 rounded text-center">
            <p className="text-gray-500">Artisans</p>
            <p className="text-xl font-bold">{stats.totalArtisans || 0}</p>
          </div>
          <div className="bg-white shadow p-4 rounded text-center">
            <p className="text-gray-500">Products</p>
            <p className="text-xl font-bold">{stats.totalProducts || 0}</p>
          </div>
          <div className="bg-white shadow p-4 rounded text-center">
            <p className="text-gray-500">Orders</p>
            <p className="text-xl font-bold">{stats.totalOrders || 0}</p>
          </div>
          <div className="bg-white shadow p-4 rounded text-center">
            <p className="text-gray-500">Revenue</p>
            <p className="text-xl font-bold">${stats.totalRevenue?.toFixed(2) || '0.00'}</p>
          </div>
        </div>

        {/* Pending Artisans Table */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Pending Artisans</h3>
          <table className="min-w-full bg-white rounded overflow-hidden text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            {/* Body aapne commented kiya hai, zarurat ho to uncomment kar lena */}
          </table>
        </div>

        {/* Pending Products Table */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Pending Products</h3>
          <table className="min-w-full bg-white rounded overflow-hidden text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Product</th>
                <th className="p-2">Artisan</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            {/* Body aapne commented kiya hai, zarurat ho to uncomment kar lena */}
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
