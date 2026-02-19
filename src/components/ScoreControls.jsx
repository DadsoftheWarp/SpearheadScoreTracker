export default function ScoreControls({ onChange }) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onChange(-1)}
        className="w-16 h-16 rounded-full bg-red-600 text-3xl"
      >
        −
      </button>
      <button
        onClick={() => onChange(1)}
        className="w-16 h-16 rounded-full bg-green-600 text-3xl"
      >
        +
      </button>
    </div>
  );
}
