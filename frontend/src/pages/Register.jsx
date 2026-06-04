import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
      );
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError("Server is not responding");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100] flex items-center justify-center px-4 pt-10">
      <div className="bg-white border border-[#d4cfc6] rounded-2xl p-8 w-full max-w-md shadow-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#4a7c59]">🍃 Last Bite</h1>
          <p className="text-[#6b7280] text-sm mt-1">Create your account</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[#2d2d2d] text-sm font-medium block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-[#d4cfc6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors"
              placeholder="Joe Kitchen"
            />
          </div>

          <div>
            <label className="text-[#2d2d2d] text-sm font-medium block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-[#d4cfc6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors"
              placeholder="joe@kitchen.com"
            />
          </div>

          <div>
            <label className="text-[#2d2d2d] text-sm font-medium block mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-[#d4cfc6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-[#2d2d2d] text-sm font-medium block mb-1">
              I am a...
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border border-[#d4cfc6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors bg-white"
            >
              <option value="">Select a role</option>
              <option value="donor">🍽 Restaurant / Cafe</option>
              <option value="claimer">🙋 Community member</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#4a7c59] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#3d6b4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-[#6b7280] text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#4a7c59] font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
