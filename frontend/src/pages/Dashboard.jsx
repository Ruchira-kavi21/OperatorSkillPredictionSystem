import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { FaBrain, FaCheckCircle, FaChartLine } from "react-icons/fa";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/dashboard-stats", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(data.message || "Unable to load dashboard data.");

          return;
        }

        setDashboardData(data);
      } catch (error) {
        console.error(error);

        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const getSkillStyle = (skill) => {
    if (skill === "A+") {
      return "bg-purple-100 text-purple-700";
    }

    if (skill === "A") {
      return "bg-green-100 text-green-700";
    }

    if (skill === "B") {
      return "bg-blue-100 text-blue-700";
    }

    if (skill === "C") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-slate-100 text-slate-700";
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-slate-500">Loading dashboard...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-600">{error}</div>
      </DashboardLayout>
    );
  }

  const { stats, recent_predictions } = dashboardData;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="text-slate-500 mt-2">
          Operator skill prediction system overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Total Predictions</p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {stats.total_predictions}
              </h2>
            </div>

            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
              <FaBrain className="text-indigo-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Average Confidence</p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {stats.average_confidence}%
              </h2>
            </div>

            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Average Efficiency</p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {stats.average_efficiency}%
              </h2>
            </div>

            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Skill Distribution
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {["A+", "A", "B", "C"].map((skill) => (
              <div
                key={skill}
                className="border border-slate-200 rounded-xl p-5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-full font-bold ${getSkillStyle(
                      skill,
                    )}`}
                  >
                    {skill}
                  </span>

                  <span className="text-2xl font-bold text-slate-900">
                    {stats.skill_distribution[skill]}
                  </span>
                </div>

                <p className="text-slate-500 text-sm mt-4">Predictions</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Recent Predictions
            </h2>
          </div>

          {recent_predictions.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No recent predictions found.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recent_predictions.map((item) => (
                <div
                  key={item.id}
                  className="p-5 flex items-center justify-between hover:bg-slate-50 transition"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.style}</p>

                    <p className="text-sm text-slate-500 mt-1">
                      {item.operation}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {item.prediction_time}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <span className="font-semibold text-slate-700">
                      {item.confidence}%
                    </span>

                    <span
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-full font-bold ${getSkillStyle(
                        item.prediction,
                      )}`}
                    >
                      {item.prediction}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
