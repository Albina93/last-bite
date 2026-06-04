import { useState } from "react";
import useClaims from "../hooks/useClaims";
import api from "../utils/api";
import { Link } from "react-router-dom";

const ClaimerDashboard = () => {
  const { claims, loading, error } = useClaims();
  const [cancelError, setCancelError] = useState(null);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this claim?")) return;
    try {
      await api.delete(`/api/claims/${id}`);
      window.location.reload();
    } catch (err) {
      setCancelError(err.response?.data?.message || "Failed to cancel claim");
    }
  };

  const handlePickedUp = async (id) => {
    try {
      await api.put(`/api/claims/${id}`, { status: "picked_up" });
      window.location.reload();
    } catch (err) {
      setCancelError(err.response?.data?.message || "Failed to update claim");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Claims</h2>
      {cancelError && <p>{cancelError}</p>}

      {claims.length === 0 ? (
        <p>You have no claims yet</p>
      ) : (
        <ul>
          {claims.map((claim) => (
            <li key={claim._id}>
              <h3>{claim.listing_id?.title}</h3>
              <p>Location: {claim.listing_id?.location}</p>
              <p>Pickup: {claim.listing_id?.pickup_time}</p>
              <p>Status: {claim.status}</p>
              <p>Donation note: {claim.donation_note || "None"}</p>
              <p>
                Claimed at: {new Date(claim.createdAt).toLocaleDateString()}
              </p>
              {claim.status === "pending" && (
                <div>
                  <button onClick={() => handlePickedUp(claim._id)}>
                    Mark as picked up
                  </button>
                  <button onClick={() => handleCancel(claim._id)}>
                    Cancel claim
                  </button>
                </div>
              )}

              {claim.status === "picked_up" && <p>✓ Picked up</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ClaimerDashboard;
