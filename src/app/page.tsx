"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from 'lucide-react';

export default function Home() {
  const [gameId, setGameId] = useState('');
  const router = useRouter();

  const createGame = () => {
    const newGameId = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/game/${newGameId}`);
  };

  const joinGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameId.trim()) {
      router.push(`/game/${gameId.trim()}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-primary p-4 rounded-full mb-4">
           <Building2 className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="text-5xl font-headline font-bold text-primary">Property Tycoon Lite</h1>
        <p className="text-muted-foreground mt-2 text-lg">The modern way to build your empire.</p>
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Join or Create a Game</CardTitle>
          <CardDescription>Enter a game code to join or create a new game to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={joinGame} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="game-id" className="text-muted-foreground">Game ID</Label>
              <Input
                id="game-id"
                placeholder="Enter game code"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!gameId.trim()}>
              Join Game
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Button onClick={createGame} variant="secondary" className="w-full">
            Create New Game
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
