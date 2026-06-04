import { useState, useEffect } from "react";
import api from "../utils/api";

function useMyListings() {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/api/listings/my-listings");
        setMyListings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, []);
  return { myListings, loading, error };
}

export default useMyListings;
