import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <FaLock className="text-red-600 text-4xl" />
        </div>

        <h1 className="text-3xl font-bold mt-8">Access Denied</h1>

        <p className="text-slate-500 mt-4">
          You don't have permission to access this page.
        </p>

        <Link
          to="/predict"
          className="inline-block mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
