import { FaBrain } from "react-icons/fa";
import ConfidenceBar from "./ConfidenceBar";
import ShapExplanation from "./ShapExplanation";

function PredictionResult({ result }) {
  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col items-center justify-center min-h-[760px]">
        <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center">
          <FaBrain className="text-5xl text-indigo-600" />
        </div>

        <h2 className="text-2xl font-bold text-slate-700 mt-8">
          Prediction Result
        </h2>

        <p className="text-slate-500 mt-3 text-center max-w-sm">
          Enter the production details and click
          <strong> Predict Skill </strong>
          to generate a prediction.
        </p>
      </div>
    );
  }

  const skillColor = {
    "A+": "bg-green-600",
    A: "bg-green-500",
    B: "bg-yellow-500",
    C: "bg-red-500",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-800">Prediction Result</h2>

      <p className="text-slate-500 mt-1">
        Machine learning prediction with Explainable AI
      </p>

      {/* Skill Circle */}

      <div className="flex justify-center mt-10">
        <div
          className={`w-40 h-40 rounded-full ${skillColor[result.prediction]} flex items-center justify-center shadow-lg`}
        >
          <span className="text-6xl text-white font-bold">
            {result.prediction}
          </span>
        </div>
      </div>

      <h3 className="text-center text-xl font-semibold mt-6">
        Predicted Skill Level
      </h3>

      {/* Confidence */}

      <div className="mt-10">
        <ConfidenceBar value={result.confidence} />
      </div>

      {/* SHAP */}

      <div className="mt-10">
        <ShapExplanation explanation={result.explanation} />
      </div>
    </div>
  );
}

export default PredictionResult;
