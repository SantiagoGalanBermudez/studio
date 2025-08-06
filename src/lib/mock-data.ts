import type { Player, Property } from './types';

export const initialPlayers: Player[] = [
  { id: 'player1', name: 'You', color: 'bg-blue-500', balance: 1500, properties: [], position: 0, inJail: false },
  { id: 'player2', name: 'Rival Rick', color: 'bg-red-500', balance: 1500, properties: [], position: 0, inJail: false },
  { id: 'player3', name: 'Agent Smith', color: 'bg-gray-700', balance: 1500, properties: [], position: 0, inJail: false },
];

export const initialProperties: Property[] = [
  { id: 'go', name: 'GO', type: 'special' },
  { id: 'mediterranean-ave', name: 'Mediterranean Avenue', type: 'property', price: 60, color: '#955436' },
  { id: 'reading-railroad', name: 'Reading Railroad', type: 'railroad', price: 200 },
  { id: 'oriental-ave', name: 'Oriental Avenue', type: 'property', price: 100, color: '#aae0fa' },
  { id: 'jail', name: 'Jail / Just Visiting', type: 'special' },
  { id: 'st-charles-place', name: 'St. Charles Place', type: 'property', price: 140, color: '#d93a96' },
  { id: 'electric-company', name: 'Electric Company', type: 'utility', price: 150 },
  { id: 'states-ave', name: 'States Avenue', type: 'property', price: 140, color: '#d93a96' },
  { id: 'free-parking', name: 'Free Parking', type: 'special' },
  { id: 'kentucky-ave', name: 'Kentucky Avenue', type: 'property', price: 220, color: '#f7941d' },
  { id: 'pennsylvania-railroad', name: 'Pennsylvania Railroad', type: 'railroad', price: 200 },
  { id: 'park-place', name: 'Park Place', type: 'property', price: 350, color: '#0072bb' },
];
