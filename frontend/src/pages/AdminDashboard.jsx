import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState(null);

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
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-5">

        <div className="border p-5 rounded shadow">
          <h3 className="font-semibold">
            Total Complaints
          </h3>

          <p className="text-2xl">
            {stats?.total || 0}
          </p>
        </div>

        <div className="border p-5 rounded shadow">
          <h3 className="font-semibold">
            Pending
          </h3>

          <p className="text-2xl">
            {stats?.pending || 0}
          </p>
        </div>

        <div className="border p-5 rounded shadow">
          <h3 className="font-semibold">
            In Progress
          </h3>

          <p className="text-2xl">
            {stats?.inProgress || 0}
          </p>
        </div>

        <div className="border p-5 rounded shadow">
          <h3 className="font-semibold">
            Resolved
          </h3>

          <p className="text-2xl">
            {stats?.resolved || 0}
          </p>
        </div>

      </div>

      <button
        onClick={() => navigate("/complaints")}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded"
      >
        View All Complaints
      </button>

    </div>
  );
}

export default AdminDashboard;