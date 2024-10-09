import React from 'react';
import { BattleResult } from '../types';

interface BattleResultModalProps {
  result: BattleResult | null;
  onReset: () => void;
}

const BattleResultModal: React.FC<BattleResultModalProps> = ({ result, onReset }) => {
  if (!result) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-center animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4 text-blue-600 shadow-text animate-bounce">Battle Result</h2>
        <p className="text-2xl mb-2">
          Winner: <span className="font-bold text-green-600">{result.winner.name}</span>
        </p>
        <p className="text-xl mb-4">
          Loser: <span className="font-bold text-red-600">{result.loser.name}</span>
        </p>
        {result.tiebreaker && (
          <p className="text-lg mb-4">
            Tiebreaker: <span className="font-bold capitalize">{result.tiebreaker}</span>
          </p>
        )}
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors text-lg"
          onClick={onReset}
        >
          New Battle
        </button>
      </div>
    </div>
  );
};

export default BattleResultModal;