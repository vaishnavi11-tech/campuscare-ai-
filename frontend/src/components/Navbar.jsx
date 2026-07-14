import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Read once; in a real app, lift this to context/state
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="flex items-center gap-3">
          <div className="bg-blue-600 text-white px-3 py-2 rounded-xl font-bold">
            🎓
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">CampusCare</h1>
            <p className="text-xs text-gray-500">AI Powered Complaint Management System</p>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="font-medium text-gray-600 hover:text-blue-600">
            Home
          </Link>

          {role === "student" && (
            <>
              <Link to="/dashboard" className="font-medium text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/create-complaint" className="font-medium text-gray-600 hover:text-blue-600">
                Create Complaint
              </Link>
              <Link to="/my-complaints" className="font-medium text-gray-600 hover:text-blue-600">
                My Complaints
              </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link to="/admin-dashboard" className="font-medium text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/complaints" className="font-medium text-gray-600 hover:text-blue-600">
                All Complaints
              </Link>
            </>
          )}

          {role === "faculty" && (
            <Link to="/faculty-dashboard" className="font-medium text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
          )}

          <span className="text-sm text-gray-500">Hi, {name}</span>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;