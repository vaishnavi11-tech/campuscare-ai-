import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateComplaint from "./pages/CreateComplaint";
import ProtectedRoute from "./components/ProtectedRoute";
import MyComplaints from "./pages/MyComplaints";
function App() {

  return (
    <BrowserRouter>

      <Routes>
      <Route
  path="/my-complaints"
  element={
    <ProtectedRoute>
      <MyComplaints />
    </ProtectedRoute>
  }
/>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

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