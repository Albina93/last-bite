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

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100] flex items-center justify-center">
        <p className="text-[#6b7280]">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-100] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  const pendingClaims = claims.filter((c) => c.status === "pending");
  const pickedUpClaims = claims.filter((c) => c.status === "picked_up");

  return (
    <div className="min-h-screen bg-gray-100]">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-[#2d2d2d] mb-8">My claims</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#d4cfc6] rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#4a7c59]">{claims.length}</p>
            <p className="text-xs text-[#6b7280] mt-1">Total claims</p>
          </div>
          <div className="bg-white border border-[#d4cfc6] rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#4a7c59]">
              {pendingClaims.length}
            </p>
            <p className="text-xs text-[#6b7280] mt-1">Pending pickup</p>
          </div>
          <div className="bg-white border border-[#d4cfc6] rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#4a7c59]">
              {pickedUpClaims.length}
            </p>
            <p className="text-xs text-[#6b7280] mt-1">Picked up</p>
          </div>
        </div>

        {cancelError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {cancelError}
          </div>
        )}

        {claims.length === 0 ? (
          <div className="bg-white border border-[#d4cfc6] rounded-2xl p-10 text-center">
            <p className="text-[#6b7280]">You have no claims yet</p>

            <Link
              to="/home"
              className="text-[#4a7c59] text-sm font-medium hover:underline mt-2 inline-block"
            >
              Browse listings →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {claims.map((claim) => (
              <div
                key={claim._id}
                className="bg-white border border-[#d4cfc6] rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#2d2d2d]">
                        {claim.listing_id?.title || "Listing unavailable"}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          claim.status === "picked_up"
                            ? "bg-[#e8f0e9] text-[#4a7c59]"
                            : "bg-gray-100] text-[#6b7280]"
                        }`}
                      >
                        {claim.status === "picked_up"
                          ? "✓ Picked up"
                          : "Pending"}
                      </span>
                    </div>
                    <p className="text-[#6b7280] text-sm">
                      📍 {claim.listing_id?.location} · 🕐{" "}
                      {claim.listing_id?.pickup_time}
                    </p>
                    {claim.donation_note && (
                      <p className="text-[#6b7280] text-xs mt-1">
                        Note: {claim.donation_note}
                      </p>
                    )}
                    <p className="text-[#6b7280] text-xs mt-1">
                      Claimed: {new Date(claim.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {claim.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePickedUp(claim._id)}
                        className="text-[#4a7c59] text-sm font-medium border border-[#4a7c59] px-3 py-1.5 rounded-lg hover:bg-[#e8f0e9] transition-colors"
                      >
                        Picked up
                      </button>
                      <button
                        onClick={() => handleCancel(claim._id)}
                        className="text-red-500 text-sm font-medium border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimerDashboard;
