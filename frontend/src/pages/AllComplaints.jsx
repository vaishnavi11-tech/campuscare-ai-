import { useEffect, useState } from "react";
import API from "../api/api";
import StatusBadge from "../components/StatusBadge";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function AllComplaints() {
const [recommendations, setRecommendations] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchComplaints();
  }, [search, status, category, page]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchComplaints = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        `/complaints/all?page=${page}&search=${search}&status=${status}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(response.data.complaints);
      setTotalPages(response.data.totalPages);
const recommendationMap = {};

for (
  const complaint
  of response.data.complaints
) {

  if (
    complaint.aiResult?.category
  ) {

   const recommended =
  await fetchRecommendation(
    complaint._id
  );

    recommendationMap[
      complaint._id
    ] = recommended;

  }

}
console.log(recommendationMap);
setRecommendations(
  recommendationMap
);
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
const fetchRecommendation = async (
  complaintId
) => {
  try {

    const token =
      localStorage.getItem("token");

    const response =
      await API.get(
       `/complaints/recommend-staff/${complaintId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
console.log(response.data);
   return {
  ...response.data.recommended,
  reason: response.data.reason,
  mode: response.data.mode,
};

  } catch (error) {

    console.log(error);

    return null;

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
<Layout>
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Complaint Management
        </h1>

        <p className="text-gray-600 mt-2">
          Search, assign staff and monitor complaint resolution.
        </p>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <div className="flex flex-wrap gap-4">

          <input
            type="text"
            placeholder="Search complaint..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border p-3 rounded-lg"
          >

            <option value="">
              All Status
            </option>

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

          <input
            type="text"
            placeholder="Category..."
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

        </div>

      </div>

      {/* Complaint Cards */}
<div className="grid grid-cols-1 gap-6">

        {complaints.map((complaint) => (

          <div
            key={complaint._id}
            className="bg-white rounded-xl shadow-md p-6"
          >

            <div className="flex justify-between items-start mb-4">

             <div className="flex items-center gap-3">

  <h2 className="text-xl font-semibold">
    {complaint.title}
  </h2>

  {complaint.escalated && (

    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
      🚨 Escalated
    </span>

  )}

</div>
              <StatusBadge
                status={complaint.status}
              />

            </div>

            <div className="space-y-3">

              <p>
                <span className="font-semibold">
                  Student:
                </span>{" "}
                {complaint.student?.name}
              </p>

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
                  Assigned Staff:
                </span>{" "}
                {complaint.assignedTo?.name ||
                  "Not Assigned"}
              </p>

            </div>

            <div className="mt-5 flex flex-col gap-3">
{!complaint.assignedTo &&
 recommendations[complaint._id] && (

  <div className="bg-green-50 border border-green-200 rounded-lg p-3">

    <p className="font-semibold text-green-700">
      ⭐ Recommended Staff
    </p>

    <p className="font-medium">

      {recommendations[
        complaint._id
      ]?.faculty?.name ||

       recommendations[
        complaint._id
      ]?.name}

    </p>

    {recommendations[
      complaint._id
    ]?.reason && (

      <p className="text-sm text-blue-600 mt-1">

        {
          recommendations[
            complaint._id
          ].reason
        }

      </p>

    )}

    {recommendations[
      complaint._id
    ]?.workload !==
      undefined && (

      <p className="text-sm text-gray-500">

        Workload: {
          recommendations[
            complaint._id
          ].workload
        }

      </p>

    )}

  </div>

)}
              <select
  disabled={complaint.assignedTo}
  onChange={(e) =>
    assignComplaint(
      complaint._id,
      e.target.value
    )
  }
  className={`border p-3 rounded ${
    complaint.assignedTo
      ? "bg-gray-100 cursor-not-allowed"
      : ""
  }`}
>

              <option value="">
  {complaint.assignedTo
    ? "Assignment Locked"
    : "Select Staff"}
</option>

              {staffList
  .filter(
    (staff) =>
      staff.expertise ===
      complaint.aiResult?.category
  )
  .map((staff) => (

    <option
      key={staff._id}
      value={staff._id}
    >
      {staff.name}
    </option>

))}

              </select>

              <Link
                to={`/complaints/${complaint._id}`}
                className="bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
              >
                View Details
              </Link>

            </div>

          </div>

        ))}

      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-4 mt-10">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>

      </div>

    </div>
    </Layout>
  );
}

export default AllComplaints;