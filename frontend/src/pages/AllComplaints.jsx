import { useEffect, useState } from "react";
import API from "../api/api";
import StatusBadge from "../components/StatusBadge";

function AllComplaints() {

  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await API.get("/complaints/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);

        setComplaints(response.data.complaints);

      } catch (error) {
        console.log(error);
      }
    };

    const fetchStaff = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await API.get("/users/staff", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStaffList(response.data.staff);
console.log(response.data.staff);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComplaints();
    fetchStaff();

  }, []);

  const assignComplaint = async (complaintId, staffId) => {

    try {

      const token = localStorage.getItem("token");

      await API.patch(
  `/complaints/assign/${complaintId}`,
  { assignedTo: staffId },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert("Complaint Assigned");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1>All Complaints</h1>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Student</th>
            <th>Status</th>
            <th>Assigned Staff</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {
            complaints.map((complaint) => (
              <tr key={complaint._id}>

                <td>{complaint.title}</td>

                <td>{complaint.category}</td>

                <td>
                  {complaint.user?.name}
                </td>

                <td>
                  <StatusBadge status={complaint.status} />
                </td>

                <td>
                  {complaint.assignedTo?.name || "Not Assigned"}
                </td>

                <td>

                  <select
  onChange={(e) =>
    assignComplaint(
      complaint._id,
      e.target.value
    )
  }
>

  <option value="">
    Select Staff
  </option>

  {
    staffList.map((staff) => (
      <option
        key={staff._id}
        value={staff._id}
      >
        {staff.name}
      </option>
    ))
  }

</select>

                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default AllComplaints;