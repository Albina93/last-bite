import useListings from "../hooks/useListings";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const { loading, listings, error } = useListings();
  console.log("listings:", listings);
  console.log("loading:", loading);
  console.log("error:", error);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (listings.length === 0) {
    return <p>No listings available</p>;
  }
  return (
    <div>
      <h3>Available food near you</h3>
      <div>
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};
export default Home;
