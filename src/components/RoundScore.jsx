export default function RoundScore({
  roundIndex,
  scores,
  isActive,
  onChange,
}) {
  return (
    <div
      className={`rounded-xl p-3 mb-3 border transition
        ${
          isActive
            ? "border-amber-400 bg-slate-700"
            : "border-slate-700 opacity-50"
        }`}
    >
      <h3 className="text-lg font-bold mb-2">
        Round {roundIndex + 1}
      </h3>

      <ScoreRow
        label="Victory Points"
        value={scores.victory}
        disabled={!isActive}
        onIncrement={() => onChange(roundIndex, "victory", 1)}
        onDecrement={() => onChange(roundIndex, "victory", -1)}
      />

      <ScoreRow
        label="Battle Tactics"
        value={scores.tactics}
        disabled={!isActive}
        onIncrement={() => onChange(roundIndex, "tactics", 1)}
        onDecrement={() => onChange(roundIndex, "tactics", -1)}
      />

      <ScoreRow
        label="Twist"
        value={scores.twist}
        disabled={!isActive}
        onIncrement={() => onChange(roundIndex, "twist", 1)}
        onDecrement={() => onChange(roundIndex, "twist", -1)}
      />
    </div>
  );
}

function ScoreRow({
  label,
  value,
  disabled,
  onIncrement,
  onDecrement,
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-slate-300">{label}</span>

      <div className="flex items-center gap-2">
        <button
          onClick={onDecrement}
          disabled={disabled}
          className={`w-10 h-10 rounded-full text-xl
            ${
              disabled
                ? "bg-slate-600"
                : "bg-red-600 hover:bg-red-500"
            }`}
        >
          −
        </button>

        <div className="w-8 text-center text-xl font-bold">
          {value}
        </div>

        <button
          onClick={onIncrement}
          disabled={disabled}
          className={`w-10 h-10 rounded-full text-xl
            ${
              disabled
                ? "bg-slate-600"
                : "bg-green-600 hover:bg-green-500"
            }`}
        >
          +
        </button>
      </div>
    </div>
  );
}
