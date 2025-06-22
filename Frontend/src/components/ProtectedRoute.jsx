import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
