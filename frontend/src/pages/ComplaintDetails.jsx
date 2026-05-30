import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function ComplaintDetails() {

  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);

  useEffect(() => {

    fetchComplaint();

  }, []);

  const fetchComplaint = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        `/complaints/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaint(response.data.complaint);

    } catch (error) {

      console.log(error);

    }
  };

  if (!complaint) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Complaint Details
      </h1>

      <div className="border p-6 rounded-lg space-y-4">

        <p>
          <strong>Title:</strong>{" "}
          {complaint.title}
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {complaint.description}
        </p>

        <p>
          <strong>Student:</strong>{" "}
          {complaint.student?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {complaint.student?.email}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {complaint.aiResult?.category}
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          {complaint.aiResult?.priority}
        </p>

        <p>
          <strong>Suggested Resolution:</strong>{" "}
          {complaint.aiResult?.suggestedResolution}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {complaint.status}
        </p>

        <p>
          <strong>Assigned Staff:</strong>{" "}
          {complaint.assignedTo?.name || "Not Assigned"}
        </p>

      </div>

    </div>
  );
}

export default ComplaintDetails;