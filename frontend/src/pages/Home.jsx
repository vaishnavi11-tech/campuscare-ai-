import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
function Home() {

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">

        <div className="max-w-6xl mx-auto px-6 py-24 text-center">

          <h1 className="text-6xl font-bold mb-6">
            CampusCare
          </h1>

          <p className="text-2xl mb-4">
            AI-Powered Complaint Management System
          </p>

          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-10">
            Streamline complaint resolution with AI-powered categorization,
            smart assignment, transparent tracking and efficient grievance
            management for educational institutions.
          </p>

          <div className="flex justify-center gap-4">

            <Link
              to="/login"
              className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-500 px-8 py-3 rounded-xl font-semibold shadow hover:bg-green-600 transition"
            >
              Register
            </Link>

          </div>

        </div>

      </section>

      {/* Stats Section */}

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <h2 className="text-4xl font-bold text-blue-600">
              AI
            </h2>

            <p className="mt-3 text-gray-600">
              Automated Complaint Analysis
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <h2 className="text-4xl font-bold text-green-600">
              24/7
            </h2>

            <p className="mt-3 text-gray-600">
              Complaint Tracking
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <h2 className="text-4xl font-bold text-indigo-600">
              100%
            </h2>

            <p className="mt-3 text-gray-600">
              Transparent Workflow
            </p>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-6xl mx-auto px-6 py-12">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why CampusCare?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="text-4xl mb-4">
              🤖
            </div>

            <h3 className="font-semibold text-xl mb-3">
              AI Analysis
            </h3>

            <p className="text-gray-600">
              Automatically categorizes complaints and determines priority.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="text-4xl mb-4">
              📊
            </div>

            <h3 className="font-semibold text-xl mb-3">
              Admin Dashboard
            </h3>

            <p className="text-gray-600">
              Manage complaints, assign staff and monitor progress.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="text-4xl mb-4">
              🎓
            </div>

            <h3 className="font-semibold text-xl mb-3">
              Student Portal
            </h3>

            <p className="text-gray-600">
              Submit complaints and track their status in real time.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="text-4xl mb-4">
              🛠
            </div>

            <h3 className="font-semibold text-xl mb-3">
              Staff Resolution
            </h3>

            <p className="text-gray-600">
              Assigned staff can efficiently manage and resolve issues.
            </p>

          </div>

        </div>

      </section>

      {/* Workflow */}

      <section className="bg-white py-20 mt-10">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>

              <div className="text-5xl mb-4">
                📝
              </div>

              <h3 className="font-semibold text-lg">
                Submit Complaint
              </h3>

            </div>

            <div>

              <div className="text-5xl mb-4">
                🤖
              </div>

              <h3 className="font-semibold text-lg">
                AI Analysis
              </h3>

            </div>

            <div>

              <div className="text-5xl mb-4">
                👨‍💼
              </div>

              <h3 className="font-semibold text-lg">
                Staff Assignment
              </h3>

            </div>

            <div>

              <div className="text-5xl mb-4">
                ✅
              </div>

              <h3 className="font-semibold text-lg">
                Resolution
              </h3>

            </div>

          </div>

        </div>

      </section>

      {/* CTA Section */}

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">

        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl p-12">

          <h2 className="text-4xl font-bold mb-4">
            Ready to Improve Campus Support?
          </h2>

          <p className="text-blue-100 mb-8">
            Experience a smarter and more transparent complaint management process.
          </p>

          <Link
            to="/register"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold"
          >
            Get Started
          </Link>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-gray-900 text-white py-10">

        <div className="text-center">

          <h3 className="text-xl font-semibold">
            CampusCare
          </h3>

          <p className="text-gray-400 mt-2">
            AI-Powered Complaint Management System
          </p>

          <p className="text-gray-500 mt-4 text-sm">
            Built for Educational Institutions
          </p>

        </div>

      </footer>

    </div>

  );
}

export default Home;