import { useEffect, useState } from "react";
import API from "../api/api";

function MyComplaints() {

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await API.get(
          "complaints/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

     setComplaints(res.data.complaints);
      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchComplaints();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Complaints
      </h1>

      {loading ? (

        <p>Loading complaints...</p>

      ) : complaints.length === 0 ? (

        <p>No complaints found</p>

      ) : (

        <div className="grid gap-4">

          {complaints.map((complaint) => (

            <div
              key={complaint._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h2 className="text-xl font-bold mb-2">
                {complaint.title}
              </h2>

              <p className="mb-2">
                {complaint.description}
              </p>

              <p>
                <span className="font-semibold">
                  Category:
                </span>{" "}
                {complaint.category}
              </p>

              <p>
                <span className="font-semibold">
                  Priority:
                </span>{" "}
                {complaint.priority}
              </p>

              <p>
                <span className="font-semibold">
                  Status:
                </span>{" "}
                {complaint.status}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyComplaints;