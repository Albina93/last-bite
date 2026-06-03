import useListing from "../hooks/useListing";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listing, loading: fetchLoading } = useListing(id);
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

  // formwill be pre-filled when listing loads
  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title,
        description: listing.description,
        photo_url: listing.photo_url,
        quantity: listing.quantity,
        pickup_time: listing.pickup_time,
        location: listing.location,
        accept_donations: listing.accept_donations,
      });
    }
  }, [listing]);

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
      await api.put(`/api/listings/${id}`, formData);
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
  if (fetchLoading) return <p>Loading...</p>;
  return (
    <div>
      <h1>Edit listing</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Photo URL</label>
          <input
            type="text"
            name="photo_url"
            value={formData.photo_url}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Time</label>
          <input
            type="text"
            name="pickup_time"
            value={formData.pickup_time}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Accepts donations?</label>
          <input
            type="checkbox"
            name="accept_donations"
            checked={formData.accept_donations}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
};
export default EditListing;
