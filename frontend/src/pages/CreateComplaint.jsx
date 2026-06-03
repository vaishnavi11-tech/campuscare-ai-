import { useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

function CreateComplaint() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [aiResult, setAiResult] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await API.post(
        "/complaints/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAiResult(response.data.complaint.aiResult);

      setFormData({
        title: "",
        description: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed to create complaint");

    } finally {

      setLoading(false);

    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Raise Complaint
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Complaint Title
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
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              placeholder="Describe the issue in detail"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 rounded-lg h-40"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            {
              loading
                ? "Analyzing & Submitting..."
                : "Submit Complaint"
            }
          </button>

        </form>

        {aiResult && (

          <div className="mt-8 border-t pt-6">

            <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
              Complaint submitted successfully
            </div>

            <h2 className="text-2xl font-bold mb-4">
              AI Analysis
            </h2>

            <p className="mb-2">
              <strong>Category:</strong>{" "}
              {aiResult.category}
            </p>

            <p className="mb-2">
              <strong>Priority:</strong>{" "}
              {aiResult.priority}
            </p>

          </div>

        )}

      </div>

    </div>
    </Layout>
  );
}

export default CreateComplaint;