import { useState } from "react";
import useMyListings from "../hooks/useMyListings";
import api from "../utils/api";
import { Link } from "react-router-dom";

const DonorDashboard = () => {
  const { myListings, loading, error } = useMyListings();
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/api/listings/${id}`);
      window.location.reload();
    } catch (err) {
      setDeleteError(err.response?.data?.message || "Failed to delete listing");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // calculate totals from all listings
  const totalListings = myListings.length;
  const totalClaims = myListings.reduce(
    (sum, listing) => sum + listing.totalClaims,
    0,
  );
  const totalPending = myListings.reduce(
    (sum, listing) => sum + listing.pendingClaims,
    0,
  );
  const totalPickedUp = myListings.reduce(
    (sum, listing) => sum + listing.pickedUpClaims,
    0,
  );

  return (
    <div>
      <h2>My listings</h2>

      <div>
        <p>Total listings: {totalListings}</p>
        <p>Total claims: {totalClaims}</p>
        <p>Pending: {totalPending}</p>
        <p>Picked up: {totalPickedUp}</p>
      </div>

      {deleteError && <p>{deleteError}</p>}
      <Link to="/listings/create">+ Post food</Link>

      {myListings.length === 0 ? (
        <p>You have no listings yet</p>
      ) : (
        <ul>
          {myListings.map((listing) => (
            <li key={listing._id}>
              <h3>{listing.title}</h3>
              <p>Quantity: {listing.quantity}</p>
              <p>Status: {listing.status}</p>
              <p>Location: {listing.location}</p>
              <p>Pickup: {listing.pickup_time}</p>
              <Link to={`/listings/${listing._id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(listing._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default DonorDashboard;
