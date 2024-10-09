import React from 'react';
import { BattleResult } from '../types';

interface BattleHistoryItem extends BattleResult {
  id: number;
}

interface BattleHistoryProps {
  history: BattleHistoryItem[];
  onRemove: (id: number) => void;
  onClearAll: () => void;
}

const BattleHistory: React.FC<BattleHistoryProps> = ({ history, onRemove, onClearAll }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-blue-600 shadow-text">Battle History</h2>
        <button
          onClick={onClearAll}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Clear All History
        </button>
      </div>
      <ul className="space-y-2">
        {history.map((battle) => (
          <li key={battle.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow">
            <span>
              {battle.winner.name} defeated {battle.loser.name}
              {battle.tiebreaker && ` (Tiebreaker: ${battle.tiebreaker})`}
            </span>
            <button
              onClick={() => onRemove(battle.id)}
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BattleHistory;