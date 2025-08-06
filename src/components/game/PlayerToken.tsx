import { cn } from "@/lib/utils";
import type { Player } from "@/lib/types";

interface PlayerTokenProps {
  player: Player;
}

export function PlayerToken({ player }: PlayerTokenProps) {
  const initials = player.name.split(' ').map(n => n[0]).join('');
  return (
    <div
      className={cn(
        "absolute w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md",
        player.color
      )}
      style={{ transform: `translate(${Math.random() * 50 - 25}%, ${Math.random() * 50 - 25}%)` }}
      title={player.name}
    >
      {initials}
    </div>
  );
}
