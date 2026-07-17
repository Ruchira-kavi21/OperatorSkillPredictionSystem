import { FaLightbulb } from "react-icons/fa";

function ShapExplanation({ explanation }) {
  if (!explanation || explanation.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-5">
        <FaLightbulb className="text-yellow-500 text-xl" />

        <h3 className="text-xl font-bold">AI Explanation</h3>
      </div>

      <div className="space-y-4">
        {explanation.map((item, index) => (
          <div
            key={index}
            className="bg-slate-50 border border-slate-200 rounded-xl p-4"
          >
            <h4 className="font-semibold text-slate-800">{item.feature}</h4>

            <p className="text-slate-600 mt-2">
              This factor <strong>{item.direction}</strong> the predicted skill
              level and had a significant influence on the AI model's decision.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShapExplanation;
