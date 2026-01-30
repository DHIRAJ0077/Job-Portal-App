import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AdminRoute = ({ children }) => {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
