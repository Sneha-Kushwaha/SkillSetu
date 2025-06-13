import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0">
      <div className="text-2xl font-bold p-4 border-b border-gray-700">Admin Panel</div>
      <nav className="flex flex-col p-4 gap-2">
        <NavLink to="/admin" className="hover:bg-gray-800 p-2 rounded">Dashboard</NavLink>
        <NavLink to="/admin/artisans" className="hover:bg-gray-800 p-2 rounded">Artisans</NavLink>
        <NavLink to="/admin/products" className="hover:bg-gray-800 p-2 rounded">Products</NavLink>
        <NavLink to="/admin/orders" className="hover:bg-gray-800 p-2 rounded">Orders</NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
