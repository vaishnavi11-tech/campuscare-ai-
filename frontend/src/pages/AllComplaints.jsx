import { useEffect, useState } from "react";
import API from "../api/api";
import StatusBadge from "../components/StatusBadge";
import { Link } from "react-router-dom";

function AllComplaints() {

  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchComplaints();
    fetchStaff();
  }, []);

  const fetchComplaints = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/complaints/all",
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

  const fetchStaff = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/users/staff",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStaffList(response.data.staff);

    } catch (error) {

      console.log(error);

    }
  };

  const assignComplaint = async (
    complaintId,
    staffId
  ) => {

    if (!staffId) return;

    try {

      const token = localStorage.getItem("token");

      await API.patch(
        `/complaints/assign/${complaintId}`,
        {
          assignedTo: staffId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint Assigned");

      fetchComplaints();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        All Complaints
      </h1>

      <table className="w-full border">

        <thead>

          <tr className="bg-gray-200">

            <th className="border p-3">
              Title
            </th>

            <th className="border p-3">
              Category
            </th>

            <th className="border p-3">
              Priority
            </th>

            <th className="border p-3">
              Student
            </th>

            <th className="border p-3">
              Status
            </th>

            <th className="border p-3">
              Assigned Staff
            </th>

            <th className="border p-3">
              Action
            </th>

            <th className="border p-3">
              Details
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
                {complaint.aiResult?.category || "N/A"}
              </td>

              <td className="border p-3">
                {complaint.aiResult?.priority || "N/A"}
              </td>

              <td className="border p-3">
                {complaint.student?.name}
              </td>

              <td className="border p-3">
                <StatusBadge
                  status={complaint.status}
                />
              </td>

              <td className="border p-3">
                {complaint.assignedTo?.name ||
                  "Not Assigned"}
              </td>

              <td className="border p-3">

                <select
                  onChange={(e) =>
                    assignComplaint(
                      complaint._id,
                      e.target.value
                    )
                  }
                  className="border p-2"
                >

                  <option value="">
                    Select Staff
                  </option>

                  {staffList.map((staff) => (

                    <option
                      key={staff._id}
                      value={staff._id}
                    >
                      {staff.name}
                    </option>

                  ))}

                </select>

              </td>

              <td className="border p-3">

                <Link
                  to={`/complaints/${complaint._id}`}
                  className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                  View Details
                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AllComplaints;