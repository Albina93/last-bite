import { useParams } from "react-router-dom";
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
    // set claim loading to true
    setClaimLoading(true);
    // clear claim error
    setClaimError(null);
    //  try — call POST /api/listings/:id/claims with donationNote
    try {
      await api.post(`/api/listings/${id}/claims`, {
        donation_note: donationNote,
      });
      //  set claimSuccess to true
      setClaimSuccess(true);
      window.location.reload();
    } catch (err) {
      //  catch — set claim error
      if (err.response) {
        setClaimError(err.response.data.message);
      } else {
        setClaimError("Something went wrong. Please try again");
      }
    } finally {
      // set claim loading to false
      setClaimLoading(false);
    }
  };

  return (
    <div>
      {/* loading state  */}
      {loading && <p>Loading...</p>}

      {/* Error state  */}
      {error && <p>{error}</p>}

      {/* Listing details  */}
      {listing && (
        <div>
          {/* Photo  */}
          {listing.photo_url ? (
            <img src={listing.photo_url} alt={listing.title} />
          ) : (
            <div>No image available</div>
          )}

          {/* Title  */}
          <h1>{listing.title}</h1>

          {/* Description  */}
          <p>{listing.description}</p>

          {/* Details */}
          <p>Quantity: {listing.quantity}</p>
          <p>Pickup: {listing.pickup_time}</p>
          <p>Location: {listing.location}</p>

          {/* Donation part */}
          {listing.accept_donations ? (
            <span>Donation welcome</span>
          ) : (
            <span>Free</span>
          )}

          {/* Claim section — claimers only */}
          {user && user.role === "claimer" && (
            <div>
              {listing.status === "closed" ? (
                // listing is closed — no more claims
                <p>This listing is no longer available</p>
              ) : claimSuccess ? (
                //success message
                <p>You have successfully claimed this listing!</p>
              ) : (
                // claim form
                <div>
                  {claimError && <p>{claimError}</p>}
                  <textarea
                    placeholder="Leave a donation note (optional)"
                    value={donationNote}
                    onChange={(e) => setDonationNote(e.target.value)}
                  />
                  <button onClick={handleClaim} disabled={claimLoading}>
                    {claimLoading ? "Claiming..." : "Claim this food"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Not logged in  */}
          {!user && (
            <p>
              Please <a href="/login">login</a> to claim this food
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default ListingDetail;
