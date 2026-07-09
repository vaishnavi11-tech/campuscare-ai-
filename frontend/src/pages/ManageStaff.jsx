import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

function ManageStaff() {
  const [staff, setStaff] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    expertise: "",
    department: "",
    hostelWing: "",
    subExpertise: [],
  });

  useEffect(() => {
    fetchStaff();
  }, []);

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

      setStaff(response.data.staff);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateStaff = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/users/staff",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        expertise: "",
        department: "",
        hostelWing: "",
        subExpertise: [],
      });
      fetchStaff();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(
        `/users/staff/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchStaff();
    } catch (error) {
      console.log(error);
    }
  };
  const SUB_EXPERTISE = {
    "Academic Affairs": [
      "Teaching Quality",
      "Attendance",
      "Examinations",
      "Results",
      "Timetable",
      "Projects & Internships",
      "Laboratory Management",
      "Certificates",
    ],

    "Hostel & Accommodation": [
      "Room Allocation",
      "Room Maintenance",
      "Mess Food",
      "Water Supply",
      "Electricity",
      "Cleanliness",
      "Hostel Security",
    ],

    "Campus Facilities": [
      "Classroom Infrastructure",
      "Furniture",
      "Electricity",
      "Cleanliness",
      "Drinking Water",
      "Sports Facilities",
      "Parking",
      "Auditorium",
    ],

    "IT Services": [
      "WiFi & Network",
      "Student Portal",
      "College Email",
      "Software Access",
      "Computer Lab",
      "Smart Classroom",
    ],
  };
  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-2">
          Staff Management
        </h1>

        <p className="text-gray-500 mb-8">
          Create and manage faculty accounts.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">
            Add Staff
          </h2>

          <form
            onSubmit={handleCreateStaff}
            className="grid md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="border p-3 rounded-lg"
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
              className="border p-3 rounded-lg"
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
              className="border p-3 rounded-lg"
              required
            />

            <select
              value={formData.expertise}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expertise: e.target.value,
                })
              }
              className="border p-3 rounded-lg"
              required
            >
              <option value="">
                Select Expertise
              </option>

              <option value="IT Services">
                IT Services
              </option>

              <option value="Academic Affairs">
                Academic Affairs
              </option>

              <option value="Hostel & Accommodation">
                Hostel & Accommodation
              </option>

              <option value="Campus Facilities">
                Campus Facilities
              </option>

              <option value="Library Services">
                Library Services
              </option>

              <option value="Administration">
                Administration
              </option>

              <option value="Safety & Security">
                Safety & Security
              </option>

              <option value="Student Welfare">
                Student Welfare
              </option>
            </select>
            {SUB_EXPERTISE[formData.expertise] && (

              <div className="md:col-span-2 border rounded-lg p-3">

                <p className="font-medium mb-2">
                  Select Sub Expertise
                </p>

                <div className="grid grid-cols-2 gap-2">

                  {SUB_EXPERTISE[
                    formData.expertise
                  ].map((item) => (

                    <label
                      key={item}
                      className="flex items-center gap-2"
                    >

                      <input
                        type="checkbox"
                        checked={formData.subExpertise.includes(
                          item
                        )}
                        onChange={(e) => {

                          if (e.target.checked) {

                            setFormData({
                              ...formData,
                              subExpertise: [
                                ...formData.subExpertise,
                                item,
                              ],
                            });

                          } else {

                            setFormData({
                              ...formData,
                              subExpertise:
                                formData.subExpertise.filter(
                                  (x) => x !== item
                                ),
                            });

                          }

                        }}
                      />

                      {item}

                    </label>

                  ))}

                </div>

              </div>

            )}
            {formData.expertise === "Academic Affairs" && (

              <select
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                  })
                }
                className="border p-3 rounded-lg"
                required
              >

                <option value="">
                  Select Department
                </option>

                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="Electrical">Electrical</option>
                <option value="Civil">Civil</option>
                <option value="Instrumentation">
                  Instrumentation
                </option>
                <option value="Mechanical">
                  Mechanical
                </option>
                <option value="Production">
                  Production
                </option>
                <option value="Textile">
                  Textile
                </option>
                <option value="Chemical">
                  Chemical
                </option>

              </select>

            )}
            {formData.expertise ===
              "Hostel & Accommodation" && (

                <select
                  value={formData.hostelWing}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hostelWing: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                  required
                >

                  <option value="">
                    Select Hostel Wing
                  </option>

                  <option value="boys">
                    Boys Hostel
                  </option>

                  <option value="girls">
                    Girls Hostel
                  </option>

                </select>

              )}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Create Staff
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {staff.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow-lg rounded-2xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">
                  {member.name}
                </h3>

                <p>{member.email}</p>

                <p className="text-sm text-gray-500">
                  Expertise: {member.expertise}
                </p>
                {member.subExpertise?.length > 0 && (
                  <p className="text-sm text-gray-500">
                    Sub Expertise:
                    {" "}
                    {member.subExpertise.join(", ")}
                  </p>
                )}
                {member.department && (
                  <p className="text-sm text-gray-500">
                    Department: {member.department}
                  </p>
                )}

                {member.hostelWing && (
                  <p className="text-sm text-gray-500">
                    Hostel Wing: {member.hostelWing}
                  </p>
                )}



              </div>

              <button
                onClick={() =>
                  handleDelete(member._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ManageStaff;