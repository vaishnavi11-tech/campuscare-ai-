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

        const token = localStorage.getItem("token");

        const response = await API.get(
          "/complaints/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data.stats);

      } catch (error) {

        console.log(error);

      }
    };

    fetchStats();

  }, []);

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-indigo-700 text-white p-6 shadow">

        <h1 className="text-3xl font-bold">
          CampusCare Admin Portal
        </h1>

        <p className="mt-2 text-indigo-100">
          Monitor complaints and manage grievance resolution.
        </p>

      </div>

      <div className="p-8">

        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">

          <h2 className="text-2xl font-semibold">
            Admin Dashboard
          </h2>

          <p className="text-gray-600 mt-2">
            View complaint statistics, assign staff and track resolutions.
          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500">
              Total Complaints
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.total}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500">
              Pending
            </h3>

            <p className="text-4xl font-bold text-yellow-500 mt-2">
              {stats.pending}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500">
              In Progress
            </h3>

            <p className="text-4xl font-bold text-blue-500 mt-2">
              {stats.inProgress}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500">
              Resolved
            </h3>

            <p className="text-4xl font-bold text-green-500 mt-2">
              {stats.resolved}
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={() => navigate("/complaints")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              View All Complaints
            </button>
            <button
  onClick={() =>
    navigate("/manage-staff")
  }
  className="mt-4 ml-4 bg-green-600 text-white px-6 py-3 rounded-xl"
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