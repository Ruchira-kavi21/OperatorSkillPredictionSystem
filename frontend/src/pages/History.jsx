import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(data.message || "Unable to load prediction history.");

          return;
        }

        setHistory(data.history);
      } catch (error) {
        console.error(error);

        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
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

  const filteredHistory = history
    .filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.style.toLowerCase().includes(searchValue) ||
        item.operation.toLowerCase().includes(searchValue);

      const matchesSkill =
        skillFilter === "ALL" || item.prediction === skillFilter;

      return matchesSearch && matchesSkill;
    })
    .sort((a, b) => {
      const dateA = new Date(a.prediction_time.replace(" ", "T"));

      const dateB = new Date(b.prediction_time.replace(" ", "T"));

      if (sortOrder === "NEWEST") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Prediction History
        </h1>

        <p className="text-slate-500 mt-2">
          View previous operator skill predictions.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search style or operation..."
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Skill Levels</option>

            <option value="A+">Skill A+</option>

            <option value="A">Skill A</option>

            <option value="B">Skill B</option>

            <option value="C">Skill C</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="NEWEST">Newest First</option>

            <option value="OLDEST">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading && (
          <div className="p-10 text-center text-slate-500">
            Loading prediction history...
          </div>
        )}

        {error && <div className="p-10 text-center text-red-600">{error}</div>}

        {!loading && !error && filteredHistory.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            No prediction records found.
          </div>
        )}

        {!loading && !error && filteredHistory.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Date
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Style
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Operation
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Line
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Efficiency
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Skill Level
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Confidence
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-5 text-sm text-slate-600 whitespace-nowrap">
                      {item.prediction_time}
                    </td>

                    <td className="px-6 py-5 font-medium text-slate-800 whitespace-nowrap">
                      {item.style}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600 min-w-62.5">
                      {item.operation}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {item.line_number}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {item.efficiency}%
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${getSkillStyle(
                          item.prediction,
                        )}`}
                      >
                        {item.prediction}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-semibold text-slate-800">
                        {item.confidence}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default History;
