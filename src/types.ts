export interface Pokemon {
  id: number;
  name: string;
  image: string;
  attack: number;
  defense: number;
  power: number;
}

export interface BattleResult {
  winner: Pokemon;
  loser: Pokemon;
  tiebreaker?: 'highest stat' | 'random';
}