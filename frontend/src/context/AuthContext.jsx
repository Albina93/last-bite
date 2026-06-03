import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // starting with null, no one logged in
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await api.get("/api/users/me");
          setUser(data);
        } catch (err) {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  const register = async (name, email, password, role) => {
    const { data } = await api.post("/api/users/register", {
      name,
      email,
      password,
      role,
    });
    localStorage.setItem("token", data.token); // saves the token
    const userRes = await api.get("/api/users/me"); // fetches full user info
    setUser(userRes.data);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/api/users/login", {
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    const userResponse = await api.get("/api/users/me");
    setUser(userResponse.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
