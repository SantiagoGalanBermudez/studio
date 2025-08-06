import type { Player, Property } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, DollarSign, Users, Home, RollerCoaster } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface PlayerPanelProps {
  players: Player[];
  properties: Property[];
  currentPlayerId: string;
  onTrade: () => void;
  onRollDice: () => void;
}

export function PlayerPanel({ players, properties, currentPlayerId, onTrade, onRollDice }: PlayerPanelProps) {
  return (
    <Card className="h-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2"><Users /> Players</CardTitle>
        <CardDescription>View player status and owned properties.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-250px)] pr-4">
          <div className="space-y-4">
            {players.map(player => {
              const ownedProperties = properties.filter(p => p.ownerId === player.id);
              const isCurrentPlayer = player.id === currentPlayerId;

              return (
                <Card key={player.id} className={cn("transition-all duration-300", isCurrentPlayer ? 'border-accent shadow-accent/20 shadow-lg' : '')}>
                  <CardHeader className="flex flex-row items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-4 h-4 rounded-full", player.color)}></div>
                      <p className="font-bold text-lg">{player.name}</p>
                    </div>
                    <div className="flex items-center text-primary font-semibold">
                       <DollarSign className="w-5 h-5 mr-1" /> {player.balance.toLocaleString()}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {player.inJail && <p className="text-destructive font-bold text-sm mb-2">In Jail</p>}
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Properties ({ownedProperties.length})</h4>
                    {ownedProperties.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {ownedProperties.map(prop => (
                          <div key={prop.id} className="flex items-center gap-2 text-xs p-1 rounded-sm bg-secondary">
                             <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: prop.color }}></div>
                             <span className="truncate">{prop.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">No properties yet.</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </ScrollArea>
        <Separator className="my-4" />
        <div className="space-y-2">
           <Button onClick={onRollDice} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <RollerCoaster className="mr-2 h-4 w-4" />
              Roll Dice
           </Button>
           <Button onClick={onTrade} variant="secondary" className="w-full">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Propose Trade
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
