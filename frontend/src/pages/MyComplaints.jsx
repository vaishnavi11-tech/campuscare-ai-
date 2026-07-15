import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await API.get("/complaints/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaints(res.data.complaints);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "in-progress":
        return "text-blue-600";
      case "resolved":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-3xl font-bold mb-6">My Complaints</h1>

        {loading ? (
          <p>Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          <div className="grid gap-6">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="bg-white p-6 rounded-xl shadow">
                {/* Complaint Info */}
                <h2 className="text-xl font-bold mb-2">{complaint.title}</h2>
                <p className="mb-4 text-gray-700">{complaint.description}</p>

                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {complaint.category || "Not Categorized"}
                  </p>

                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={`font-semibold ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Assigned Staff:</span>{" "}
                    {complaint.assignedTo ? "Assigned" : "Not Assigned Yet"}
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  Created: {new Date(complaint.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyComplaints;
