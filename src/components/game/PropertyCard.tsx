import type { Property, Player } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DollarSign, Home, Zap, Train, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlayerToken } from './PlayerToken';

interface PropertyCardProps {
  property: Property;
  owner?: Player;
  playersOnTile: Player[];
  onCardClick: (property: Property) => void;
}

const typeIcons = {
  property: <Home className="w-5 h-5" />,
  utility: <Zap className="w-5 h-5" />,
  railroad: <Train className="w-5 h-5" />,
  special: <Landmark className="w-5 h-5" />,
};

export function PropertyCard({ property, owner, playersOnTile, onCardClick }: PropertyCardProps) {
  const isOwnable = property.type !== 'special';

  return (
    <Card 
      className={cn(
        "h-full flex flex-col justify-between overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer",
        owner ? `bg-opacity-20 ${owner.color.replace('bg-', 'bg-')}` : 'bg-card'
      )}
      onClick={() => onCardClick(property)}
    >
      <CardHeader className="p-2 text-center" style={{ backgroundColor: property.color }}>
        <p className="text-[10px] font-bold text-white uppercase tracking-wider" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          {property.name}
        </p>
      </CardHeader>
      <CardContent className="p-2 flex-grow flex flex-col items-center justify-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center items-center w-full h-full p-2">
          {playersOnTile.map(player => <PlayerToken key={player.id} player={player} />)}
        </div>
        <div className="text-muted-foreground mb-1">
          {typeIcons[property.type]}
        </div>
        {isOwnable && (
          <div className="flex items-center text-sm font-semibold text-primary">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{property.price}</span>
          </div>
        )}
        {owner && (
           <div className="absolute bottom-1 right-1 text-xs font-bold p-1 rounded" style={{ color: 'white', backgroundColor: owner.color.replace('bg-', 'rgba(').replace('-500', ', 0.7)').replace(')', ', 0.7)') }}>
             {owner.name.split(' ')[0]}
           </div>
        )}
      </CardContent>
    </Card>
  );
}
