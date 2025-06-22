import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">SkillSetu</Link>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>
        <Link to="/cart" className="hover:text-blue-600 font-medium">Cart</Link>

        {!user ? (
          <>
            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </>
        ) : (
          <>
            <Link
              to={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
              className="text-green-600 font-semibold"
            >
              Dashboard
            </Link>

            <span className="text-sm text-gray-600 hidden md:inline">
              Hello, <strong>{user.name}</strong>{" "}
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                {user.role}
              </span>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
