import React, { useState } from 'react';
import { Pokemon, BattleResult } from './types';
import { pokemons } from './data/pokemons';
import PokemonCard from './components/PokemonCard';
import BattleResultModal from './components/BattleResult';
import BattleHistory from './components/BattleHistory';
import Footer from './components/Footer';

interface BattleHistoryItem extends BattleResult {
  id: number;
}

function App() {
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [battleHistory, setBattleHistory] = useState<BattleHistoryItem[]>([]);

  const handlePokemonClick = (pokemon: Pokemon) => {
    if (selectedPokemons.includes(pokemon)) {
      setSelectedPokemons(selectedPokemons.filter(p => p !== pokemon));
    } else if (selectedPokemons.length < 2) {
      setSelectedPokemons([...selectedPokemons, pokemon]);
    }

    if (selectedPokemons.length === 1) {
      const result = battle(selectedPokemons[0], pokemon);
      setBattleResult(result);
      setBattleHistory([
        { id: Date.now(), ...result },
        ...battleHistory
      ]);
    }
  };

  const battle = (pokemon1: Pokemon, pokemon2: Pokemon): BattleResult => {
    let score1 = 0;
    let score2 = 0;
    let highestStat = { pokemon: pokemon1, stat: 'attack', value: pokemon1.attack };

    // Compare attack
    if (pokemon1.attack > pokemon2.attack) {
      score1++;
    } else if (pokemon2.attack > pokemon1.attack) {
      score2++;
    }

    // Compare defense
    if (pokemon1.defense > pokemon2.defense) {
      score1++;
    } else if (pokemon2.defense > pokemon1.defense) {
      score2++;
    }

    // Compare power
    if (pokemon1.power > pokemon2.power) {
      score1++;
    } else if (pokemon2.power > pokemon1.power) {
      score2++;
    }

    // Determine highest stat for tiebreaker
    const stats = ['attack', 'defense', 'power'] as const;
    stats.forEach(stat => {
      if (pokemon1[stat] > highestStat.value) {
        highestStat = { pokemon: pokemon1, stat, value: pokemon1[stat] };
      }
      if (pokemon2[stat] > highestStat.value) {
        highestStat = { pokemon: pokemon2, stat, value: pokemon2[stat] };
      }
    });

    if (score1 > score2) {
      return { winner: pokemon1, loser: pokemon2 };
    } else if (score2 > score1) {
      return { winner: pokemon2, loser: pokemon1 };
    } else {
      return {
        winner: highestStat.pokemon,
        loser: highestStat.pokemon === pokemon1 ? pokemon2 : pokemon1,
        tiebreaker: highestStat.stat
      };
    }
  };

  const resetBattle = () => {
    setSelectedPokemons([]);
    setBattleResult(null);
  };

  const removeBattleFromHistory = (id: number) => {
    setBattleHistory(battleHistory.filter(battle => battle.id !== id));
  };

  const clearBattleHistory = () => {
    setBattleHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col">
      <div className="flex-grow">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-5xl font-bold text-center mb-4 text-blue-600 shadow-text animate-pulse">Pokémon Battle Game</h1>
          <div className="flex items-center">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball" className="w-12 h-12 mr-4 animate-bounce" />
            <a 
              href="https://facubonidev.github.io/Proyecto1.5/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl font-semibold text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              By Facu
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 mb-8">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => handlePokemonClick(pokemon)}
              isSelected={selectedPokemons.includes(pokemon)}
            />
          ))}
        </div>
        <BattleResultModal result={battleResult} onReset={resetBattle} />
        <BattleHistory 
          history={battleHistory} 
          onRemove={removeBattleFromHistory} 
          onClearAll={clearBattleHistory}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;