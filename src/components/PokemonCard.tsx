import React from 'react';
import { Pokemon } from '../types';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
  isSelected: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick, isSelected }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
        isSelected ? 'ring-4 ring-blue-500' : ''
      } flex flex-col justify-between h-64`}
      onClick={onClick}
    >
      <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mx-auto mb-2" />
      <h2 className="text-base font-bold text-center mb-2">{pokemon.name}</h2>
      <div className="text-sm space-y-1">
        <p>Attack: <span className="text-red-500 font-semibold">{pokemon.attack}</span></p>
        <p>Defense: <span className="text-green-500 font-semibold">{pokemon.defense}</span></p>
        <p>Power: <span className="text-purple-500 font-semibold">{pokemon.power}</span></p>
      </div>
    </div>
  );
};

export default PokemonCard;