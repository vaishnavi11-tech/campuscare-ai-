
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Layout from "../components/Layout";

function ComplaintDetails() {

  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);

  const role = localStorage.getItem("role");

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

    return (
      <div className="p-10">
        <h2 className="text-2xl">
          Loading...
        </h2>
      </div>
    );

  }

  return (

    <Layout>

      <div className="min-h-screen bg-gray-100 p-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Complaint Details
          </h1>

          <p className="text-gray-600 mt-2">
            View complaint information and progress updates.
          </p>

        </div>

        {/* Complaint Overview */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Complaint Overview
          </h2>

          <div className="space-y-4">

            <div>

              <p className="font-semibold text-gray-500">
                Title
              </p>

              <p className="text-lg">
                {complaint.title}
              </p>

            </div>

            <div>

              <p className="font-semibold text-gray-500">
                Description
              </p>

              <p>
                {complaint.description}
              </p>

            </div>

          </div>

        </div>

        {/* Student Information - Admin Only */}

        {role === "admin" && (

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-semibold mb-4">
              Student Information
            </h2>

            <div className="space-y-3">

              <p>
                <span className="font-semibold">
                  Name:
                </span>{" "}
                {complaint.student?.name}
              </p>

              <p>
                <span className="font-semibold">
                  Email:
                </span>{" "}
                {complaint.student?.email}
              </p>

            </div>

          </div>

        )}

        {/* AI Insights - Admin Only */}

        {role === "admin" && (

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-semibold mb-4">
              AI Insights
            </h2>

            <div className="space-y-3">

              <p>
                <span className="font-semibold">
                  Category:
                </span>{" "}
                {complaint.aiResult?.category || "N/A"}
              </p>

              <p>
                <span className="font-semibold">
                  Priority:
                </span>{" "}
                {complaint.aiResult?.priority || "N/A"}
              </p>

              <p>
                <span className="font-semibold">
                  Suggested Resolution:
                </span>{" "}
                {complaint.aiResult?.suggestedResolution || "N/A"}
              </p>

            </div>

          </div>

        )}

        {/* Resolution Workflow */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Resolution Workflow
          </h2>

          <div className="space-y-3">

            <p>
              <span className="font-semibold">
                Category:
              </span>{" "}
              {complaint.aiResult?.category || "N/A"}
            </p>

            <p>
              <span className="font-semibold">
                Status:
              </span>{" "}
              {complaint.status}
            </p>
{complaint.escalated && (

  <p className="text-red-600 font-semibold">
    🚨 Escalated
  </p>

)}
            <p>
              <span className="font-semibold">
                Assigned Staff:
              </span>{" "}
              {complaint.assignedTo?.name || "Not Assigned"}
            </p>

            <p>
              <span className="font-semibold">
                Created:
              </span>{" "}
              {new Date(
                complaint.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

       
            
        {/* Complaint Timeline */}

<div className="bg-white rounded-xl shadow p-6 mt-6">

  <h2 className="text-2xl font-semibold mb-6">
    Complaint Timeline
  </h2>

  <div className="space-y-6">

    <div className="flex gap-4">

      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        🟢
      </div>

      <div>

        <p className="font-semibold">
          Complaint Created
        </p>

        <p className="text-gray-500 text-sm">
          {new Date(
            complaint.createdAt
          ).toLocaleString()}
        </p>

      </div>

    </div>

    {complaint.assignedTo && (

      <div className="flex gap-4">

        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          👨‍💼
        </div>

        <div>

          <p className="font-semibold">
            Assigned To {complaint.assignedTo.name}
          </p>

          <p className="text-gray-500 text-sm">
            Complaint assigned for resolution
          </p>

        </div>

      </div>

    )}

    {complaint.notes &&
      complaint.notes.map((note, index) => (

        <div
          key={index}
          className="flex gap-4"
        >

          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            📝
          </div>

          <div>

            <p className="font-semibold">
              Faculty Update
            </p>

            <p className="text-gray-700">
              {note.text}
            </p>

            <p className="text-gray-500 text-sm">
              {new Date(
                note.createdAt
              ).toLocaleString()}
            </p>

          </div>

        </div>

      ))}

    {complaint.status === "resolved" && (

      <div className="flex gap-4">

        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          ✅
        </div>

        <div>

          <p className="font-semibold">
            Complaint Resolved
          </p>

          <p className="text-gray-500 text-sm">
            Issue has been marked as resolved
          </p>

        </div>

      </div>

    )}

  </div>

</div>

      </div>

    </Layout>

  );

}

export default ComplaintDetails;

