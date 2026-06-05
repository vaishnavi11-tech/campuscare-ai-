import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Layout from "../components/Layout";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/complaints/stats", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStats(res.data.stats);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">

        <div className="bg-indigo-700 text-white p-6 shadow">
          <h1 className="text-3xl font-bold">CampusCare Admin Portal</h1>
          <p className="mt-2 text-indigo-100">Monitor complaints and manage grievance resolution.</p>
        </div>

        <div className="p-8">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
            <p className="text-gray-600 mt-2">
              View complaint statistics, assign staff and track resolutions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Complaints", value: stats.total, color: "text-gray-800" },
              { label: "Pending", value: stats.pending, color: "text-yellow-500" },
              { label: "In Progress", value: stats.inProgress, color: "text-blue-500" },
              { label: "Resolved", value: stats.resolved, color: "text-green-500" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500">{label}</h3>
                <p className={`text-4xl font-bold mt-2 ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => navigate("/complaints")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                View All Complaints
              </button>
              <button
                type="button"
                onClick={() => navigate("/manage-staff")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Manage Staff
              </button>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default AdminDashboard;