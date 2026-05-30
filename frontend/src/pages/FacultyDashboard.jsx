import { useEffect, useState } from "react";
import API from "../api/api";

function FacultyDashboard() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
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
  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Faculty Dashboard
      </h1>

      <table className="w-full border">

        <thead>

          <tr className="bg-gray-200">

            <th className="border p-3">
              Title
            </th>

            <th className="border p-3">
              Student
            </th>

            <th className="border p-3">
              Category
            </th>

            <th className="border p-3">
              Priority
            </th>

            <th className="border p-3">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {complaints.map((complaint) => (

            <tr key={complaint._id}>

              <td className="border p-3">
                {complaint.title}
              </td>

              <td className="border p-3">
                {complaint.student?.name}
              </td>

              <td className="border p-3">
                {complaint.aiResult?.category || "N/A"}
              </td>

              <td className="border p-3">
                {complaint.aiResult?.priority || "N/A"}
              </td>

             <td className="border p-3">

  <select
    value={complaint.status}
    onChange={(e) =>
      updateStatus(
        complaint._id,
        e.target.value
      )
    }
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

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default FacultyDashboard;