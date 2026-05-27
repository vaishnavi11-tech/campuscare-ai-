import { useState } from "react";
import API from "../api/api";

function CreateComplaint() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/complaints/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("Complaint created successfully");

      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed to create complaint");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Complaint
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter complaint title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Description
            </label>

            <textarea
              placeholder="Enter complaint description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 rounded-lg h-32"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Category
            </label>

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            >
              <option value="">
                Select Category
              </option>

              <option value="Electrical">
                Electrical
              </option>

              <option value="Plumbing">
                Plumbing
              </option>

              <option value="Internet">
                Internet
              </option>

              <option value="Cleaning">
                Cleaning
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Priority
            </label>

            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            >
              <option value="">
                Select Priority
              </option>

              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateComplaint;