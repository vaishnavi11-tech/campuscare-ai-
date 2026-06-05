import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  department: "",
  gender: "",
  year: "",
  studentId: "",
});
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await API.post("/auth/register", formData);

      alert("Registration successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          CampusCare Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
  value={formData.department}
  onChange={(e) =>
    setFormData({
      ...formData,
      department: e.target.value,
    })
  }
  className="w-full border p-3 rounded-lg"
  required
>
  <option value="">
    Select Department
  </option>

  <option value="CSE">
    Computer Science Engineering (CSE)
  </option>

  <option value="IT">
    Information Technology (IT)
  </option>

  <option value="ECE">
    Electronics & Communication Engineering (ECE)
  </option>

  <option value="EE">
    Electrical Engineering (EE)
  </option>

  <option value="CE">
    Civil Engineering (CE)
  </option>

  <option value="INSTRU">
    Instrumentation Engineering
  </option>

  <option value="ME">
    Mechanical Engineering (ME)
  </option>

  <option value="PROD">
    Production Engineering
  </option>

  <option value="TEXTILE">
    Textile Engineering
  </option>

  <option value="CHEMICAL">
    Chemical Engineering
  </option>

</select>
          <select
  value={formData.gender}
  onChange={(e) =>
    setFormData({
      ...formData,
      gender: e.target.value,
    })
  }
  className="w-full border p-3 rounded-lg"
  required
>
  <option value="">
    Select Gender
  </option>

  <option value="male">
    Male
  </option>

  <option value="female">
    Female
  </option>
</select>
<select
  value={formData.year}
  onChange={(e) =>
    setFormData({
      ...formData,
      year: e.target.value,
    })
  }
  className="w-full border p-3 rounded-lg"
  required
>
  <option value="">
    Select Year
  </option>

  <option value="1">1st Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
  <option value="4">4th Year</option>
</select>

          <input
            type="text"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={(e) =>
              setFormData({
                ...formData,
                studentId: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Register;