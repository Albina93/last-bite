import { useParams, Link } from "react-router-dom";
import useListing from "../hooks/useListing";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import api from "../utils/api";

const ListingDetail = () => {
  const { id } = useParams();
  const { listing, loading, error } = useListing(id);
  const { user } = useAuth();
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimError, setClaimError] = useState(null);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [donationNote, setDonationNote] = useState("");

  const handleClaim = async () => {
    setClaimLoading(true);
    setClaimError(null);
    try {
      await api.post(`/api/listings/${id}/claims`, {
        donation_note: donationNote,
      });
      setClaimSuccess(true);
      window.location.reload();
    } catch (err) {
      if (err.response) {
        setClaimError(err.response.data.message);
      } else {
        setClaimError("Something went wrong. Please try again");
      }
    } finally {
      setClaimLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100] flex items-center justify-center">
        <p className="text-[#6b7280]">Loading listing...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-100] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100]">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Back button */}
        <Link
          to="/home"
          className="text-[#4a7c59] text-sm font-medium hover:underline flex items-center gap-1 mb-6"
        >
          ← Back to listings
        </Link>

        {listing && (
          <div className="bg-white border border-[#d4cfc6] rounded-2xl overflow-hidden shadow-sm">
            {/* Photo */}
            {listing.photo_url ? (
              <img
                src={listing.photo_url}
                alt={listing.title}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-[#e8f0e9] flex items-center justify-center">
                <span className="text-[#6b7280]">No photo available</span>
              </div>
            )}

            <div className="p-6">
              {/* Title and badge */}
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-[#2d2d2d]">
                  {listing.title}
                </h1>
                {listing.accept_donations ? (
                  <span className="bg-[#e8f0e9] text-[#4a7c59] text-xs px-3 py-1 rounded-full font-medium">
                    Donation welcome
                  </span>
                ) : (
                  <span className="bg-[#f0fdf4] text-[#4a7c59] text-xs px-3 py-1 rounded-full font-medium">
                    Free
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[#6b7280] text-sm mb-6">
                {listing.description}
              </p>

              {/* Details */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#6b7280] mb-1">Portions</p>
                  <p className="font-semibold text-[#2d2d2d]">
                    {listing.quantity}
                  </p>
                </div>
                <div className="bg-gray-100] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#6b7280] mb-1">Pickup</p>
                  <p className="font-semibold text-[#2d2d2d]">
                    {listing.pickup_time}
                  </p>
                </div>
                <div className="bg-gray-100] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#6b7280] mb-1">Location</p>
                  <p className="font-semibold text-[#2d2d2d] text-xs">
                    {listing.location}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#d4cfc6] mb-6"></div>

              {/* Claim section — claimers only */}
              {user && user.role === "claimer" && (
                <div>
                  {listing.status === "closed" ? (
                    <div className="bg-gray-100] rounded-xl p-4 text-center">
                      <p className="text-[#6b7280] text-sm">
                        This listing is no longer available
                      </p>
                    </div>
                  ) : claimSuccess ? (
                    <div className="bg-[#e8f0e9] border border-[#4a7c59] rounded-xl p-4 text-center">
                      <p className="text-[#4a7c59] font-medium">
                        🎉 You have successfully claimed this listing!
                      </p>
                    </div>
                  ) : (
                    <div>
                      {claimError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                          {claimError}
                        </div>
                      )}
                      <label className="text-[#2d2d2d] text-sm font-medium block mb-2">
                        Donation note (optional)
                      </label>
                      <textarea
                        placeholder="Leave a note for the donor..."
                        value={donationNote}
                        onChange={(e) => setDonationNote(e.target.value)}
                        className="w-full border border-[#d4cfc6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4a7c59] transition-colors mb-4 resize-none h-24"
                      />
                      <button
                        onClick={handleClaim}
                        disabled={claimLoading}
                        className="w-full bg-[#4a7c59] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#3d6b4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {claimLoading ? "Claiming..." : "Claim this food"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Not logged in */}
              {!user && (
                <div className="bg-gray-100] rounded-xl p-4 text-center">
                  <p className="text-[#6b7280] text-sm">
                    Please{" "}
                    <Link
                      to="/login"
                      className="text-[#4a7c59] font-medium hover:underline"
                    >
                      log in
                    </Link>{" "}
                    to claim this food
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetail;
