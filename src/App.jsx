import { useState } from "react";
import Header from "./components/Header";
import GameModeToggle from "./components/GameModeToggle";
import TeamCard from "./components/TeamCard";
import stormcastIcon from "./assets/factions/stormcasteternals.jpg";

const TOTAL_ROUNDS = 4;

const emptyRounds = () =>
  Array.from({ length: 4 }, () => ({
    victory: 0,
    tactics: 0,
    twist: 0,
  }));

export default function App() {
  const [activeRound, setActiveRound] = useState(0); // 0-based index

const SPEARHEAD_FACTIONS = [
  {
    name: "Stormcast Eternals - Vigilant Brotherhood",
    icon: stormcastIcon,
  },
];


  const [mode, setMode] = useState("1v1");

  const [teams, setTeams] = useState({
    teamA: {
      name: "Team A",
      factions: [""],
      players: ["Player A"],
      rounds: emptyRounds(),
    },
    teamB: {
      name: "Team B",
      factions: [""],
      players: ["Player B"],
      rounds: emptyRounds(),
    },
  });

function handleModeChange(newMode) {
  setMode(newMode);

  const is2v2 = newMode === "2v2";

  setTeams({
    teamA: {
      name: "Team A",
      factions: is2v2 ? ["", ""] : [""],
      players: is2v2
        ? ["Player A1", "Player A2"]
        : ["Player A"],
      rounds: emptyRounds(),
    },
    teamB: {
      name: "Team B",
      factions: is2v2 ? ["", ""] : [""],
      players: is2v2
        ? ["Player B1", "Player B2"]
        : ["Player B"],
      rounds: emptyRounds(),
    },
  });
}

function updateFaction(teamKey, index, value) {
  setTeams((prev) => {
    const updatedFactions = [...prev[teamKey].factions];
    updatedFactions[index] = value;

    return {
      ...prev,
      [teamKey]: {
        ...prev[teamKey],
        factions: updatedFactions,
      },
    };
  });
}

function updateScore(teamKey, roundIndex, type, delta) {
  setTeams((prev) => {
    const updatedRounds = prev[teamKey].rounds.map((round, i) => {
      if (i !== roundIndex) return round;

      return {
        ...round,
        [type]: Math.max(0, round[type] + delta),
      };
    });

    return {
      ...prev,
      [teamKey]: {
        ...prev[teamKey],
        rounds: updatedRounds,
      },
    };
  });
}

function updateTeamInfo(teamKey, field, value) {
  setTeams((prev) => ({
    ...prev,
    [teamKey]: {
      ...prev[teamKey],
      [field]: value,
    },
  }));
}


  return (
    <div className="min-h-screen bg-white p-4">
      <Header />
      <GameModeToggle mode={mode} onChange={handleModeChange} />
      <div className="flex gap-2 mt-4">
        {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveRound(i)}
            className={`flex-1 py-3 rounded-xl text-lg font-bold
              ${
                activeRound === i
                  ? "bg-amber-500 text-black activeRound"
                  : "bg-slate-700 text-white"
              }`}
          >
            Round {i + 1}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <TeamCard
          title="Team A"
          team={teams.teamA}
          teamKey="teamA"
          factionsList={SPEARHEAD_FACTIONS}
          activeRound={activeRound}
          onScoreChange={(round, type, delta) =>
            updateScore("teamA", round, type, delta)
          }
          onTeamUpdate={updateTeamInfo}
          onFactionChange={updateFaction}
        />

        <TeamCard
          title="Team B"
          team={teams.teamB}
          teamKey="teamB"
          factionsList={SPEARHEAD_FACTIONS}
          activeRound={activeRound}
          onScoreChange={(round, type, delta) =>
            updateScore("teamB", round, type, delta)
          }
          onTeamUpdate={updateTeamInfo}
          onFactionChange={updateFaction}
        />
      </div>

      <button className="w-full mt-6 py-4 rounded-xl bg-emerald-600 text-xl font-bold">
        Save Game
      </button>
    </div>
  );
}
