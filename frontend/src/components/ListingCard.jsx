import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white border border-[#d4cfc6] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Photo */}
      {listing.photo_url ? (
        <img
          src={listing.photo_url}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-[#e8f0e9] flex items-center justify-center">
          <span className="text-[#6b7280] text-sm">No photo available</span>
        </div>
      )}

      {/* Card body */}
      <div className="p-4">
        <h3 className="text-[#2d2d2d] font-semibold text-lg mb-1">
          {listing.title}
        </h3>
        <p className="text-[#6b7280] text-sm mb-3 line-clamp-2">
          {listing.description}
        </p>

        {/* Details */}
        <div className="flex flex-col gap-1 mb-3">
          <p className="text-[#6b7280] text-sm">
            📦 {listing.quantity} portions
          </p>
          <p className="text-[#6b7280] text-sm">📍 {listing.location}</p>
          <p className="text-[#6b7280] text-sm">
            🕐 Pickup by {listing.pickup_time}
          </p>
        </div>

        {/* Donation badge */}
        <div className="flex items-center justify-between">
          {listing.accept_donations ? (
            <span className="bg-[#e8f0e9] text-[#4a7c59] text-xs px-3 py-1 rounded-full font-medium">
              Donation welcome
            </span>
          ) : (
            <span className="bg-[#f0fdf4] text-[#4a7c59] text-xs px-3 py-1 rounded-full font-medium">
              Free
            </span>
          )}

          <Link
            to={`/listings/${listing._id}`}
            className="text-[#4a7c59] text-sm font-medium hover:underline"
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
