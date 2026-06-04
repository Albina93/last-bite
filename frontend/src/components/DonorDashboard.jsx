import { useState } from "react";
import useMyListings from "../hooks/useMyListings";
import api from "../utils/api";
import { Link } from "react-router-dom";

const DonorDashboard = () => {
  const { myListings, loading, error } = useMyListings();
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;
    try {
      await api.delete(`/api/listings/${id}`);
      window.location.reload();
    } catch (err) {
      setDeleteError(err.response?.data?.message || "Failed to delete listing");
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

  // calculate totals
  const totalListings = myListings.length;
  const totalClaims = myListings.reduce((sum, l) => sum + l.totalClaims, 0);
  const totalPending = myListings.reduce((sum, l) => sum + l.pendingClaims, 0);
  const totalPickedUp = myListings.reduce(
    (sum, l) => sum + l.pickedUpClaims,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100]">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#2d2d2d]">My dashboard</h1>
          <Link
            to="/listings/create"
            className="bg-[#4a7c59] text-white text-sm px-4 py-2 rounded-full hover:bg-[#3d6b4a] transition-colors"
          >
            + Post food
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#d4cfc6] rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#4a7c59]">{totalListings}</p>
            <p className="text-xs text-[#6b7280] mt-1">Total listings</p>
          </div>
          <div className="bg-white border border-[#d4cfc6] rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#4a7c59]">{totalClaims}</p>
            <p className="text-xs text-[#6b7280] mt-1">Total claims</p>
          </div>
          <div className="bg-white border border-[#d4cfc6] rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#4a7c59]">{totalPending}</p>
            <p className="text-xs text-[#6b7280] mt-1">Pending</p>
          </div>
          <div className="bg-white border border-[#d4cfc6] rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#4a7c59]">{totalPickedUp}</p>
            <p className="text-xs text-[#6b7280] mt-1">Picked up</p>
          </div>
        </div>

        {deleteError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {deleteError}
          </div>
        )}

        {/* Listings */}
        {myListings.length === 0 ? (
          <div className="bg-white border border-[#d4cfc6] rounded-2xl p-10 text-center">
            <p className="text-[#6b7280]">You have no listings yet</p>
            <Link
              to="/listings/create"
              className="text-[#4a7c59] text-sm font-medium hover:underline mt-2 inline-block"
            >
              Post your first listing →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {myListings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white border border-[#d4cfc6] rounded-2xl p-5 flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#2d2d2d]">
                      {listing.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        listing.status === "active"
                          ? "bg-[#e8f0e9] text-[#4a7c59]"
                          : "bg-gray-100] text-[#6b7280]"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </div>
                  <p className="text-[#6b7280] text-sm">
                    📦 {listing.quantity} portions · 📍 {listing.location} · 🕐{" "}
                    {listing.pickup_time}
                  </p>
                  <p className="text-[#6b7280] text-xs mt-1">
                    {listing.totalClaims} claims · {listing.pendingClaims}{" "}
                    pending · {listing.pickedUpClaims} picked up
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/listings/${listing._id}/edit`}
                    className="text-[#4a7c59] text-sm font-medium border border-[#4a7c59] px-3 py-1.5 rounded-lg hover:bg-[#e8f0e9] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="text-red-500 text-sm font-medium border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
