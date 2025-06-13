import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-6 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-orange-600">SkillSetu</h1>
      <div className="space-x-4">
        <NavLink to="/" className="text-gray-700 hover:text-orange-600">Home</NavLink>
        <NavLink to="/shop" className="text-gray-700 hover:text-orange-600">Shop</NavLink>
        <NavLink to="/cart" className="text-gray-700 hover:text-orange-600">Cart</NavLink>
        <NavLink to="/admin" className="text-gray-700 hover:text-orange-600">Admin</NavLink>
      </div>
    </nav>
  );
}
