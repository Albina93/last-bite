import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav>
      {/* Logo */}
      <Link to="/">Last Bite</Link>

      {/* Navigation Links */}
      {user ? (
        // logged in
        <div>
          <span>Hello, {user.name}</span>
          <Link to="/dashboard">Dashboard</Link>
          {user.role === "donor" && (
            <Link to="/listings/create">Post food</Link>
          )}
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        // not logged in
        <div>
          <Link to="/login">Log in</Link>
          <br />
          <Link to="/register">Sign up</Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
