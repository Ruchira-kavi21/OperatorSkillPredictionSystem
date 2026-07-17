import { useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import PredictionForm from "../components/prediction/PredictionForm";
import PredictionResult from "../components/prediction/PredictionResult";

function Predict() {
  const [result, setResult] = useState(null);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Operator Skill Prediction</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <PredictionForm onPrediction={setResult} />

        <PredictionResult result={result} />
      </div>
    </DashboardLayout>
  );
}

export default Predict;
