"use client";

import { useState, useEffect } from 'react';
import { GameBoard } from '@/components/game/GameBoard';
import { PlayerPanel } from '@/components/game/PlayerPanel';
import { AuctionModal } from '@/components/game/AuctionModal';
import { initialPlayers, initialProperties } from '@/lib/mock-data';
import type { Player, Property } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GamePage({ params }: { params: { gameId: string } }) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);
  const [auctionProperty, setAuctionProperty] = useState<Property | null>(null);
  const { toast } = useToast();

  const handleCardClick = (property: Property) => {
    if (property.type === 'special' || property.ownerId) {
      toast({
        title: property.name,
        description: property.ownerId ? `Owned by ${players.find(p => p.id === property.ownerId)?.name}` : 'Special Tile',
      });
      return;
    }

    setAuctionProperty(property);
    setIsAuctionOpen(true);
  };

  const handleAuctionEnd = (winner: Player | null, price: number) => {
    if (winner && auctionProperty) {
      setPlayers(prevPlayers => prevPlayers.map(p =>
        p.id === winner.id ? { ...p, balance: p.balance - price, properties: [...p.properties, auctionProperty.id] } : p
      ));
      setProperties(prevProps => prevProps.map(p =>
        p.id === auctionProperty.id ? { ...p, ownerId: winner.id } : p
      ));
      toast({
        title: "Auction Winner!",
        description: `${winner.name} won ${auctionProperty.name} for $${price.toLocaleString()}!`,
      });
    } else {
      toast({
        title: "Auction Concluded",
        description: `No winner was determined for ${auctionProperty?.name}.`,
      });
    }
    setIsAuctionOpen(false);
    setAuctionProperty(null);
  };
  
  const handleRollDice = () => {
    const diceRoll = Math.floor(Math.random() * 10) + 2; // Simulate 2d6
    const currentPlayer = players[currentPlayerIndex];
    const newPosition = (currentPlayer.position + diceRoll) % properties.length;

    setPlayers(prev => prev.map(p => p.id === currentPlayer.id ? {...p, position: newPosition} : p));
    
    toast({
        title: `${currentPlayer.name} rolled a ${diceRoll}`,
        description: `They landed on ${properties[newPosition].name}.`
    });

    const landedProperty = properties[newPosition];
    if (landedProperty.type !== 'special' && !landedProperty.ownerId) {
        // Automatically open auction for unowned properties for simplicity
        setTimeout(() => {
            setAuctionProperty(landedProperty);
            setIsAuctionOpen(true);
        }, 1000);
    }

    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-6">
        <h1 className="text-4xl font-headline text-primary">Property Tycoon Lite</h1>
        <p className="text-muted-foreground">Game ID: <span className="font-bold text-primary">{params.gameId}</span></p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <main className="lg:col-span-3">
          <GameBoard properties={properties} players={players} onCardClick={handleCardClick} />
        </main>
        <aside className="lg:col-span-1">
          <PlayerPanel
            players={players}
            properties={properties}
            currentPlayerId={players[currentPlayerIndex].id}
            onTrade={() => toast({ title: 'Trading not implemented yet.'})}
            onRollDice={handleRollDice}
          />
        </aside>
      </div>
      <AuctionModal
        isOpen={isAuctionOpen}
        onClose={() => setIsAuctionOpen(false)}
        property={auctionProperty}
        players={players}
        onAuctionEnd={handleAuctionEnd}
      />
    </div>
  );
}
