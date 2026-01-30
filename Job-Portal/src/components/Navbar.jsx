import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#13823a] py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-white text-2xl font-bold"
          >
            <span>JobPortal</span>
          </Link>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className={`text-white font-medium px-4 py-2 rounded-lg ${
                location.pathname === "/" ? "bg-white/30" : ""
              }`}
            >
              Home
            </Link>

            <Link
              to="/jobs"
              className={`text-white font-medium px-4 py-2 rounded-lg ${
                location.pathname === "/jobs" ? "bg-white/30" : ""
              }`}
            >
              Browse Jobs
            </Link>

            {user && (
              <Link
                to="/dashboard"
                className={`text-white font-medium px-4 py-2 rounded-lg ${
                  location.pathname === "/dashboard" ? "bg-white/30" : ""
                }`}
              >
                Dashboard
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className={`text-white font-medium px-4 py-2 rounded-lg ${
                  location.pathname === "/admin" ? "bg-white/30" : ""
                }`}
              >
                Admin
              </Link>
            )}

            {/* ===== AUTH BUTTONS ===== */}
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-[#13823a] px-4 py-2 rounded-lg font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-white text-white px-4 py-2 rounded-lg font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
