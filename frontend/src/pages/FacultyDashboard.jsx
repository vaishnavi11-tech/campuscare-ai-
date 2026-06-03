import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

function FacultyDashboard() {

  const [complaints, setComplaints] = useState([]);
const [notes, setNotes] = useState({});
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/complaints/assigned",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(response.data.complaints);

    } catch (error) {

      console.log(error);

    }
  };

  const updateStatus = async (
    complaintId,
    status
  ) => {

    try {

      const token = localStorage.getItem("token");

      await API.patch(
        `/complaints/${complaintId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComplaints();

    } catch (error) {

      console.log(error);

    }
  };

  const addNote = async (
  complaintId
) => {

  try {

    const token =
      localStorage.getItem("token");

    await API.post(
      `/complaints/${complaintId}/note`,
      {
        text: notes[complaintId],
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    alert("Note Added");

    setNotes({
      ...notes,
      [complaintId]: "",
    });

    fetchComplaints();

  } catch (error) {

    console.log(error);

  }

};
  return (
<Layout> 
<div className="min-h-screen bg-gray-100 p-10">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Faculty Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Manage assigned complaints and update their status.
        </p>

      </div>

      <div className="flex flex-col gap-6">

        {complaints.map((complaint) => (

          <div
            key={complaint._id}
            className="bg-white rounded-xl shadow p-6"
          >

            <div className="flex justify-between items-start mb-4">

             <div className="flex items-center gap-3">

  <h2 className="text-2xl font-semibold">
    {complaint.title}
  </h2>

  {complaint.escalated && (

    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
      🚨 Escalated
    </span>

  )}

</div>
              <select
                value={complaint.status}
                onChange={(e) =>
                  updateStatus(
                    complaint._id,
                    e.target.value
                  )
                }
                className="border p-2 rounded"
              >

                <option value="pending">
                  Pending
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="resolved">
                  Resolved
                </option>

              </select>
              <div className="mt-4">

  <textarea
    placeholder="Add progress note..."
    value={
      notes[complaint._id] || ""
    }
    onChange={(e) =>
      setNotes({
        ...notes,
        [complaint._id]:
          e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
    rows="3"
  />

  <button
    onClick={() =>
      addNote(
        complaint._id
      )
    }
    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
  >
    Add Note
  </button>

</div>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>

                <p>
                  <span className="font-semibold">
                    Student:
                  </span>{" "}
                  {complaint.student?.name}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">
                    Category:
                  </span>{" "}
                  {complaint.aiResult?.category || "N/A"}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">
                    Priority:
                  </span>{" "}
                  {complaint.aiResult?.priority || "N/A"}
                </p>

              </div>

              <div>

                <p className="font-semibold mb-2">
                  Suggested Resolution
                </p>

                <div className="bg-gray-100 rounded p-3">

                  {complaint.aiResult?.suggestedResolution ||
                    "No AI suggestion available"}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  </Layout> 
  );
}

 
export default FacultyDashboard;