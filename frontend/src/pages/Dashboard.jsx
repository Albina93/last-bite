import { useAuth } from "../context/AuthContext";
import DonorDashboard from "../components/DonorDashboard";
import ClaimerDashboard from "../components/ClaimerDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return user.role === "donor" ? <DonorDashboard /> : <ClaimerDashboard />;
};

export default Dashboard;
