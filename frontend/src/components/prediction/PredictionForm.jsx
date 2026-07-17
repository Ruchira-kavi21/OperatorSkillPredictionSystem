import { useEffect, useState } from "react";
import Select from "react-select";
import {
  FaIndustry,
  FaCog,
  FaHashtag,
  FaRulerCombined,
  FaArrowUp,
  FaBullseye,
  FaChartLine,
} from "react-icons/fa";

function PredictionForm({ onPrediction }) {
  const [metadata, setMetadata] = useState({
    styles: [],
    operations: [],
  });

  const [formData, setFormData] = useState({
    style: "",
    line_number: "",
    operation: "",
    smv: "",
    actual_output: "",
    target_output: "",
    efficiency: "",
  });

  useEffect(() => {
    //console.log(data);

    fetch("http://127.0.0.1:5000/metadata")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setMetadata({
          styles: data.styles.map((item) => ({
            value: item,
            label: item,
          })),
          operations: data.operations.map((item) => ({
            value: item,
            label: item,
          })),
        });
      });
  }, []);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({
        style: formData.style,
        line_number: Number(formData.line_number),
        operation: formData.operation,
        smv: Number(formData.smv),
        actual_output: Number(formData.actual_output),
        target_output: Number(formData.target_output),
        efficiency: Number(formData.efficiency),
      }),
    });

    const result = await response.json();

    onPrediction(result);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Production Details
      </h2>

      <p className="text-slate-500 mb-8">
        Enter production information to predict the operator's skill level.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-medium mb-2 flex items-center gap-2">
            <FaIndustry className="text-indigo-600" />
            Style
          </label>

          <Select
            options={metadata.styles}
            placeholder="Select Style"
            onChange={(selected) =>
              setFormData({
                ...formData,
                style: selected.value,
              })
            }
          />
        </div>

        <div>
          <label className="font-medium mb-2 flex items-center gap-2">
            <FaCog className="text-indigo-600" />
            Operation
          </label>

          <Select
            options={metadata.operations}
            placeholder="Search Operation..."
            onChange={(selected) =>
              setFormData({
                ...formData,
                operation: selected.value,
              })
            }
          />
        </div>

        <div>
          <label className="font-medium mb-2 flex items-center gap-2">
            <FaHashtag className="text-indigo-600" />
            Line Number
          </label>

          <input
            type="number"
            name="line_number"
            value={formData.line_number}
            onChange={handleInput}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="font-medium mb-2 flex items-center gap-2">
            <FaRulerCombined className="text-indigo-600" />
            SMV
          </label>

          <input
            type="number"
            step="0.01"
            name="smv"
            value={formData.smv}
            onChange={handleInput}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="font-medium mb-2 flex items-center gap-2">
            <FaArrowUp className="text-indigo-600" />
            Actual Output
          </label>

          <input
            type="number"
            name="actual_output"
            value={formData.actual_output}
            onChange={handleInput}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="font-medium mb-2 flex items-center gap-2">
            <FaBullseye className="text-indigo-600" />
            Target Output
          </label>

          <input
            type="number"
            name="target_output"
            value={formData.target_output}
            onChange={handleInput}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="font-medium mb-2 flex items-center gap-2">
            <FaChartLine className="text-indigo-600" />
            Efficiency (%)
          </label>

          <input
            type="number"
            step="0.01"
            name="efficiency"
            value={formData.efficiency}
            onChange={handleInput}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          Predict Skill
        </button>
      </form>
    </div>
  );
}

export default PredictionForm;
