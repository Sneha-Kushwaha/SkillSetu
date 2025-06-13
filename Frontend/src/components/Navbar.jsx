import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow px-6 py-4  w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">SkillSetu</h1>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-700 hover:text-orange-600 ${isActive ? "text-orange-600 font-semibold" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `text-gray-700 hover:text-orange-600 ${isActive ? "text-orange-600 font-semibold" : ""}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-gray-700 hover:text-orange-600 ${isActive ? "text-orange-600 font-semibold" : ""}`
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-gray-700 hover:text-orange-600 ${isActive ? "text-orange-600 font-semibold" : ""}`
            }
          >
            Admin
          </NavLink>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block text-gray-700 hover:text-orange-600 ${isActive ? "text-orange-600 font-semibold" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block text-gray-700 hover:text-orange-600 ${isActive ? "text-orange-600 font-semibold" : ""}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block text-gray-700 hover:text-orange-600 ${isActive ? "text-orange-600 font-semibold" : ""}`
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/admin"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block text-gray-700 hover:text-orange-600 ${isActive ? "text-orange-600 font-semibold" : ""}`
            }
          >
            Admin
          </NavLink>
        </div>
      )}
    </nav>
  );
}
