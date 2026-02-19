export default function GameModeToggle({ mode, onChange }) {
  return (
    <div className="flex gap-2">
      {["1v1", "2v2"].map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`flex-1 py-3 rounded-xl text-lg font-semibold
            ${mode === m ? "bg-blue-600" : "bg-slate-700"}`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
