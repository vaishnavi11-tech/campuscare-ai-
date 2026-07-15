import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [recentComplaints, setRecentComplaints] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecentComplaints();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/complaints/my-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/complaints/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecentComplaints(response.data.complaints.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 shadow">
          <h1 className="text-3xl font-bold">CampusCare Student Portal</h1>
          <p className="mt-2 text-blue-100">
            Manage and track your complaints easily
          </p>
        </div>

        <div className="p-8">
          {/* Welcome Card */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-semibold">
              Welcome, {localStorage.getItem("name")} 👋
            </h2>
            <p className="text-gray-600 mt-2">
              Submit complaints, track progress and stay updated.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Total Complaints</h3>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Pending</h3>
              <p className="text-3xl font-bold text-yellow-500 mt-2">
                {stats.pending}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">In Progress</h3>
              <p className="text-3xl font-bold text-blue-500 mt-2">
                {stats.inProgress}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Resolved</h3>
              <p className="text-3xl font-bold text-green-500 mt-2">
                {stats.resolved}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Link
              to="/create-complaint"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Create Complaint
            </Link>

            <Link
              to="/my-complaints"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              My Complaints
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
            >
              Logout
            </button>
          </div>

          {/* Recent Complaints */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>

            {recentComplaints.length === 0 ? (
              <p className="text-gray-500">No complaints found.</p>
            ) : (
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint._id} className="border rounded p-4">
                    <h3 className="font-semibold">{complaint.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Status: {complaint.status}
                    </p>
                    <Link
                      to={`/complaints/${complaint._id}`}
                      className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
