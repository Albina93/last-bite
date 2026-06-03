import { useState, useEffect } from "react";
import api from "../utils/api";

function useClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/api/claims/my-claims");
        // console.log("listings:", response.data);
        setClaims(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);
  return { claims, loading, error };
}

export default useClaims;
