import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        {/* subtle decorative blobs, same palette, no new colors */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            For Educational Institutions
          </span>

          <h1 className="text-6xl font-bold mb-6 tracking-tight">CampusCare</h1>

          <p className="text-2xl mb-4 font-medium">
            AI-Powered Complaint Management System
          </p>

          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Streamline complaint resolution with AI-powered categorization,
            smart assignment, transparent tracking and efficient grievance
            management for educational institutions.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-500 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-600 hover:scale-105 transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 -mt-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all">
            <h2 className="text-4xl font-bold text-blue-600">AI</h2>
            <p className="mt-3 text-gray-600 font-medium">
              Automated Complaint Analysis
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all">
            <h2 className="text-4xl font-bold text-green-600">24/7</h2>
            <p className="mt-3 text-gray-600 font-medium">Complaint Tracking</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all">
            <h2 className="text-4xl font-bold text-indigo-600">100%</h2>
            <p className="mt-3 text-gray-600 font-medium">Transparent Workflow</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Why CampusCare?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Everything you need to manage campus grievances, in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-3xl mb-4">
              🤖
            </div>
            <h3 className="font-semibold text-xl mb-3">AI Analysis</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Automatically categorizes complaints and determines priority.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-3xl mb-4">
              📊
            </div>
            <h3 className="font-semibold text-xl mb-3">Admin Dashboard</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Manage complaints, assign staff and monitor progress.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-3xl mb-4">
              🎓
            </div>
            <h3 className="font-semibold text-xl mb-3">Student Portal</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Submit complaints and track their status in real time.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-3xl mb-4">
              🛠
            </div>
            <h3 className="font-semibold text-xl mb-3">Staff Resolution</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Assigned staff can efficiently manage and resolve issues.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-white py-20 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="relative grid md:grid-cols-4 gap-8 text-center">
            {/* connecting line behind the steps, desktop only */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-green-200 mx-16" />

            <div className="relative">
              <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-3xl mb-4">
                📝
              </div>
              <h3 className="font-semibold text-lg">Submit Complaint</h3>
            </div>

            <div className="relative">
              <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-3xl mb-4">
                🤖
              </div>
              <h3 className="font-semibold text-lg">AI Analysis</h3>
            </div>

            <div className="relative">
              <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-3xl mb-4">
                👨‍💼
              </div>
              <h3 className="font-semibold text-lg">Staff Assignment</h3>
            </div>

            <div className="relative">
              <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center text-3xl mb-4">
                ✅
              </div>
              <h3 className="font-semibold text-lg">Resolution</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl p-12">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <h2 className="text-4xl font-bold mb-4 relative">
            Ready to Improve Campus Support?
          </h2>

          <p className="text-blue-100 mb-8 relative">
            Experience a smarter and more transparent complaint management process.
          </p>

          <Link
            to="/register"
            className="relative inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="text-center">
          <h3 className="text-xl font-semibold">CampusCare</h3>
          <p className="text-gray-400 mt-2">AI-Powered Complaint Management System</p>
          <p className="text-gray-500 mt-4 text-sm">Built for Educational Institutions</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
