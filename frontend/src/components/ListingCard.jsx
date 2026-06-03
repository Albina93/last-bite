import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div>
      {/* Photo */}
      {listing.photo_url ? (
        <img src={listing.photo_url} alt={listing.title} />
      ) : (
        <div>No photo available</div>
      )}

      {/* Title  */}
      <h2>{listing.title}</h2>

      {/* Description  */}
      <p>{listing.description}</p>

      {/* Details  */}
      <p>{listing.quantity}</p>
      <p>{listing.location}</p>
      <p>{listing.pickup_time}</p>

      {/* Donation badge  */}
      {listing.accepts_donations ? (
        <span>Donation welcome</span>
      ) : (
        <span>Free</span>
      )}

      {/* Link to deatil page  */}
      <Link to={`/listings/${listing._id}`}>View details</Link>
    </div>
  );
};

export default ListingCard;
