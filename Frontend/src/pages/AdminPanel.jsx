import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import axios from 'axios';

const AdminPanel = () => {
  const [stats, setStats] = useState({});
  const [artisans, setArtisans] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axios.get('/api/admin/stats');
        const artisansRes = await axios.get('/api/admin/pending-artisans');
        const productsRes = await axios.get('/api/admin/pending-products');
        setStats(statsRes.data);
        setArtisans(Array.isArray(artisansRes.data) ? artisansRes.data : []);
        setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setLoading(false);
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
      <AdminSidebar />

      <main className="p-6 flex-1 ml-64">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['Artisans', 'Products', 'Orders', 'Revenue'].map((label, idx) => (
            <div key={idx} className="bg-white shadow p-4 rounded text-center">
              <p className="text-gray-500">{label}</p>
              <p className="text-xl font-bold">
                {
                  {
                    Artisans: stats.totalArtisans || 0,
                    Products: stats.totalProducts || 0,
                    Orders: stats.totalOrders || 0,
                    Revenue: `$${stats.totalRevenue?.toFixed(2) || '0.00'}`,
                  }[label]
                }
              </p>
            </div>
          ))}
        </div>

        {/* Pending Artisans */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Pending Artisans</h3>
          {loading ? (
            <p>Loading...</p>
          ) : artisans.length === 0 ? (
            <p className="text-gray-500">No pending artisans.</p>
          ) : (
            <table className="min-w-full bg-white text-sm rounded overflow-hidden">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {artisans.map((artisan) => (
                  <tr key={artisan._id} className="border-t">
                    <td className="p-2">{artisan.name}</td>
                    <td className="p-2">{artisan.email}</td>
                    <td className="p-2">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded"
                        onClick={() => approveArtisan(artisan._id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Pending Products */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Pending Products</h3>
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No pending products.</p>
          ) : (
            <table className="min-w-full bg-white text-sm rounded overflow-hidden">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2">Product</th>
                  <th className="p-2">Artisan</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.artisan?.name || 'N/A'}</td>
                    <td className="p-2">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded"
                        onClick={() => approveProduct(product._id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;
