import { useState, useEffect } from "react";
import api from "../utils/api";

function useListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/api/listings");
        // console.log("listings:", response.data);
        setListings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);
  return { listings, loading, error };
}

export default useListings;
