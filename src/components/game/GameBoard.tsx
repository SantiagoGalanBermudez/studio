import type { Property, Player } from '@/lib/types';
import { PropertyCard } from './PropertyCard';

interface GameBoardProps {
  properties: Property[];
  players: Player[];
  onCardClick: (property: Property) => void;
}

export function GameBoard({ properties, players, onCardClick }: GameBoardProps) {
  const getPlayersOnTile = (position: number) => {
    return players.filter(player => player.position === position);
  };

  return (
    <div className="w-full aspect-square p-4 bg-secondary rounded-xl shadow-inner">
      <div className="grid grid-cols-4 grid-rows-4 gap-2 h-full">
        {/* Top Row */}
        <div className="row-start-1 col-start-1"><PropertyCard property={properties[0]} playersOnTile={getPlayersOnTile(0)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[0].ownerId)} /></div>
        <div className="row-start-1 col-start-2"><PropertyCard property={properties[1]} playersOnTile={getPlayersOnTile(1)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[1].ownerId)} /></div>
        <div className="row-start-1 col-start-3"><PropertyCard property={properties[2]} playersOnTile={getPlayersOnTile(2)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[2].ownerId)} /></div>
        <div className="row-start-1 col-start-4"><PropertyCard property={properties[3]} playersOnTile={getPlayersOnTile(3)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[3].ownerId)} /></div>

        {/* Middle Rows */}
        <div className="row-start-2 col-start-4"><PropertyCard property={properties[4]} playersOnTile={getPlayersOnTile(4)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[4].ownerId)} /></div>
        <div className="row-start-3 col-start-4"><PropertyCard property={properties[5]} playersOnTile={getPlayersOnTile(5)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[5].ownerId)} /></div>

        <div className="row-start-2 col-start-1"><PropertyCard property={properties[11]} playersOnTile={getPlayersOnTile(11)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[11].ownerId)} /></div>
        <div className="row-start-3 col-start-1"><PropertyCard property={properties[10]} playersOnTile={getPlayersOnTile(10)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[10].ownerId)} /></div>

        {/* Bottom Row */}
        <div className="row-start-4 col-start-4"><PropertyCard property={properties[6]} playersOnTile={getPlayersOnTile(6)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[6].ownerId)} /></div>
        <div className="row-start-4 col-start-3"><PropertyCard property={properties[7]} playersOnTile={getPlayersOnTile(7)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[7].ownerId)} /></div>
        <div className="row-start-4 col-start-2"><PropertyCard property={properties[8]} playersOnTile={getPlayersOnTile(8)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[8].ownerId)} /></div>
        <div className="row-start-4 col-start-1"><PropertyCard property={properties[9]} playersOnTile={getPlayersOnTile(9)} onCardClick={onCardClick} owner={players.find(p => p.id === properties[9].ownerId)} /></div>

        {/* Center */}
        <div className="row-start-2 col-start-2 row-span-2 col-span-2 bg-card rounded-lg flex flex-col items-center justify-center p-4">
            <h2 className="text-3xl font-headline text-primary text-center">Property Tycoon</h2>
        </div>
      </div>
    </div>
  );
}
