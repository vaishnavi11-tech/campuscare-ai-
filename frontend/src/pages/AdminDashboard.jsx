import { useEffect, useState } from "react";
import API from "../api/api";

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await API.get("/complaints/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(response.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();

  }, []);

  
   return (
  <div>

    <h1>Admin Dashboard</h1>

    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

      <div style={{
        border: "1px solid black",
        padding: "20px",
        width: "200px"
      }}>
        <h3>Total Complaints</h3>
        <p>{stats?.total}</p>
      </div>

      <div style={{
        border: "1px solid black",
        padding: "20px",
        width: "200px"
      }}>
        <h3>Pending</h3>
        <p>{stats?.pending}</p>
      </div>

      <div style={{
        border: "1px solid black",
        padding: "20px",
        width: "200px"
      }}>
        <h3>In Progress</h3>
        <p>{stats?.inProgress}</p>
      </div>

      <div style={{
        border: "1px solid black",
        padding: "20px",
        width: "200px"
      }}>
        <h3>Resolved</h3>
        <p>{stats?.resolved}</p>
      </div>

    </div>

  </div>
);
}

export default AdminDashboard;