function ConfidenceBar({ value }) {
  const confidence = Number(value) || 0;

  let barColor = "bg-red-500";
  let status = "Low";

  if (confidence >= 90) {
    barColor = "bg-green-500";
    status = "Excellent";
  } else if (confidence >= 75) {
    barColor = "bg-blue-500";
    status = "Good";
  } else if (confidence >= 50) {
    barColor = "bg-yellow-500";
    status = "Moderate";
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-semibold text-slate-800">Model Confidence</h3>

          <p className="text-sm text-slate-500">Prediction reliability</p>
        </div>

        <div className="text-right">
          <h2 className="text-2xl font-bold text-slate-800">{confidence}%</h2>

          <span
            className={`text-xs px-2 py-1 rounded-full text-white ${barColor}`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-4 rounded-full transition-all duration-1000 ${barColor}`}
          style={{
            width: `${confidence}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ConfidenceBar;
