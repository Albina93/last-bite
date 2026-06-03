import { useState, useEffect } from "react";
import api from "../utils/api";

function useListing(id) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListingById = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/api/listings/${id}`);

        setListing(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch listing");
      } finally {
        setLoading(false);
      }
    };
    fetchListingById();
  }, [id]);
  return { listing, loading, error };
}

export default useListing;
