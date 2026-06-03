import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComplaintDetails from "./pages/ComplaintDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateComplaint from "./pages/CreateComplaint";
import ProtectedRoute from "./components/ProtectedRoute";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import AllComplaints from "./pages/AllComplaints";
import Register from "./pages/Register";
import FacultyDashboard from "./pages/FacultyDashboard";
import ManageStaff from "./pages/ManageStaff";
function App() {

  return (
    <BrowserRouter>

      <Routes>
      <Route
  path="/manage-staff"
  element={<ManageStaff />}
/>
      <Route
  path="/my-complaints"
  element={
    <ProtectedRoute>
      <MyComplaints />
    </ProtectedRoute>
  }
/>
<Route path="/complaints" element={<AllComplaints />} />
<Route
  path="/complaints/:id"
  element={
    <ProtectedRoute>
      <ComplaintDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/faculty-dashboard"
  element={
    <ProtectedRoute>
      <FacultyDashboard />
    </ProtectedRoute>
  }
/>
        <Route path="/" element={<Home />} />

     <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
    <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
<Route
  path="/create-complaint"
  element={
    <ProtectedRoute>
      <CreateComplaint />
    </ProtectedRoute>
  }
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;