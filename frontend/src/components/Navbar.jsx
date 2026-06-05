import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-50 border-b border-[#d4cfc6] px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-[#4a7c59] font-bold text-xl tracking-tight flex items-center gap-2"
        >
          🍃 Last Bite
        </Link>

        {/* Navigation links */}
        {user ? (
          <div className="flex items-center gap-6">
            <span className="text-[#6b7280] text-sm">
              Hello,{" "}
              <span className="text-[#2d2d2d] font-medium">{user.name}</span>
            </span>

            {/* Browse food */}
            <Link
              to="/home"
              className="text-[#4a7c59] text-sm font-medium hover:underline"
            >
              Browse food
            </Link>

            <Link
              to="/dashboard"
              className="text-[#4a7c59] text-sm font-medium hover:underline"
            >
              Dashboard
            </Link>
            {user.role === "donor" && (
              <Link
                to="/listings/create"
                className="bg-[#4a7c59] text-white text-sm px-4 py-2 rounded-full hover:bg-[#3d6b4a] transition-colors"
              >
                + Post food
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-[#6b7280] text-sm hover:text-[#2d2d2d] transition-colors"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-[#4a7c59] text-sm font-medium hover:underline"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-[#4a7c59] text-white text-sm px-4 py-2 rounded-full hover:bg-[#3d6b4a] transition-colors"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
