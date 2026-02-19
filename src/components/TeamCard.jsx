import RoundScore from "./RoundScore";


export default function TeamCard({
  team,
  teamKey,
  factionsList,
  activeRound,
  onScoreChange,
  onTeamUpdate,
  onFactionChange,
})
 {
  const totalScore = team.rounds.reduce(
    (sum, r) => sum + r.victory + r.tactics + r.twist,
    0
  );

  return (
    <div className="bg-slate-800 rounded-2xl p-4">
      
      {/* Editable Team Name */}
      <input
        type="text"
        value={team.name}
        onChange={(e) =>
          onTeamUpdate(teamKey, "name", e.target.value)
        }
        className="w-full mb-2 p-2 rounded bg-slate-700 text-white text-lg font-bold text-center"
      />

      {/* Selected Faction Icons */}
        <div className="mb-2 w-14 h-14 object-contain bg-slate-700 p-2 rounded-xl shadow-md justify-self-center">
        {team.factions.map((selectedFaction, index) => {
            if (!selectedFaction) return null;

            const factionData = factionsList.find(
            (f) => f.name === selectedFaction
            );

            if (!factionData) return null;

            return (
            <img
                key={index}
                src={factionData.icon}
                alt={selectedFaction}
                className="w-12 h-12 object-contain"
            />
            );
        })}
        </div>

    {/* Faction Dropdown(s) */}
    {team.factions.map((factionValue, index) => (
    <div key={index} className="mb-2">
        {team.factions.length > 1 && (
        <div className="text-sm text-slate-400 mb-1">
            Army {index + 1}
        </div>
        )}

        <select
        value={factionValue}
        onChange={(e) =>
            onFactionChange(teamKey, index, e.target.value)
        }
        className="w-full p-2 rounded bg-slate-700 text-white"
        >
        <option value="">Select Faction</option>

        {factionsList.map((faction) => {
            const isAlreadySelected =
            team.factions.includes(faction) &&
            faction.name !== factionValue;

            return (
            <option
            key={faction.name}
            value={faction.name}
            disabled={isAlreadySelected}
            >
            {faction.name}
            </option>
            );
        })}
        </select>
    </div>
    ))}


      {team.rounds.map((round, i) => (
        <RoundScore
          key={i}
          roundIndex={i}
          scores={round}
          isActive={i === activeRound}
          onChange={onScoreChange}
        />
      ))}

      <div className="mt-4 text-center">
        <div className="text-slate-400">Total</div>
        <div className="text-5xl font-extrabold">
          {totalScore}
        </div>
      </div>
    </div>
  );
}
