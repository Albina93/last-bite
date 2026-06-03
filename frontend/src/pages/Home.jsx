import useListings from "../hooks/useListings";

const Home = () => {
  const { loading, listings, error } = useListings();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (listings.length === 0) {
    return <p>No listings found</p>;
  }
  return (
    <ul>
      {listings.map((listing) => (
        <li key={listing._id}>
          <h3>{listing.title}</h3>
          <p>Location: {listing.location}</p>
          <p>{listing.description}</p>
        </li>
      ))}
    </ul>
  );
};
export default Home;
