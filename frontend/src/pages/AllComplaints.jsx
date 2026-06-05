import { useEffect, useState, useCallback } from "react";
import API from "../api/api";
import StatusBadge from "../components/StatusBadge";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

// Shared helper — avoids repeating token logic everywhere
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

function AllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [assignMessage, setAssignMessage] = useState("");

  const fetchRecommendation = async (complaintId) => {
    try {
      const res = await API.get(
        `/complaints/recommend-staff/${complaintId}`,
        authHeader()
      );
      return {
        ...res.data.recommended,
        reason: res.data.reason,
        mode: res.data.mode,
      };
    } catch {
      return null;
    }
  };

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/complaints/all?page=${page}&search=${search}&status=${status}&category=${category}`,
        authHeader()
      );
      setComplaints(res.data.complaints);
      setTotalPages(res.data.totalPages);

      // Fetch all recommendations in parallel instead of sequentially
      const entries = await Promise.all(
        res.data.complaints
          .filter((c) => c.aiResult?.category)
          .map(async (c) => {
            const rec = await fetchRecommendation(c._id);
            return [c._id, rec];
          })
      );
      setRecommendations(Object.fromEntries(entries));
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
    } finally {
      setLoading(false);
    }
  }, [search, status, category, page]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await API.get("/users/staff", authHeader());
        setStaffList(res.data.staff);
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      }
    };
    fetchStaff();
  }, []);

  const assignComplaint = async (complaintId, staffId) => {
    if (!staffId) return;
    try {
      await API.patch(
        `/complaints/assign/${complaintId}`,
        { assignedTo: staffId },
        authHeader()
      );
      setAssignMessage("Complaint assigned successfully.");
      setTimeout(() => setAssignMessage(""), 3000);
      fetchComplaints();
    } catch (error) {
      console.error("Failed to assign complaint:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Complaint Management</h1>
          <p className="text-gray-600 mt-2">
            Search, assign staff and monitor complaint resolution.
          </p>
        </div>

        {assignMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6">
            {assignMessage}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search complaint..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-3 rounded-lg"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-3 rounded-lg"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <input
              type="text"
              placeholder="Category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 rounded-lg"
            />
          </div>
        </div>

        {/* Complaint Cards */}
        {loading ? (
          <p className="text-gray-500 text-center py-10">Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No complaints found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {complaints.map((complaint) => {
              const rec = recommendations[complaint._id];
              return (
                <div key={complaint._id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold">{complaint.title}</h2>
                      {complaint.escalated && (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                          🚨 Escalated
                        </span>
                      )}
                    </div>
                    <StatusBadge status={complaint.status} />
                  </div>

                  <div className="space-y-3">
                    <p><span className="font-semibold">Student:</span> {complaint.student?.name}</p>
                    <p><span className="font-semibold">Category:</span> {complaint.aiResult?.category || "N/A"}</p>
                    <p className="mt-2">
  <span className="font-semibold">
    Sub Category:
  </span>{" "}
  {complaint.aiResult?.subCategory || "N/A"}
</p>
                    <p><span className="font-semibold">Priority:</span> {complaint.aiResult?.priority || "N/A"}</p>
                    <p><span className="font-semibold">Assigned Staff:</span> {complaint.assignedTo?.name || "Not Assigned"}</p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    {!complaint.assignedTo && rec && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="font-semibold text-green-700">⭐ Recommended Staff</p>
                        <p className="font-medium">{rec.faculty?.name || rec.name}</p>
                        {rec.reason && (
                          <p className="text-sm text-blue-600 mt-1">{rec.reason}</p>
                        )}
                        {rec.workload !== undefined && (
                          <p className="text-sm text-gray-500">Workload: {rec.workload}</p>
                        )}
                      </div>
                    )}

                    <select
                      disabled={!!complaint.assignedTo}
                      onChange={(e) => assignComplaint(complaint._id, e.target.value)}
                      className={`border p-3 rounded ${complaint.assignedTo ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    >
                      <option value="">
                        {complaint.assignedTo ? "Assignment Locked" : "Select Staff"}
                      </option>
                      {staffList
                        .filter((s) => s.expertise === complaint.aiResult?.category)
                        .map((staff) => (
                          <option key={staff._id} value={staff._id}>
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
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default AllComplaints;