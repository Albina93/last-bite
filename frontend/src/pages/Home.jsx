import useListings from "../hooks/useListings";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const { listings, loading, error } = useListings();

  if (loading)
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <p className="text-[#6b7280]">Loading listings...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Hero section */}
      <div className="bg-[#e8f0e9] border-b border-[#d4cfc6] py-12 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#2d2d2d] mb-3">
          Don't let good food go to waste
        </h1>
        <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
          Claim leftovers near you - free or by donation.
        </p>
      </div>

      {/* Listings grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {listings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6b7280] text-lg">
              No listings available right now.
            </p>
            <p className="text-[#6b7280] text-sm mt-2">Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
