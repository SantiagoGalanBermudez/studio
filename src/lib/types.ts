export interface Player {
  id: string;
  name: string;
  color: string;
  balance: number;
  properties: string[]; // array of property IDs
  position: number;
  inJail: boolean;
}

export interface Property {
  id: string;
  name: string;
  type: 'property' | 'utility' | 'railroad' | 'special';
  price?: number;
  color?: string;
  ownerId?: string; // player ID
}

export interface Bid {
  player: string; // player name
  amount: number;
}
