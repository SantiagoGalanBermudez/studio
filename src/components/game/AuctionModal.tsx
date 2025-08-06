"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Property, Player, Bid } from '@/lib/types';
import { handleArbitrateAuction } from '@/app/game/actions';
import { useToast } from '@/hooks/use-toast';
import { Gavel, Loader2, Award, Info } from 'lucide-react';

interface AuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  players: Player[];
  onAuctionEnd: (winner: Player | null, price: number) => void;
}

export function AuctionModal({ isOpen, onClose, property, players, onAuctionEnd }: AuctionModalProps) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [currentBid, setCurrentBid] = useState('');
  const [currentPlayerId, setCurrentPlayerId] = useState(players[0]?.id || '');
  const [isArbitrating, setIsArbitrating] = useState(false);
  const [arbitrationResult, setArbitrationResult] = useState<{ winningBid: { player: string; amount: number } | null; reason: string } | null>(null);
  const { toast } = useToast();

  const minimumBidIncrement = 10;
  const highestBidAmount = bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : 0;

  const handlePlaceBid = () => {
    const bidAmount = parseInt(currentBid, 10);
    const selectedPlayer = players.find(p => p.id === currentPlayerId);

    if (!selectedPlayer) {
      toast({ variant: 'destructive', title: 'Error', description: 'Player not found.' });
      return;
    }
    if (isNaN(bidAmount) || bidAmount <= highestBidAmount) {
      toast({ variant: 'destructive', title: 'Invalid Bid', description: `Your bid must be higher than the current highest bid of $${highestBidAmount}.` });
      return;
    }
    if (bidAmount > selectedPlayer.balance) {
      toast({ variant: 'destructive', title: 'Insufficient Funds', description: 'You cannot bid more than your current balance.' });
      return;
    }

    setBids([...bids, { player: selectedPlayer.name, amount: bidAmount }]);
    setCurrentBid('');
  };
  
  const handleArbitrate = async () => {
    if (!property) return;
    setIsArbitrating(true);
    const result = await handleArbitrateAuction({
      property: property.name,
      bids,
      minimumBidIncrement,
    });
    setArbitrationResult(result);
    setIsArbitrating(false);

    if (result.winningBid) {
      const winner = players.find(p => p.name === result.winningBid?.player);
      onAuctionEnd(winner || null, result.winningBid.amount);
    } else {
      onAuctionEnd(null, 0);
    }
  };

  const resetAndClose = () => {
    setBids([]);
    setCurrentBid('');
    setArbitrationResult(null);
    onClose();
  };

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl flex items-center gap-2"><Gavel /> Auction: {property.name}</DialogTitle>
          <DialogDescription>Place your bids. The highest valid bid wins the property.</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="font-bold mb-2">Bidding History</h3>
            <ScrollArea className="h-48 border rounded-md p-2">
              {bids.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No bids yet. Be the first!</p>
              ) : (
                <ul className="space-y-2">
                  {bids.map((bid, index) => (
                    <li key={index} className="flex justify-between items-center text-sm">
                      <span>{bid.player}</span>
                      <span className="font-bold">${bid.amount.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>

            {arbitrationResult && (
              <Alert className="mt-4 bg-accent/20 border-accent">
                <Award className="h-4 w-4 text-accent-foreground" />
                <AlertTitle className="font-bold text-accent-foreground">Arbitration Result</AlertTitle>
                <AlertDescription className="text-accent-foreground/90">
                  {arbitrationResult.reason}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <div>
             <div className="space-y-4">
              <h3 className="font-bold">Place a Bid</h3>
              <div>
                <Label htmlFor="player-select">Your Name</Label>
                <select id="player-select" value={currentPlayerId} onChange={e => setCurrentPlayerId(e.target.value)} className="w-full p-2 border rounded-md bg-background">
                  {players.map(p => <option key={p.id} value={p.id}>{p.name} (Balance: ${p.balance.toLocaleString()})</option>)}
                </select>
              </div>
               <div>
                <Label htmlFor="bid-amount">Bid Amount</Label>
                <Input id="bid-amount" type="number" placeholder={`> $${highestBidAmount}`} value={currentBid} onChange={e => setCurrentBid(e.target.value)} />
               </div>
              <Button onClick={handlePlaceBid} className="w-full">Place Bid</Button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          {arbitrationResult ? (
            <Button onClick={resetAndClose} className="w-full">Close</Button>
          ) : (
            <Button onClick={handleArbitrate} className="w-full" disabled={isArbitrating || bids.length === 0}>
              {isArbitrating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Gavel className="mr-2 h-4 w-4" />}
              Arbitrate with AI
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
