import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

const CreateListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photo_url: "",
    quantity: "",
    pickup_time: "",
    location: "",
    accept_donations: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/api/listings", formData);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100]">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/dashboard"
            className="text-[#4a7c59] text-sm font-medium hover:underline"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-[#2d2d2d]">Post food</h1>
        </div>

        <div className="bg-white border border-[#d4cfc6] rounded-2xl p-8 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-[#2d2d2d] text-sm font-medium block mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Pasta + garlic bread"
                className="w-full border border-[#d4cfc6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors"
              />
            </div>

            <div>
              <label className="text-[#2d2d2d] text-sm font-medium block mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe the food — freshness, quantity, any details..."
                className="w-full border border-[#d4cfc6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors resize-none h-24"
              />
            </div>

            <div>
              <label className="text-[#2d2d2d] text-sm font-medium block mb-1">
                Photo URL{" "}
                <span className="text-[#6b7280] font-normal">(optional)</span>
              </label>
              <input
                type="text"
                name="photo_url"
                value={formData.photo_url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-[#d4cfc6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#2d2d2d] text-sm font-medium block mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 8"
                  min="1"
                  className="w-full border border-[#d4cfc6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors"
                />
              </div>

              <div>
                <label className="text-[#2d2d2d] text-sm font-medium block mb-1">
                  Pickup time
                </label>
                <input
                  type="text"
                  name="pickup_time"
                  value={formData.pickup_time}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 8-9pm"
                  className="w-full border border-[#d4cfc6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[#2d2d2d] text-sm font-medium block mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g. 123 Main St, Downtown"
                className="w-full border border-[#d4cfc6] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 bg-gray-100] rounded-lg px-4 py-3">
              <input
                type="checkbox"
                name="accept_donations"
                id="accept_donations"
                checked={formData.accept_donations}
                onChange={handleChange}
                className="w-4 h-4 accent-[#4a7c59]"
              />
              <label
                htmlFor="accept_donations"
                className="text-[#2d2d2d] text-sm cursor-pointer"
              >
                I accept donations for this listing
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#4a7c59] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#3d6b4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Posting..." : "Post listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
