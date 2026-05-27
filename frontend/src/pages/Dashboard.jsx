import { useNavigate, Link } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Dashboard
      </h1>

      <div className="flex gap-4">

        <Link
          to="/create-complaint"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Complaint
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;