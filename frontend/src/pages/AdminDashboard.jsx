import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";
import Layout from "../components/Layout";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/complaints/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setStats(res.data.stats);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Complaints",
      value: stats.total,
      color: "text-gray-800",
    },
    {
      label: "Pending",
      value: stats.pending,
      color: "text-yellow-500",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      color: "text-blue-500",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      color: "text-green-500",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-indigo-700 p-6 text-white shadow">
          <h1 className="text-3xl font-bold">
            CampusCare Admin Portal
          </h1>

          <p className="mt-2 text-indigo-100">
            Monitor complaints and manage grievance resolution.
          </p>
        </div>

        <div className="p-8">
          {/* Dashboard Introduction */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow">
            <h2 className="text-2xl font-semibold">
              Admin Dashboard
            </h2>

            <p className="mt-2 text-gray-600">
              View complaint statistics, assign staff, and track
              grievance resolutions.
            </p>
          </div>

          {/* Statistics */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map(({ label, value, color }) => (
              <div
                key={label}
                className="rounded-lg bg-white p-6 shadow"
              >
                <h3 className="text-gray-500">{label}</h3>

                <p className={`mt-2 text-4xl font-bold ${color}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate("/complaints")}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
              >
                View All Complaints
              </button>

              <button
                type="button"
                onClick={() => navigate("/manage-staff")}
                className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
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