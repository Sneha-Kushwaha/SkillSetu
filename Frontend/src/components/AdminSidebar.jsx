import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 text-white bg-gray-900 fixed top-4 left-4 z-50 rounded"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:h-screen`}
      >
        <div className="text-2xl font-bold p-4 border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex flex-col p-4 gap-2">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `p-2 rounded hover:bg-gray-800 ${isActive ? 'bg-gray-800 font-semibold' : ''}`
            }
            onClick={() => setIsOpen(false)} // close sidebar on mobile after click
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/artisans"
            className={({ isActive }) =>
              `p-2 rounded hover:bg-gray-800 ${isActive ? 'bg-gray-800 font-semibold' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            Artisans
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `p-2 rounded hover:bg-gray-800 ${isActive ? 'bg-gray-800 font-semibold' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            Products
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `p-2 rounded hover:bg-gray-800 ${isActive ? 'bg-gray-800 font-semibold' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            Orders
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default AdminSidebar;
